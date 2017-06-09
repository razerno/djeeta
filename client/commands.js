import React from 'react';

class Commands extends React.Component {
  constructor() {
    super();
    this.state = {
      commands: [],
    }
  }

  fetchPrefix() {
    fetch('/bot/prefix')
      .then(res => res.json())
      .then(data => {
        this.setState(data);
      });
  }

  fetchCommands() {
    fetch('/bot/commands')
      .then(res => res.json())
      .then(data => {
        this.setState(data);
      });
  }

  componentDidMount() {
    this.fetchPrefix();
    this.fetchCommands();
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.commands.map(command => {
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

export default Commands;