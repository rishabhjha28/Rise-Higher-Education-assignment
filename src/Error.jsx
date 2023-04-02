import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
    return (
    <div>
        <h1>Error</h1>
        <Link to = '/' >Go to home page</Link> 
    </div>
  )
}

export default Error