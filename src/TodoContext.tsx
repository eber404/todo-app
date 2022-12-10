import { createContext, ReactElement, useEffect, useState } from "react"

import { Todo } from "./todo"
import { TodoRepository } from "./todo-repository"

interface TodoContextState {
  todos: Todo[]
  addTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

interface TodoProviderProps {
  children: ReactElement
  todoRepository: TodoRepository
}

export const TodoContext = createContext({} as TodoContextState)

export function TodoProvider({ children, todoRepository }: TodoProviderProps) {
  const [todos, setTodos] = useState([] as Todo[])

  async function addTodo(todo: Todo) {
    await todoRepository.add(todo)
  }

  async function deleteTodo(id: string) {
    await todoRepository.remove(id)
  }

  async function listTodos() {
    const todos = await todoRepository.list()

    setTodos(todos)
  }

  useEffect(() => {
    listTodos()
  }, [""])

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}
