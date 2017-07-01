import React from 'react';
import Spinner from 'react-spinkit';

const Loading = props => {
  return (
    <div>
      {props.condition && <div style={{
        backgroundColor: '#000',
        opacity: 0.5,
        position: 'absolute',
        zIndex: 1,
        height: 'auto',
        width: 'auto',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Spinner name="circle" fadeIn='quarter' color="white" style={{width: '35px', height: '35px'}}/>
      </div>}
    </div>
  )
}

export default Loading;