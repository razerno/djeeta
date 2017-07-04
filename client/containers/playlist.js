import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Media } from 'react-bootstrap';

const Song = SortableElement(({info}) => {
  return (
    <li style={{marginBottom: '15px'}}>
      <Media>
        <Media.Left>
          <div style={{
            width: '160px',
            height: '90px',
            backgroundImage: `url(${info.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }} />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{info.title}</Media.Heading>
          {info.url}
        </Media.Body>
      </Media>
    </li>
  );
});

const Playlist = SortableContainer(({queue}) => {
  return (
    <ul>
      {queue.map((info, index) => (
        <Song key={info.id} index={index} info={info} />
      ))}
    </ul>
  );
});

export default Playlist;