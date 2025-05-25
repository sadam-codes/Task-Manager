import React, { useState } from "react";
import axios from "axios";

function AddTask() {
  const [form, setForm] = useState({ id: "", title: "", description: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/tasks", {
        id: parseInt(form.id),
        title: form.title,
        description: form.description
      });
      setMessage("✅ Task added successfully!");
      setIsError(false);
      setForm({ id: "", title: "", description: "" });
    } catch (error) {
      setMessage("❌ Failed to add task. " + (error.response?.data?.detail || ""));
      setIsError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Add Task</h2>

      <input
        type="number"
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
        className="text-black w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="text-black w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="text-black w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

      <button
        onClick={handleAddTask}
        className="text-black w-full bg-indigo-600 hover:bg-indigo-700font-semibold py-3 rounded-lg shadow-md transition"
      >
        Add Task
      </button>

      {message && (
        <p
          className={`text-black mt-6 text-center text-sm font-medium ${isError ? "text-red-600" : "text-green-600"
            } select-none`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default AddTask;
