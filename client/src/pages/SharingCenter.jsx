import React from 'react'
import PasswordItem from "../components/PasswordItem";


const SharingCenter = () => {
  return (
    <div className="margin-content">
      <div className="padding-side">
        <h4>Sharing Center</h4>
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

export default SharingCenter