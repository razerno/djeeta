import React from 'react';
import { Media } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import { secondsToHMS } from '../utils';

const NowPlaying = props => {
  return (
    <div>
      <Media>
        <Media.Left>
          <div className="hidden-xs" style={{
            width: '160px',
            height: '90px',
            backgroundImage: `url(${props.info.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }} />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{props.info.title}</Media.Heading>
          {secondsToHMS(props.info.length)}
        </Media.Body>
        <Media.Right align="middle">
          <Spinner name="line-scale-party" fadeIn="none" style={{width: '40px', height: '40px', color: 'hsla(0,0%,100%,.6)'}}/>
        </Media.Right>
      </Media>
      <hr style={{
        border: 0,
        height: '1px',
        marginTop: '15px',
        marginBottom: '15px',
        backgroundImage: 'linear-gradient(to left, rgb(47, 48, 54), #383940, rgb(47, 48, 54))'
      }} />
    </div>
  );
};

export default NowPlaying;