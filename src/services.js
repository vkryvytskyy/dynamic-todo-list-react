export const getTodos = async () => {
  const todosPromise = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const fetchedTodos = await todosPromise.json();
  return fetchedTodos;
}

export const getUsers = async () => {
  const usersPromise = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const fetchedUsers = await usersPromise.json(); 
  return fetchedUsers
}
