import React from 'react'
import { PacmanLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <div style={{
    height: '50vh',
    paddingLeft: '50%',
    paddingTop: '20%',
    }}>
        <PacmanLoader  color='#000'/>
        <span>Loading ...</span>
    </div>
  )
}

export default LoadingSpinner;