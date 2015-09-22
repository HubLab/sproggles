import React from 'react';
import {resetCSS} from '../../modules/utils';

const styles = {
  keywordsSectionStyle: {
    margin: '10px 10px 20px 10px',
    textAlign: 'center'
  },

  inputStyle: {
    border: '1px solid #AAA',
    borderRadius: 2,
    margin: '0 10px',
    padding: 5
  },

  buttonStyle: {
    backgroundColor: '#DDD',
    border: '1px solid #AAA',
    borderRadius: 2,
    padding: 5
  },

  tableStyle: {
    borderCollapse: 'collapse',
    marginTop: 10,
    width: '100%'
  },

  thStyle: {
    backgroundColor: '#DDD',
    border: '1px solid #DDD',
    color: 'black',
    height: 25,
    fontSize: 16,
    width: '25%',
    textAlign: 'center',
    padding: 5
  },

  tdStyle: {
    border: '1px solid #DDD',
    height: 35,
    fontSize: 16,
    padding: 5,
    textAlign: 'center',
    width: '25%'
  }
};

const KeywordRow = React.createClass({
  render: function() {
    const {keyword, rank, volume, lastSearched} = this.props;
    const tdStyle = resetCSS(styles.tdStyle);

    return (
      <tr>
        <td style={tdStyle}>{keyword}</td>
        <td style={tdStyle}>{rank}</td>
        <td style={tdStyle}>{volume}</td>
        <td style={tdStyle}>{lastSearched}</td>
      </tr>
    );
  }
});

const KeywordInfo = React.createClass({
  getInitialState: function() {
    return {inputtedKeyword: ''};
  },

  handleClick: function(e) {
    const {inputtedKeyword} = this.state;
    const {getKeywordInfo} = this.props;

    e.preventDefault();

    getKeywordInfo(inputtedKeyword);
    this.setState({inputtedKeyword: ''});
  },

  handleChange: function(e) {
    this.setState({inputtedKeyword: e.target.value});
  },

  render: function() {
    const {getKeywordInfo, keywordInfo} = this.props;
    const keywordRows = keywordInfo.map(result => <KeywordRow {...result} />);

    const keywordsSectionStyle = resetCSS(styles.keywordsSectionStyle);
    const inputStyle = resetCSS(styles.inputStyle);
    const buttonStyle = resetCSS(styles.buttonStyle);
    const tableStyle = resetCSS(styles.tableStyle);
    const thStyle = resetCSS(styles.thStyle);

    return (
      <div style={keywordsSectionStyle}>
        <form>
          <label for="keyword">Search keyword:
            <input
              name="keyword"
              type="text"
              style={inputStyle}
              onChange={this.handleChange}
              value={this.state.inputtedKeyword}
            />
          </label>
          <button type="submit" style={buttonStyle} onClick={this.handleClick}>
            Search
          </button>
        </form>
        <table style={tableStyle}>
          <tr>
            <th style={thStyle}>Keyword</th>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Search Volume</th>
            <th style={thStyle}>Last Searched</th>
          </tr>
          {keywordRows}
        </table>
      </div>
    );
  }
});

export default KeywordInfo;
