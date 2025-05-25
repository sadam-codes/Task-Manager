import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddTask from "./pages/AddTask";
import ShowTasks from "./pages/ShowTasks";

function App() {
  return (
    <Router>
      <div className="p-6 font-sans bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 min-h-screen text-white">
        <nav className="flex flex-col sm:flex-row justify-center sm:justify-between items-center max-w-4xl mx-auto mb-10 space-y-4 sm:space-y-0 sm:space-x-8">
          <h1 className="text-3xl font-extrabold tracking-wide drop-shadow-lg select-none">
            Task Manager
          </h1>

          <div className="flex space-x-6">
            {["/", "/tasks"].map((path, idx) => {
              const name = path === "/" ? "Add Task" : "Show Tasks";
              return (
                <NavLink
                  key={idx}
                  to={path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 font-semibold text-lg transition-all duration-300 
                    ${
                      isActive
                        ? "text-yellow-300 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-yellow-300"
                        : "text-white hover:text-yellow-300"
                    }`
                  }
                  end={path === "/"}
                >
                  {name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path="/tasks" element={<ShowTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
