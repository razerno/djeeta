import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Media, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { MdClear } from 'react-icons/lib/md';

const DeleteSongConfirm = (onDelete) => (
  <Popover id="remove-song-confirm">
    <Button bsStyle="danger" onClick={onDelete}>Delete</Button>
  </Popover>
);

const Song = SortableElement(({info, onDelete}) => {
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
        <Media.Right align="middle">
          <OverlayTrigger trigger="click" rootClose placement="top" overlay={DeleteSongConfirm(() => onDelete(info.id))}>
            <MdClear />
          </OverlayTrigger>
        </Media.Right>
      </Media>
    </li>
  );
});

const Playlist = SortableContainer(({queue, onDelete}) => {
  return (
    <ul>
      {queue.map((info, index) => (
        <Song key={info.id} index={index} info={info} onDelete={onDelete} />
      ))}
    </ul>
  );
});

export default Playlist;