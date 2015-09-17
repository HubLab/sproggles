import React from 'react';
import {resetCSS} from '../modules/utils';

const styles = {
  listItem: {
    listStyle: 'none',
    display: 'block'
  },

  link: {
    color: 'black',
    fontSize: 16
  }
};

const RenderedFont = React.createClass({
  render: function() {
    const listItemStyle = resetCSS(styles.listItem);
    const linkTextStyle = resetCSS(styles.link, {fontFamily: this.props.font});

    return (
      <li className="font" style={listItemStyle}>
        <a target="_blank" style={linkTextStyle} href={`https://typekit.com/search?utf8=✓&q=${this.props.font}`}>
          {this.props.font}
        </a>
      </li>
    );
  }
});

export default RenderedFont;
