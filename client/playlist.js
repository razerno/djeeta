import React from 'react';

class Playlist extends React.Component {
  render() {
    return (
      <div>
        <h3>Server id: {this.props.id}</h3>
        <ul>
          {this.props.queue.map(info => {
            return <li>{info.title}<br/>{info.url}<br/>{info.image}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Playlist;