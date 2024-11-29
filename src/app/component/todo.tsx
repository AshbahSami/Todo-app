'use client'
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function ToDo() {
  const [task, setTask] = useState<Task[]>([]);
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);

    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks) as Task[]);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tasks", JSON.stringify(task)); // Save tasks to local storage
    }
  }, [task, mounted]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTask([...task, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTask(task.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-dark-gray min-h-screen items-center py-56 px-10">
      <Card className="flex-col 
     md:flex-row md:px-9 justify-center px-6 py-5 bg-dark-gray border-transparent shadow-custom-purple">
        <div className="flex justify-center mb-6">
          <Input
            type="text"
            placeholder="Enter the Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex px-4 py-5 text-white border-transparent shadow-custom-purple justify-between"
          />
          <button
            onClick={addTask}
            className="text-white px-2 py-2 bg-purple-700 ml-4"
          >
            Enter
          </button>
        </div>

        <div className="flex flex-col items-center">
          {task.length === 0 ? (
            <p className="text-white">No tasks for now</p>
          ) : (
            task.map((task) => (
              <div
                key={task.id}
                className={`flex items-center w-full justify-between px-4 py-2 mb-2 ${
                  task.completed ? "bg-purple-700" : "bg-purple-500"
                } text-white rounded-lg`}
              >
                <div
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`cursor-pointer ${task.completed ? "line-through" : ""}`}
                >
                  {task.text}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 text-red-500 shadow-black"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
