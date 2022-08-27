import React from 'react'
import PasswordItem from "../components/PasswordItem";


const Identity = () => {
  return (
    <div className="margin-content">
      <div className="padding-side">
        <h4>Identity</h4>
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

export default Identity