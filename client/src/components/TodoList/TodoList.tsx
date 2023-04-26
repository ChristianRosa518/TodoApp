import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import styles from "./TodoList.module.css";

import { motion, AnimatePresence } from "framer-motion";

import NewTodo from "../NewTodo/NewTodo";

interface todoItem {
  text: string;
  _id: string;
  complete: boolean;
}

interface todoProps {
  setTodos: Dispatch<SetStateAction<todoItem[]>>;
  todos: Array<todoItem>;
  API_BASE: string;
  show: boolean;
  children: JSX.Element;
}

function TodoList({ setTodos, todos, API_BASE, show, children }: todoProps) {
  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));

    console.log(todos);
  };
  const completeTodo = async (id: string) => {
    const data: todoItem = await fetch(API_BASE + "/todo/complete/" + id, {
      method: "PUT",
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

  const removeTodo = async (e: any, id: string) => {
    e.stopPropagation();
    const data: any = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <div
          className={`${styles.todoContainer} ${show ? `${styles.show}` : ``}`}
        >
          <div className={styles.todoHeader}>To-Do</div>
          <div className={styles.headerSpacer}></div>
          <div className={styles.todos}>
            <AnimatePresence>
              {todos.map((todo: todoItem) => (
                <motion.div
                  key={todo._id}
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{
                    x: "-120%",
                    opacity: 0,
                    transition: { duration: 0.4 },
                  }}
                  transition={{ ease: "linear", duration: 0.4 }}
                  className={`${styles.todoItem}  ${
                    todo.complete ? "" : `${styles.incomplete}`
                  }`}
                  onClick={() => completeTodo(todo._id)}
                >
                  <div className={styles.todoText}> {todo.text}</div>

                  <div className={styles.remove}>
                    <button onClick={(e) => removeTodo(e, todo._id)}>x</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        {children}
      </AnimatePresence>
    </div>
  );
}

export default TodoList;
