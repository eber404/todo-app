import { ReactElement } from "react"

import { FirestoreTodoRepository } from "../core/infra/repositories/firebase/firestore-todo-repository"
import { TodoProvider } from "../contexts/TodoContext"

const todoRepository = new FirestoreTodoRepository()

export function TodoProviderWrapper({ children }: { children: ReactElement }) {
  return <TodoProvider todoRepository={todoRepository}>{children}</TodoProvider>
}
