import React from 'react';
import PanelContainer from './PanelContainer';
import PanelToolbar from './PanelToolbar';
import PanelBody from './PanelBody';
import ColorSquare from './ColorSquare';

const ColorsPanel = React.createClass({
  render: function() {
    const colorSquares = this.props.data.map(color => <ColorSquare color={color} />);

    return (
      <PanelContainer>
        <PanelToolbar title={this.props.title} toggle={this.props.toggle} />
        <PanelBody isOpen={this.props.isOpen}>
          {colorSquares}
          <div style={{clear: "both"}}></div>
        </PanelBody>
      </PanelContainer>
    );
  }
});

export default ColorsPanel;
