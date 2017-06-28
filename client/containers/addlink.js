import React from 'react';
import { connect } from 'react-redux';
import { addSong } from '../actions/player';
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
    this.props.addSong(this.props.id, this.state.url);
  }

  render() {
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormControl type="text" value={this.state.url} onChange={this.handleChange} />
        <Button type="submit">
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