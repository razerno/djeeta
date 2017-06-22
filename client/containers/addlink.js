import React from 'react';

class AddLink extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchAddSong(this.props.id, this.state.url);
  }

  fetchAddSong(id, url) {
    console.log('Adding link ' + url);
    fetch(`/player/playlist/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({id: id, url: url}),
    })
    .then(res => res.text())
    .then(text => {
      alert(text);
      // alert(JSON.stringify(data));
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Url:
          <input type="text" value={this.state.url} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddLink;