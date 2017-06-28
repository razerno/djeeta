import React from 'react';
import { connect } from 'react-redux';
import { fetchCommands, fetchPrefix } from '../actions/bot';
import { Table } from 'react-bootstrap';

class Commands extends React.Component {
  componentDidMount() {
    this.props.fetchPrefix();
    this.props.fetchCommands();
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Usage</th>
          </tr>
        </thead>
        <tbody>
          {this.props.commands.map(command => {
            return (
              <tr key={command.name}>
                <td>{this.props.prefix + command.name}</td>
                <td>{command.description}</td>
                <td>{this.props.prefix + command.usage}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands,
    prefix: state.prefix,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCommands: () => dispatch(fetchCommands()),
    fetchPrefix: () => dispatch(fetchPrefix()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commands);