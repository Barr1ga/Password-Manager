import React from 'react'
import PasswordItem from "../components/PasswordItem";

const Trash = () => {
  return (
    <div className="margin-content">
      <div className="padding-side">
        <h4>All Items</h4>
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

export default Trash