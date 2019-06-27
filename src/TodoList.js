import React, { Component } from "react";
import TodoItem from "./TodoItem";
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
    this.handleClick = this.handleClick.bind(this);
    this.loadingDecorator = this.loadingDecorator.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  async handleClick() {
    const todosPromise = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const fetchedTodos = await todosPromise.json();
    const usersPromise = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const fetchedUsers = await usersPromise.json();

    this.setState(() => {
      return {
        users: fetchedUsers,
        todos: fetchedTodos,
        isLoaded: true
      };
    });
  }

  loadingDecorator() {
    this.setState(() => {
      const newButtonStatus = true;
      
      return {
        buttonDisable: newButtonStatus
      };
    });
    setTimeout(this.handleClick, 1000);
  }

  handleSort(event) {
    event.persist();
    const type = event.target.textContent;
    this.setState(prevState => {
      const newTodos = [...prevState.todos];
      const newUsers = [...prevState.users];
      if (type === "username") {
        newUsers.forEach(user => {
          newTodos.map(todo => {
            if (user.id === todo.userId) {
              return (todo.username = user.username);
            }
          });
        });
        newTodos.sort((a, b) => a.username.localeCompare(b.username));
      }
      if (type === "title") {
        newTodos.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (type === "completed") {
        newTodos.sort((a, b) =>
          a.completed.toString().localeCompare(b.completed.toString())
        );
      }

      return {
        sorting: type,
        users: newUsers,
        todos: newTodos
      };
    });
  }

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
                <th onClick={this.handleSort} className="sorting">title</th>
                <th onClick={this.handleSort} className="sorting">completed</th>
                <th onClick={this.handleSort} className="sorting">username</th>
              </tr>
            </thead>
            <tbody>
              <TodoItem todos={this.state.todos} users={this.state.users} />
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default TodoList;
