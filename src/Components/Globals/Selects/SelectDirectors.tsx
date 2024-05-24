import { IUser } from "@/interfaces/IUser";
import { useAuthStore } from "@/stores/auth/authStore";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

interface SelectDirectorProps {
  value: IUser | null | undefined;
  onChange: (value: IUser | null) => void;
}
export default function SelectDirectors({
  value,
  onChange,
}: SelectDirectorProps) {
  const authStore = useAuthStore();
  const [directors, setDirectors] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleMachineChange = (event: IUser | null) => {
    onChange(event);
  };

  const findAllDirectors = async () => {
    setLoading(true);
    await authStore.getDirectors();
    setDirectors(authStore.directors);
    setLoading(false);
  };

  useEffect(() => {
    findAllDirectors();
  }, []);
  return (
    <Dropdown
      value={value}
      options={directors}
      onChange={(e: DropdownChangeEvent) => handleMachineChange(e.value)}
      placeholder="Seleccione una maquina"
      optionLabel="name"
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
