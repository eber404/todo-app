import "./styles/App.css"
import { If } from "./components/If"
import { Todo } from "./core/domain/entities/todo"
import { useTodo } from "./hooks/useTodo"

function App() {
  const { todos, addTodo, deleteTodo, toggleDone } = useTodo()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const formData = Object.fromEntries(form.entries())

    const todo = Todo.new({
      name: formData.name.toString(),
      description: formData.description.toString(),
    })

    await addTodo(todo)
  }

  return (
    <div className="container">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <input className="input" name="name" placeholder="name" />
          <textarea
            className="input"
            name="description"
            placeholder="description"
          />
          <button className="button" type="submit">
            add todo
          </button>
        </form>
        <If condition={!!todos.length}>
          <div className="todo-list">
            <ul>
              {todos.map((todo) => (
                <li className="todo-list-item" key={todo.id}>
                  <span title={todo.description}>
                    <If
                      condition={todo.isDone}
                      elseComponent={<>{todo.name}</>}
                    >
                      <s>{todo.name}</s>
                    </If>
                  </span>

                  <button
                    className="delete-button"
                    onClick={() => toggleDone(todo.id)}
                  >
                    ✅
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </If>
      </div>
    </div>
  )
}

export default App
