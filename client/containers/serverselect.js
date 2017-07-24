import React from 'react';
import { connect } from 'react-redux';
import { fetchServers, fetchPlaylist, selectServer } from '../actions/player';
import { Form, FormControl, Button } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import { MdRefresh } from 'react-icons/lib/md';

const io = require('socket.io-client')

class ServerSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.socket = io()
  }

  handleClick() {
    this.props.fetchServers();
  }

  handleChange(event) {
    const id = event.target.value;

    this.socket.emit('playlist', id);

    this.props.fetchPlaylist(id);
    this.props.selectServer(id);

    this.socket.off('update');
    this.socket.on('update', () => {
      this.props.fetchPlaylist(id);
    });
  }

  renderUpdateButton() {
    if (this.props.servers.isFetching) {
      return (
        <Button bsStyle="primary" onClick={() => this.handleClick()}><Spinner name="circle" fadeIn="none" color="white"/></Button>
      )
    } else {
      return (
        <Button bsStyle="primary" onClick={() => this.handleClick()}><MdRefresh style={{ width: '22px', height: '22px' }}/></Button>
      )
    }
  }

  render() {
    if (this.props.servers.list.length > 0) {
      return (
        <Form inline>
          <FormControl componentClass="select" value={this.props.selectedServer} onChange={this.handleChange} style={{ width: 'auto' }}>
            <option value='0' disabled hidden>Select server</option>
            {this.props.servers.list.map(server => {
              return (
                <option key={server.id} value={server.id}>{server.name}</option>
              );
            })}
          </FormControl>
          {this.renderUpdateButton()}
        </Form>
      );
    } else {
      return (
        <Form inline>
          <FormControl type="text" value="No servers available." readOnly style={{ width: 'auto' }} />
          {this.renderUpdateButton()}
        </Form>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    servers: state.servers,
    selectedServer: state.selectedServer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    fetchPlaylist: id => dispatch(fetchPlaylist(id)),
    selectServer: id => dispatch(selectServer(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerSelect);