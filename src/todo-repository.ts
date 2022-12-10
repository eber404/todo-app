import { Todo } from "./todo"

export type OnNewTodoCallback = (todo: Todo[]) => void

export interface TodoRepository {
  add(todo: Todo): Promise<void>
  remove(id: string): Promise<void>
  onNewTodo(callback: OnNewTodoCallback): Promise<void>
  markAsDone(id: string): Promise<void>
  markAsUndone(id: string): Promise<void>
}
