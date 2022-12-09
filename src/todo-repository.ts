import { Todo } from "./todo"

export interface TodoRepository {
  add(todo: Todo): Promise<void>
  list(): Promise<Todo[]>
  remove(id: string): Promise<void>
}
