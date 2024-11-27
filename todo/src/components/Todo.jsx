import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please log in to access your todos.");
      navigate("/signin");
    } else {
      fetchTodos();
    }
  }, [token]);

  // Fetch todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/todos", {
        headers: { token },
      });
      setTasks(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      alert("Error fetching todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    const trimmedTask = newTask.trim();
    if (trimmedTask) {
      try {
        await axios.post(
          "http://localhost:3000/todo",
          { title: trimmedTask, done: false },
          { headers: { token } }
        );
        setNewTask("");
        fetchTodos();
      } catch (error) {
        console.error("Error adding todo:", error.message);
        alert("Error adding todo. Please try again.");
      }
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todo/${id}`, {
        headers: { token },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error.message);
      alert("Failed to delete the task. Try again.");
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditText(task.title);
  };

  // Update a task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      const response = await axios.put(
        `http://localhost:3000/todo/${editingTask}`,
        { title: editText },
        { headers: { token } }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask ? response.data.updatedTodo : task
        )
      );
      alert("Task updated successfully!");
      setEditingTask(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error.message);
      alert("Failed to update the task. Try again.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    alert("You have been signed out.");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkest p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="navbar fixed top-0 left-0 w-full z-10 bg-darkest">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">
              <h1>TodoList</h1>
            </a>
          </div>
          <div className="flex-none gap-2">
            
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-15 rounded-full">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full">
                      <span className="text-xl">T</span>
                    </div>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a onClick={handleSignOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <div className="mt-16 p-4 border-b border-light">
          <form className="flex gap-4 items-center" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-2 bg-darker text-light border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-lg"
            />
            <button
              type="submit"
              className="bg-accent text-slate-50  px-4 py-2 rounded-lg hover:bg-light hover:text-dark transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Task List */}
        {loading ? (
          <p className="text-center text-light">Loading...</p>
        ) : (
          <ul className="mt-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center text-lg p-3 bg-dark rounded-lg mb-3 shadow-md"
              >
                {editingTask === task._id ? (
                  <form className="flex gap-2" onSubmit={handleUpdateTask}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-grow p-2 bg-dark border border-light text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-slate-50 px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTask(null);
                        setEditText("");
                      }}
                      className="bg-gray-500 text-slate-50  px-3 py-1 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="text-light">{task.title}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(task)}
                        className="bg-yellow-500 text-slate-50  px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="bg-red-500 text-slate-50  px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
