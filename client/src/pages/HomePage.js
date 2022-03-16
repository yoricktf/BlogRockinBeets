import React from 'react'
import axios from 'axios';

const test = () => {
  console.log('+++++++++++++++++++++++++++++++++++++++');
  axios.get('/test')
}

const HomePage = () => {
  return (
    <div>
      hello

    </div>
  )
}

export default HomePage
