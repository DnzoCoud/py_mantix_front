import { IMaquina } from "@/interfaces/IMaquina";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import React, { useEffect } from "react";

interface SelectMaquinaProps {
  value: IMaquina | null;
  onChange: (value: IMaquina | null) => void;
}

const SelectMaquina: React.FC<SelectMaquinaProps> = ({ value, onChange }) => {
  const handleMachineChange = (event: IMaquina | null) => {
    onChange(event);
  };

  const machines: IMaquina[] = [
    { name: "Maquina Nueva", code: 123 },
    { name: "Segunda Maquina", code: 234 },
  ];

  useEffect(() => {
    console.log("MAQUINA", value);
  }, [value]);

  return (
    <Dropdown
      value={value}
      options={machines}
      onChange={(e: DropdownChangeEvent) => handleMachineChange(e.value)}
      placeholder="Seleccione una maquina"
      optionLabel="name"
      filter
      pt={{
        root: {
          className: "selectMaquina",
        },
      }}
    />
  );
};

export default SelectMaquina;
