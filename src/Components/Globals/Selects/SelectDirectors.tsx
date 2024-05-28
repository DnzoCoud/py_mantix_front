import { IUser } from "@/interfaces/IUser";
import { useAuthStore } from "@/stores/auth/authStore";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

interface SelectDirectorProps {
  value: IUser | null | undefined;
  onChange: (value: IUser | null) => void;
  selectedDirectorId?: number;
}
export default function SelectDirectors({
  value,
  onChange,
  selectedDirectorId
}: SelectDirectorProps) {
  const authStore = useAuthStore();
  const [directors, setDirectors] = useState<IUser[]>([]);
  const [selectedDirector, setSelectedDirector] = useState<IUser | null>(value || null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleMachineChange = (event: IUser | null) => {
    onChange(event);
  };

  const findAllDirectors = async () => {
    setLoading(true);
    await authStore.getDirectors();
    setDirectors(authStore.directors);
    setLoading(false);

    if (selectedDirectorId) {
      const director = authStore.directors.find(d => d.id === selectedDirectorId);
      if (director) {
        setSelectedDirector(director);
        onChange(director);
      }
    }
  };

  useEffect(() => {
    findAllDirectors();
  }, []);
  return (
    <Dropdown
      value={value}
      options={directors}
      onChange={(e: DropdownChangeEvent) => handleMachineChange(e.value)}
      placeholder="Director de area"
      optionLabel="username"
      dataKey="id"
      filter
      loading={loading}
      pt={{
        root: {
          className: "selectMaquina",
        },
      }}
    />
  );
}
