import React from "react";
import User from "./User";

function TodoItem(props) {
  const newTodo = props.todoData;
  return (
    <tr className="TodoItem" key={newTodo.id}>
      <td className="id">{newTodo.id}</td>
      <td className="title">{newTodo.title}</td>
      <td className={newTodo.completed ? "itemCompleted" : "itemActive"}>
        {newTodo.completed ? "completed" : "active"}
      </td>
      {props.users
        .filter(user => newTodo.userId === user.id)
        .map(user => {
        return (
          <User userId={newTodo.userId} user={user} key={newTodo.userId}/>
        )
      })}
    </tr>
  );
}

export default TodoItem;
