import React, { useState, useEffect, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { IActivity } from "@/interfaces/IActivity";
import { FloatLabel } from "primereact/floatlabel";
import { useFetchTechnicalsQuery } from "@/redux/services/userService";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { IUser } from "@/interfaces/IUser";

interface ActivityFormProps {
  setActivities: React.Dispatch<React.SetStateAction<TechnicianActivities[]>>;
  initialTasks?: TechnicianActivities[];
}

export interface TechnicianActivities {
  technician: IUser | null;
  activities: IActivity[];
}

export default function ActivityForm({
  setActivities,
  initialTasks,
}: ActivityFormProps) {
  const [technicianActivities, setTechnicianActivities] = useState<
    TechnicianActivities[]
  >(initialTasks || []);
  const inputRefs = useRef<Map<number, HTMLInputElement | null>>(new Map());
  const [technicians, setTechnicians] = useState<IUser[]>([]);
  const {
    data: fetchTechnicians,
    isLoading: technicalLoading,
    refetch,
  } = useFetchTechnicalsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchTechnicians) {
      setTechnicians(fetchTechnicians);
    }
  }, [fetchTechnicians]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    techIndex: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask(techIndex);
    } else if (e.key === "Backspace" && e.currentTarget.value === "") {
      e.preventDefault();
      removeTask(index, techIndex);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    techIndex: number
  ) => {
    const newActivities = technicianActivities.map((techAct, i) =>
      i === techIndex
        ? {
            ...techAct,
            activities: techAct.activities.map((task, j) =>
              j === index ? { ...task, name: e.target.value } : task
            ),
          }
        : techAct
    );
    setTechnicianActivities(newActivities);
  };

  const addTask = (techIndex: number) => {
    const newTask: IActivity = {
      id: null,
      name: "",
      completed: false,
      technical: null,
    };
    const newActivities = technicianActivities.map((techAct, i) =>
      i === techIndex
        ? { ...techAct, activities: [...techAct.activities, newTask] }
        : techAct
    );
    setTechnicianActivities(newActivities);
  };

  const removeTask = (index: number, techIndex: number) => {
    if (technicianActivities[techIndex].activities.length === 1) return;
    const newActivities = technicianActivities.map((techAct, i) =>
      i === techIndex
        ? {
            ...techAct,
            activities: techAct.activities.filter((_, j) => j !== index),
          }
        : techAct
    );
    setTechnicianActivities(newActivities);
  };

  const toggleComplete = (index: number, techIndex: number) => {
    const newActivities = technicianActivities.map((techAct, i) =>
      i === techIndex
        ? {
            ...techAct,
            activities: techAct.activities.map((task, j) =>
              j === index ? { ...task, completed: !task.completed } : task
            ),
          }
        : techAct
    );
    setTechnicianActivities(newActivities);
  };

  const addTechnician = () => {
    setTechnicianActivities([
      ...technicianActivities,
      {
        technician: null,
        activities: [{ id: null, name: "", completed: false, technical: null }],
      },
    ]);
  };

  const removeTechnician = (techIndex: number) => {
    const newTechnicianActivities = technicianActivities.filter(
      (_, i) => i !== techIndex
    );
    setTechnicianActivities(newTechnicianActivities);
  };

  useEffect(() => {
    setActivities(technicianActivities);
  }, [technicianActivities, setActivities]);

  return (
    <>
      {technicianActivities.map((techAct, techIndex) => (
        <div
          key={techIndex}
          className="my-2 w-full flex flex-col transition-all bg-zinc-50 px-4 rounded-lg border justify-between items-stretch"
        >
          <div className="w-full flex items-center justify-end py-2">
            <Button
              size="small"
              outlined
              type="button"
              icon="pi pi-minus"
              className="border-red-500 text-red-500 hover:bg-red-100 active:bg-red-200 !p-1 "
              title="Eliminar tecnico"
              onClick={() => removeTechnician(techIndex)} // Elimina tecnico
            />
          </div>
          <FloatLabel
            pt={{
              root: {
                className: "!w-full",
              },
            }}
          >
            <Dropdown
              value={techAct.technician}
              options={technicians}
              loading={technicalLoading}
              optionLabel="username"
              dataKey="id"
              filter
              onChange={(e) => {
                const selectedTechnicianId = e.value;
                const selectedTechnician = technicians.find(
                  (t) => t.id === selectedTechnicianId.id
                );
                const newTechnicianActivities = technicianActivities.map(
                  (ta, i) =>
                    i === techIndex
                      ? { ...ta, technician: selectedTechnician || null }
                      : ta
                );
                setTechnicianActivities(newTechnicianActivities);
              }}
              className="!w-full mb-2"
            />
            <label
              htmlFor="username"
              style={{ left: "3%", transition: "all .2s ease" }}
            >
              Técnico encargado
            </label>
          </FloatLabel>
          {techAct.activities.map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-start mt-2 ml-4 "
            >
              <Checkbox
                onChange={() => toggleComplete(index, techIndex)}
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
                placeholder="Describe la tarea aquí..."
                value={task.name}
                onChange={(e) => handleChange(e, index, techIndex)}
                onKeyDown={(e) => handleKeyDown(e, index, techIndex)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  fontStyle: task.completed ? "italic" : "normal",
                  color: task.completed ? "gray" : "black",
                }}
                className={`bg-white border-b w-full p-[0.2rem] focus:bg-zinc-50 ${
                  task.completed ? "border-blue-500" : " border-black"
                }`}
              />
            </div>
          ))}
          <div className="mt-8 w-full flex items-center justify-between flex-wrap pb-4">
            <small className="text-zinc-400">
              Oprime enter para una nueva actividad
            </small>
            <Button
              label="Añadir Actividad"
              size="small"
              outlined
              type="button"
              onClick={() => addTask(techIndex)} // Añade nueva actividad
            />
          </div>
        </div>
      ))}
      <Button
        label="Añadir Técnico"
        size="small"
        outlined
        onClick={addTechnician}
        type="button"
      />
    </>
  );
}
