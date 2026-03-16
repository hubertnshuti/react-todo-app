import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"

export default function App() {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([
    { id: 1, text: "Cleaning", completed: false },
    { id: 2, text: "Shoppping", completed: false },
    {
      id: 3,
      text: "A to do app built with React and Tailwind CSS",
      completed: false
    }
  ])

  const addTodo = () => {
    if (inputText.trim() === "") return

    const newTodo = {
      id: Date.now(),
      text: inputText,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputText("")
  }

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const deleteTodo = (id) => {
    const remainingTodos = todos.filter((todo) => todo.id !== id)
    setTodos(remainingTodos)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-[90px] md:text-[120px] font-bold text-gray-200 leading-none mb-10">
          todos
        </h1>

        <div className="bg-white rounded-full shadow-md px-5 py-4 flex items-center mb-8">
          <input
            type="text"
            placeholder="Add todo..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-xl text-gray-700"
          />

          <button
            onClick={addTodo}
            className="text-cyan-500 text-2xl"
          >
            <FaPlus />
          </button>
        </div>

        <div className="bg-transparent">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 text-xl mt-10">
              No todos yet
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between border-b border-gray-200 py-5"
              >
                <div className="flex items-start gap-4 flex-1 pr-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mt-2 w-5 h-5"
                  />

                  <p
                    className={`text-2xl text-gray-700 break-words ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </p>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="w-16 h-16 rounded-full bg-gray-200 text-orange-500 flex items-center justify-center text-2xl shrink-0"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}