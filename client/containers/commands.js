import React from 'react';
import { connect } from 'react-redux';
import { fetchCommands, fetchPrefix } from '../actions/bot'

class Commands extends React.Component {
  componentDidMount() {
    this.props.fetchPrefix();
    this.props.fetchCommands();
  }

  render() {
    return (
      <table>
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
      </table>
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