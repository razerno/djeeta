import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr'
import { addSong, ADD_SONG_SUCCESS, ADD_SONG_FAILURE } from '../actions/player';
import { Form, FormControl, Button } from 'react-bootstrap';

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
    this.props.addSong(this.props.id, this.state.url)
    .then(actionResponse => {
      switch (actionResponse.type) {
        case ADD_SONG_SUCCESS:
          toastr.success("Song successfully added.");
          this.setState({ url: '' });
          break;

        case ADD_SONG_FAILURE:
          toastr.error("That isn't a valid youtube video.");
          break;
      }
    });
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'flex-end'}}>
        <FormControl type="text" size="50" value={this.state.url} onChange={this.handleChange} />
        <Button type="submit" bsStyle="primary">
          Add Song
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSong: (id, url) => dispatch(addSong(id, url)),
  };
}

export default connect(undefined, mapDispatchToProps)(AddLink);