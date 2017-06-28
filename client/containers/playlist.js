import React from 'react';
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap';

class Playlist extends React.Component {
  render() {
    return (
      <ListGroup>
        {this.props.queue.map(info => {
          return (
            <ListGroupItem key={info.id}>
              <Media>
                <Media.Left>
                  <img height={100} src={info.image} alt="Image"/>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{info.title}</Media.Heading>
                  {info.url}
                </Media.Body>
              </Media>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    );
  }
}

export default Playlist;