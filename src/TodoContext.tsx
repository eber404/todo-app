import { createContext, ReactElement, useEffect, useState } from "react"

import { Todo } from "./todo"
import { TodoRepository } from "./todo-repository"

interface TodoContextState {
  todos: Todo[]
  addTodo: (todo: Todo) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  toggleDone: (id: string) => Promise<void>
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

  const onNewTodo = (todos: Todo[]) => {
    setTodos([...todos])
  }

  const toggleDone = async (id: string) => {
    const todo = todos.find((todo) => todo.id === id)

    if (!todo) return console.log("[Todo] não pode ser completado.")

    if (todo.isDone) {
      return await todoRepository.markAsUndone(id)
    }

    await todoRepository.markAsDone(id)
  }

  useEffect(() => {
    todoRepository.onNewTodo(onNewTodo)
  }, [""])

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone }}>
      {children}
    </TodoContext.Provider>
  )
}
