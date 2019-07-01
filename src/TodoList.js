import React, { Component } from "react";
import TodoItem from "./TodoItem";
import {getTodos, getUsers} from './services'
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      todos: [],
      isLoaded: false,
      buttonDisable: false,
      sorting: "none"
    };
  }

  async handleClick() {
    const fetchedTodos = await getTodos()
    const fetchedUsers = await getUsers()

    this.setState(() => {
      return {
        users: fetchedUsers,
        todos: fetchedTodos,
        isLoaded: true
      };
    });
  }

  loadingDecorator = () => {
    this.setState({
      buttonDisable: true
    });
    setTimeout(() => this.handleClick(), 1000);
  };

  handleSort = (event) => {
    event.persist();
    let type = event.target.textContent;
    this.setState(prevState => {
      const newTodos = [...prevState.todos];
      const newUsers = [...prevState.users];
      if (type === "username" && prevState.sorting !== 'username_asc') {
        newUsers.forEach(user => {
          newTodos.map(todo => {
            if (user.id === todo.userId) {
              type = 'username_asc'
              return (todo.username = user.username);
            }
          });
        });
        newTodos.sort((a, b) => a.username.localeCompare(b.username));
      } else if (type === "username" && prevState.sorting === 'username_asc') {
        newUsers.forEach(user => {
          newTodos.map(todo => {
            if (user.id === todo.userId) {
              type = 'username_des'
              return (todo.username = user.username);
            }
          });
        });
        newTodos.sort((a, b) => b.username.localeCompare(a.username));
      }
      if (type === "title" && prevState.sorting !== 'title_asc') {
        newTodos.sort((a, b) => a.title.localeCompare(b.title));
        type = 'title_asc'
      } else if (type === 'title' && prevState.sorting === 'title_asc') {
        newTodos.sort((a, b) => b.title.localeCompare(a.title));
        type = 'title_des'
      }
      if (type === "completed" && prevState.sorting !== 'completed_asc') {
        newTodos.sort((a, b) => a.completed.toString().localeCompare(b.completed.toString()));
        type = 'completed_asc'
      } else if (type === 'completed' && prevState.sorting === 'completed_asc') {
        newTodos.sort((a, b) => b.completed.toString().localeCompare(a.completed.toString()));
        type = 'completed_des'
      }

      return {
        sorting: type,
        users: newUsers,
        todos: newTodos
      };
    });
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <button
          className="loadButton"
          onClick={this.loadingDecorator}
          disabled={this.state.buttonDisable}
        >
          {this.state.buttonDisable ? "LOADING" : "LOAD"}
        </button>
      );
    } else {
      return (
        <div>
          <table className="App">
            <thead>
              <tr className="tableHead">
                <th>id</th>
                <th onClick={this.handleSort} className="sorting">
                  title
                </th>
                <th onClick={this.handleSort} className="sorting">
                  completed
                </th>
                <th onClick={this.handleSort} className="sorting">
                  username
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map(todo => {
                return (
                  <TodoItem todoData={todo} users={this.state.users} key={todo.title}/>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default TodoList;
