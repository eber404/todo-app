import { Todo } from "../entities/todo"

export type OnUpdateTodoCallback = (todo: Todo[]) => void

export interface TodoRepository {
  add(todo: Todo): Promise<void>
  remove(id: string): Promise<void>
  onUpdateTodo(callback: OnUpdateTodoCallback): Promise<void>
  markAsDone(id: string): Promise<void>
  markAsUndone(id: string): Promise<void>
}
