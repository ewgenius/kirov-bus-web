import 'styles/NavigationBar.scss';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/lib/auto-complete';

class NavigationBar extends React.Component {
  render() {
    return (
      <Paper className="search-bar" style={this.props.paperStyle} zDepth={1}>
        <IconButton onClick={this.props.onMenuClick}>
          <NavigationMenu/>
        </IconButton>
        <AutoComplete
          style={{height: 32}}
          triggerUpdateOnFocus={true}
          disableFocusRipple={true}
          hintText="Выберите автобус"
          dataSource={this.props.list}/>
      </Paper>
    );
  }
}

NavigationBar.displayName = 'NavigationBar';

// SearchBarComponent.propTypes = {};
// SearchBarComponent.defaultProps = {};

export default NavigationBar;
