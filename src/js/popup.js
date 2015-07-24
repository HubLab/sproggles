import $ from 'jquery';
import getColors from './modules/getColors';
import getFonts from './modules/getFonts';
import getImages from './modules/getImages';
import getSerp from './modules/getSerp';
import getSocialCounts from './modules/getSocialCounts';
import createFeedbackForm from './modules/createFeedbackForm';
import {createSelectors} from './modules/utils';
import * as mixpanelEvents from './modules/mixpanelEvents';
import {
  colorSquareClickListener,
  tabClickHandler,
  themeButtonClickHandler,
  feedbackButtonClickHandler
} from './modules/clickHandlers';


$(() => {
  const {
    $colorsTab,
    $fontsTab,
    $imagesTab,
    $spinner,
    $tabPanel,
    $tabContent,
    $tab,
    $themeButton,
    $pleaseRefresh,
    $feedbackButton,
  } = createSelectors();

  const tabLoadTimeout = [];
  let giveUpTimeout = 0;

  mixpanelEvents.popupOpened();
  createFeedbackForm();

  $tab.click(tabClickHandler);
  $themeButton.click(themeButtonClickHandler);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const getTabData = () => {
      chrome.tabs.sendMessage(tabs[0].id, {get: "pageData"}, (response) => {
        if (typeof response === 'undefined') {
          chrome.tabs.executeScript(null, {file: "js/contentScript.js"});
          tabLoadTimeout.push(setTimeout(getTabData, 500));
        } else {
          const coloredDivs = getColors(response.colors);
          const fontDivs = getFonts(response.fonts);
          const imageDivs = getImages(response.images);

          /* Inject page data from content script */
          $colorsTab.append(coloredDivs);
          colorSquareClickListener().attach();

          $fontsTab.append(fontDivs);
          $imagesTab.append(imageDivs);

          getSerp(response.url);
          getSocialCounts(response.url).getAll();

          $spinner.hide();
          $pleaseRefresh.hide();
          $tabPanel.fadeIn(150);

          $feedbackButton.click(feedbackButtonClickHandler);

          tabLoadTimeout.forEach(clearTimeout);

          clearTimeout(giveUpTimeout);
        }
      });
    };

    const giveUp = () => {
      mixpanelEvents.popupFailed();

      $spinner.hide();
      $pleaseRefresh.fadeIn(150);

      tabLoadTimeout.forEach(function(timeout){
        clearTimeout(timeout);
      });
    };

    // If the popup doesn't receive a response in 10 seconds, it gives up and tells you to refresh
    getTabData();
    giveUpTimeout = setTimeout(giveUp, 6000);
  });
});
