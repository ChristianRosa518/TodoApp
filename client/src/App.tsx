import { useState } from "react";
import "./App.css";

import TodoList from "./components/TodoList/TodoList";
import NewTodo from "./components/NewTodo/NewTodo";

// const API_BASE = process.env.REACT_APP_API_URL as string;
const API_BASE = "https://todo-app-lilac-six-20.vercel.app/";

interface todoItem {
  text: string;
  _id: string;
  complete: boolean;
}

function App() {
  const [todos, setTodos] = useState<Array<todoItem>>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={"container"}>
      <div className="credits">Designed by my girlfriend; Luz {API_BASE}</div>
      <TodoList
        setTodos={setTodos}
        todos={todos}
        API_BASE={API_BASE}
        show={show}
      >
        <NewTodo
          show={show}
          setShow={setShow}
          API_BASE={API_BASE}
          setTodos={setTodos}
          todos={todos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
        />
      </TodoList>
    </div>
  );
}

export default App;
