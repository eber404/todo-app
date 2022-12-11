import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore"

import { Todo } from "../../../domain/entities/todo"
import {
  OnNewTodoCallback,
  TodoRepository,
} from "../../../domain/repositories/todo-repository"
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

    deleteDoc(doc(this.collection, todo.id)).catch((err) =>
      console.log("[firestore todo repository] erro ao remover todo", err)
    )
  }

  async onNewTodo(callback: OnNewTodoCallback): Promise<void> {
    const q = query(this.collection, orderBy("createdAt", "desc"))
    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) return

      const todos = querySnapshot.docs.map((doc) =>
        Todo.new({
          id: doc.data().id,
          name: doc.data().name,
          description: doc.data().description,
          isDone: doc.data().isDone,
          createdAt: doc.data().createdAt,
        })
      )

      callback(todos)
    })
  }

  async markAsDone(id: string): Promise<void> {
    const q = query(this.collection, where("id", "==", id))
    const docs = await getDocs(q)

    const docId = docs.docs[0].id
    const todo = docs.docs[0].data()

    const docRef = doc(this.collection, docId)

    await updateDoc(docRef, {
      ...todo,
      isDone: true,
    })
  }

  async markAsUndone(id: string): Promise<void> {
    const q = query(this.collection, where("id", "==", id))
    const docs = await getDocs(q)

    const docId = docs.docs[0].id
    const todo = docs.docs[0].data()

    const docRef = doc(this.collection, docId)

    await updateDoc(docRef, {
      ...todo,
      isDone: false,
    })
  }
}
