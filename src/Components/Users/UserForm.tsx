"use client";
import React, { useEffect, useRef } from "react";
import Label from "../Globals/Label";
import { InputText } from "primereact/inputtext";

import { Messages } from "primereact/messages";

export default function UserForm() {
  const msgs = useRef<Messages>(null);
  useEffect(() => {
    msgs.current?.show({
      id: "1",
      sticky: true,
      severity: "info",
      summary: "Info",
      detail: "El usuario recibira un correo para establecer su contrasena",
      closable: true,
    });
  }, []);
  return (
    <div className="flex flex-col justify-evenly">
      <Messages ref={msgs} />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
          <Label text="Nombre de usuario" isObligatory={true} />
          <InputText maxLength={40} pt={{ root: { className: "!w-full" } }} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6 ">
          <Label text="Correo electronico" isObligatory={true} />
          <InputText maxLength={40} pt={{ root: { className: "!w-full" } }} />
        </div>
      </div>
    </div>
  );
}
