import React, { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./NewTodo.module.css";

import { motion, AnimatePresence } from "framer-motion";
import { transform } from "framer-motion/dom";

interface todoItem {
  text: string;
  _id: string;
  complete: boolean;
}

interface newTodoProps {
  API_BASE: string;
  show: boolean;
  newTodo: string;
  todos: todoItem[];
  setNewTodo: Dispatch<SetStateAction<string>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  setTodos: Dispatch<SetStateAction<todoItem[]>>;
}

function NewTodo({
  show,
  setShow,
  API_BASE,
  newTodo,
  setTodos,
  setNewTodo,
  todos,
}: newTodoProps) {
  const addTodo = async () => {
    if (newTodo === "") {
      console.log("No text");
      return;
    }

    const data: todoItem = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setNewTodo("");
    setShow(false);
  };

  return (
    <>
      {show ? (
        <AnimatePresence>
          <motion.div
            className={`${styles.container}`}
            initial={{ x: "-60%" }}
            animate={{
              x: "0%",
              transition: { delay: 0.6, duration: 0.2 },
              scale: 1,
            }}
            exit={{ x: "-110%", transition: { duration: 0.3 } }}
            key={"addtodo"}
          >
            <motion.div
              className={styles.borderCircle}
              initial={{ x: "0%", scale: 0.2 }}
              animate={{
                x: "0%",
                transition: { duration: 0.2 },
                scale: 1,
              }}
              exit={{ x: "-0%", transition: { duration: 0.1 } }}
              key={"circle"}
            >
              <div className={styles.initialCircle}>
                <div className={styles.formCircle}>
                  <div className={styles.input}>
                    New To Do
                    <input
                      onChange={(event) => setNewTodo(event.target.value)}
                      value={newTodo}
                    ></input>
                  </div>
                  <button onClick={() => addTodo()}>Submit</button>
                </div>
              </div>
            </motion.div>
            <div className={styles.close} onClick={() => setShow(false)}>
              +
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            className={styles.showContainer}
            initial={{ x: "-500%" }}
            animate={{ x: "0%", transition: { delay: 0.8, duration: 0.4 } }}
            exit={{ x: "-100%", transition: { delay: 0.1 } }}
            key={"show"}
            onClick={() => setShow(true)}
          >
            <motion.p
              animate={{
                rotate: 360,
                transition: {
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 4,
                },
              }}
            >
              +
            </motion.p>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}

export default NewTodo;
