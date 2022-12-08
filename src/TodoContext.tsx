import React, { createContext, ReactElement, useState } from "react";

interface TodoContextState {
  todos: string[];
  addTodo: (todo: string) => void;
  deleteTodo: (todo: string) => void;
}

interface TodoProviderProps {
  children: ReactElement;
}

export const TodoContext = createContext({} as TodoContextState);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState([] as string[]);

  function addTodo(todo: string) {
    setTodos((oldTodos) => [...oldTodos, todo]);
  }

  function deleteTodo(todo: string) {
    setTodos((oldTodos) => oldTodos.filter((oldTodo) => oldTodo !== todo));
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
