import React from 'react'

const Header = ({ title }) => {
  return (
    <header>
        <h1> {title} </h1>
    </header>
  )
}

Header.defaultProps = {
  title: "Hello everyone to Movie Library Management System"
}

export default Header