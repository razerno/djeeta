import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Media } from 'react-bootstrap';

const Song = SortableElement(({info}) => {
  return (
    <li className='list-group-item'>
      <Media>
        <Media.Left>
          <img height={100} src={info.image} alt="Image"/>
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
    <ul className='list-group'>
      {queue.map((info, index) => (
        <Song key={info.id} index={index} info={info} />
      ))}
    </ul>
  );
});

export default Playlist;