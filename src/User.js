import React from 'react'

function User(props) {
  const filteredUsers = [...props.users].filter(user => props.userId === user.id)
  return filteredUsers.map(user => {
    return (
      <td>
        {user.username}
      </td>
    )
  })
}

export default User