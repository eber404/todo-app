import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore"

import { Todo } from "./todo"
import { OnNewTodoCallback, TodoRepository } from "./todo-repository"
import { db } from "./firebase"

export class FirestoreTodoRepository implements TodoRepository {
  private readonly collection = collection(db, "todos")

  async add(todo: Todo): Promise<void> {
    await addDoc(this.collection, {
      ...todo,
      createdAt: todo.createdAt.toISOString(),
    })
  }

  async list(): Promise<Todo[]> {
    const { docs } = await getDocs(this.collection)

    return docs.map((doc) =>
      Todo.new({
        id: doc.data().id,
        name: doc.data().name,
        description: doc.data().description,
        isDone: doc.data().isDone,
        createdAt: doc.data().createdAt,
      })
    )
  }

  async remove(id: string): Promise<void> {
    const q = query(this.collection, where("id", "==", id))
    const docs = await getDocs(q)
    const todo = docs.docs.filter((doc) => doc.data().id === id)[0]

    deleteDoc(doc(this.collection, todo.id))
      .then(() => console.log("deletado com sucesso"))
      .catch((err) => console.log("err", err))
  }

  async onNewTodo(callback: OnNewTodoCallback): Promise<void> {
    const q = query(this.collection, orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) return

      const todos = [] as Todo[]

      querySnapshot.forEach((doc) =>
        todos.push(
          Todo.new({
            id: doc.data().id,
            name: doc.data().name,
            description: doc.data().description,
            isDone: doc.data().isDone,
            createdAt: doc.data().createdAt,
          })
        )
      )

      console.log("todos =>", todos)

      callback(todos)
    })
  }
}
