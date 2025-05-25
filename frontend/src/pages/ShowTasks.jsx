import React, { useState } from "react";
import axios from "axios";

function ShowTasks() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const handleFetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/tasks");
      setTasks(res.data);
      setMessage("");
    } catch (error) {
      setMessage("❌ Failed to fetch tasks.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm(`Are you sure you want to delete task #${taskId}?`)) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
      setMessage("Task deleted successfully.");
    } catch (error) {
      setMessage("❌ Failed to delete task: " + (error.response?.data?.detail || error.message));
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditForm({ title: task.title, description: task.description });
    setMessage("");
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setMessage("");
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (taskId) => {
    if (!editForm.title.trim()) {
      setMessage("❌ Title cannot be empty.");
      return;
    }
    try {
      await axios.put(`http://127.0.0.1:8000/tasks/${taskId}`, {
        id: taskId,
        title: editForm.title,
        description: editForm.description,
      });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, ...editForm } : task
        )
      );
      setEditTaskId(null);
      setMessage("Task updated successfully.");
    } catch (error) {
      setMessage("❌ Failed to update task: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">

      <button
        onClick={handleFetchTasks}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Show Tasks
      </button>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="text-black border p-4 rounded bg-gray-50 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div>
                <strong>ID:</strong> #{task.id}
              </div>
              <div>
                {editTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="mr-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task)}
                      className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {editTaskId === task.id ? (
              <div className="flex flex-col space-y-2">
                <input
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                  placeholder="Description"
                  rows={3}
                />
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowTasks;
