import React from 'react';
import spinner from './loading_color.gif';

export default () => {
  return (
    <div>
      <img 
        src={spinner}
        alt="Loading..."
        style={{ width: '50%', margin: '40px auto', display: 'block', borderRadius: '50%' }}
      />
    </div>
  )
}
