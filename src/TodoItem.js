import React from "react";
import User from "./User";

function TodoItem(props) {
  const newTodos = [...props.todos].map(todo => {
    return (
      <tr className="TodoItem">
        <td className="id">{todo.id}</td>
        <td className="title">{todo.title}</td>
        <td className={todo.completed ? "itemCompleted" : "itemActive"}>
          {todo.completed ? "completed" : "active"}
        </td>
        <User userId={todo.userId} users={props.users} key={Date.now()}/>
      </tr>
    );
  });

  return newTodos;
}

export default TodoItem;
