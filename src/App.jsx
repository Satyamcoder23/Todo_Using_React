console.log("Before load:", localStorage.getItem("todos"));
import React from "react";
import { useEffect } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoItem } from "./components";
import './App.css';
import { TodoForm } from "./components";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [hasLoaded, setHasLoaded] = React.useState(false); // ✅ Added flag

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id ? todo : prevtodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) =>
        todo.id !== id
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo
      )
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored && stored.trim().startsWith("[")) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      } catch (err) {
        console.error("Failed to parse todos from localStorage:", err);
      }
    }
    setHasLoaded(true); // ✅ Mark load complete
  }, []);

  useEffect(() => {
    if (hasLoaded && Array.isArray(todos)) {
      console.log("Saving todos:", todos); // ✅ Confirm save
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, hasLoaded]);

  return (
    <TodoProvider value={{ todos, addTodo, setTodos, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem key={todo.id} todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;