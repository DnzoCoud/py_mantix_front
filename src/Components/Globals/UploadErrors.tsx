"use client";
import React from "react";

interface ErrorDisplayProps {
  errors: { fila: number; columna: string; message: string }[];
}
export default function UploadErrors({ errors }: ErrorDisplayProps) {
  return (
    <>
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Errores encontrados:</strong>
        <ul className="mt-3 list-disc list-inside">
          {errors.map((error, index) => (
            <li key={index}>
              <span className="block sm:inline">
                Fila {error.fila}: {error.message}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
