import React from 'react'
import PasswordItem from "../components/PasswordItem";


const Favorites = () => {
  return (
    <div className="margin-content">
      <div className="padding-side">
        <h4>Favorites</h4>
      </div>
      <div className="password-list standard-stack">
        <PasswordItem></PasswordItem>
        <PasswordItem></PasswordItem>
        <PasswordItem></PasswordItem>
        <PasswordItem></PasswordItem>
      </div>
    </div>
  )
}

export default Favorites