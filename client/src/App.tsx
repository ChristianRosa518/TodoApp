import { useEffect, useState } from 'react';
import './App.css';
import styles from './todo.module.css';

const API_BASE = 'http://localhost:3001';

interface todoItem {
  text: string;
  _id: string;
  complete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Array<todoItem>>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + '/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
  };

  const completeTodo = async (id: string) => {
    const data: todoItem = await fetch(API_BASE + '/todo/complete/' + id, {
      method: 'PUT',
    }).then((res) => res.json());

    setTodos((todos: Array<todoItem>) =>
      todos.map((todo: todoItem) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
  };

  const removeTodo = async (id: string) => {
    const data: any = await fetch(API_BASE + '/todo/delete/' + id, {
      method: 'DELETE',
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const addTodo = async () => {
    const data: todoItem = await fetch(API_BASE + '/todo/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setNewTodo('');
  };

  return (
    <div className={styles.container}>
      {todos.map((todo: todoItem) => (
        <div key={todo._id} className={styles.todoContainer}>
          <div> {todo.text}</div>
          <button
            onClick={() => completeTodo(todo._id)}
            className={styles.complete}
          >
            x
          </button>
          <div> {todo.complete ? 'complete' : 'incomplete'}</div>
          <button
            onClick={() => removeTodo(todo._id)}
            className={styles.remove}
          >
            x
          </button>
        </div>
      ))}
      <div className={styles.addTodo}>
        <h2>Add Todo</h2>
        <input
          onChange={(event) => setNewTodo(event.target.value)}
          value={newTodo}
        ></input>
        <button onClick={() => addTodo()}>Submit</button>
      </div>
    </div>
  );
}

export default App;
