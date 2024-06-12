"use client";
import { Checkbox } from "primereact/checkbox";
import { IActivity } from "@/interfaces/IActivity";
import React, { useEffect, useRef, useState } from "react";

interface ActivityFormProps {
  setActivities: React.Dispatch<React.SetStateAction<IActivity[]>>;
  initialTasks?: IActivity[];
}

export default function ActivityForm({ setActivities, initialTasks }: ActivityFormProps) {
  const [tasks, setTasks] = useState<IActivity[]>(initialTasks || [{ id: null, name: "", completed: false }]);
  const inputRefs = useRef<Map<number, HTMLInputElement | null>>(new Map());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    } else if (e.key === "Backspace" && e.currentTarget.value === "") {
      e.preventDefault();
      removeTask(index);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, name: e.target.value } : task
    );
    setTasks(newTasks);
  };

  const addTask = () => {
    const newTask: IActivity = { id: null, name: "", completed: false };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (index: number) => {
    if (tasks.length === 1) return;
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleComplete = (index: number) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  useEffect(() => {
    setActivities(tasks);
  }, [tasks, setActivities]);

  useEffect(() => {
    if (tasks.length > 0) {
      const lastIndex = tasks.length - 1;
      const lastInput = inputRefs.current.get(lastIndex);
      if (lastInput) {
        lastInput.focus();
      }
    }
  }, [tasks]);

  return (
    <>
      <span>actividades</span>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center justify-start mt-2">
          <Checkbox
            onChange={() => toggleComplete(index)}
            checked={task.completed}
            disabled={task.name.trim() === ""}
            pt={{
              root: {
                className: "mr-1",
              },
            }}
          />
          <input
            ref={(el) => {
              if (el) {
                inputRefs.current.set(index, el);
              }
            }}
            type="text"
            placeholder="Describe la tarea aqui..."
            value={task.name}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              fontStyle: task.completed ? "italic" : "normal",
            }}
            className="bg-slate-200 w-full p-[0.2rem] rounded-md"
          />
        </div>
      ))}
    </>
  );
}
