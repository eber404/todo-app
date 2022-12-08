import React, { useState } from "react";

import "./App.css";
import { useTodo } from "./useTodo";

function App() {
  const { todos, addTodo, deleteTodo } = useTodo();
  const [todoValue, setTodoValue] = useState("");

  const handleOnChange = (e: any) => {
    setTodoValue(e.target.value);
  };

  const handleEnter = (e: any) => {
    const ENTER_KEY_CODE = 13;

    if (e.keyCode === ENTER_KEY_CODE) {
      addTodo(todoValue);
      return cleanFields();
    }
  };

  const handleClick = () => {
    addTodo(todoValue);
    cleanFields();
  };

  const cleanFields = () => {
    setTodoValue("");
  };

  const handleDelete = (todo: string) => {
    deleteTodo(todo);
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="form">
          <input
            className="input"
            id="todo"
            name="todo"
            value={todoValue}
            onChange={handleOnChange}
            onKeyDown={handleEnter}
            placeholder="levar o lixo para fora..."
          />
          <button className="button" type="button" onClick={handleClick}>
            add todo
          </button>
        </div>
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <li className="todo-list-item" key={todo}>
                <span>{todo}</span>{" "}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(todo)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
