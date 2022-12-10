import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore"

import { Todo } from "./todo"
import { TodoRepository } from "./todo-repository"
import { db } from "./firebase"

export class FirestoreTodoRepository implements TodoRepository {
  private readonly collection = collection(db, "todos")

  async add(todo: Todo): Promise<void> {
    await addDoc(this.collection, { ...todo })
  }

  async list(): Promise<Todo[]> {
    const { docs } = await getDocs(this.collection)

    return docs.map((doc) =>
      Todo.new({
        id: doc.data().id,
        name: doc.data().name,
        startAt: doc.data().startAt,
        description: doc.data().description,
      })
    )
  }

  async remove(id: string): Promise<void> {
    const q = query(this.collection, where("id", "==", id))
    const docs = await getDocs(q)
    const todo = docs.docs.filter((doc) => doc.data().id === id)[0]

    deleteDoc(doc(this.collection, "todos", todo.data().id))
  }
}
