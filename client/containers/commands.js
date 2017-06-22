import React from 'react';
import { connect } from 'react-redux';
import { fetchCommands } from '../actions/bot'

class Commands extends React.Component {
  fetchPrefix() {
    fetch('/bot/prefix')
      .then(res => res.json())
      .then(data => {
        this.setState(data);
      });
  }

  componentDidMount() {
    this.fetchPrefix();
    this.props.fetchCommands();
  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.commands.map(command => {
            return (
              <tr key={command.name}>
                <td>{this.state.prefix + command.name}</td>
                <td>{command.description}</td>
                <td>{this.state.prefix + command.usage}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    commands: state.commands
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCommands: () => dispatch(fetchCommands())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Commands);