import { ReactElement } from "react"

import { FirestoreTodoRepository } from "./firestore-todo-repository"
import { TodoProvider } from "./TodoContext"

const todoRepository = new FirestoreTodoRepository()

export function TodoProviderWrapper({ children }: { children: ReactElement }) {
  return <TodoProvider todoRepository={todoRepository}>{children}</TodoProvider>
}
