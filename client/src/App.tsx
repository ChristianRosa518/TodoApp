import { useState } from "react";
import "./App.css";

import TodoList from "./components/TodoList/TodoList";
import NewTodo from "./components/NewTodo/NewTodo";

const API_BASE = "http://localhost:3001";

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
