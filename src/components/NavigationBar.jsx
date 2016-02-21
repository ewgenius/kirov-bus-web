import 'styles/NavigationBar.scss';

import React from 'react';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/lib/auto-complete';

class SearchBar extends React.Component {
  render() {
    return (
      <Paper className="search-bar" style={{
        position: 'fixed',
        zIndex: 1000,
        top: 16,
        left: 16,
        width: 340,
        height: 48
      }} zDepth={1}>
        <IconButton>
          <NavigationMenu/>
        </IconButton>
        <AutoComplete style={{height: 32}} disableFocusRipple={true} hintText="Type c" dataSource={this.state.dataSource} onUpdateInput={this.handleUpdateInput.bind(this)}/>
      </Paper>
    );
  }
}

SearchBar.displayName = 'SearchBar';

// SearchBarComponent.propTypes = {};
// SearchBarComponent.defaultProps = {};

export default SearchBar;
