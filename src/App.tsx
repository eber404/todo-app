import "./App.css"
import { Todo } from "./todo"
import { useTodo } from "./useTodo"

function App() {
  const { todos, addTodo, deleteTodo } = useTodo()

  const handleSubmit = async (e: any) => {
    console.log("e =>", e)
    e.preventDefault()

    const form = new FormData(e.target)
    const formData = Object.fromEntries(form.entries())

    const todo = Todo.new({
      name: formData.name.toString(),
      startAt: new Date(formData.startAt.toString()),
      description: formData.description.toString(),
    })

    await addTodo(todo)
  }

  return (
    <div className="container">
      <div className="form-box">
        <div className="form" onSubmit={handleSubmit}>
          <input className="input" name="name" placeholder="name" />
          <textarea
            className="input"
            name="description"
            placeholder="description"
          />
          <input
            className="input"
            type="date"
            name="startAt"
            placeholder="start date"
          />
          <button className="button" type="submit">
            add todo
          </button>
        </div>
        <div className="todo-list">
          <ul>
            {todos.map((todo) => (
              <li className="todo-list-item" key={todo.id}>
                <span
                  title={`${todo.description} @ ${todo.startAt.toDateString()}`}
                >
                  {todo.name}
                </span>{" "}
                <button className="delete-button">x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
