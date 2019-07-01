import React from 'react'

function User(props) {
  const currentUser = props.user;
    return (
      <td>
        {currentUser.username}
      </td>
    )
}

export default User