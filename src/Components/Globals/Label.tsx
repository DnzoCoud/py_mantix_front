import React from "react";

export default function Label({
  text,
  isObligatory = false,
  idFor = undefined,
}: {
  text: string;
  isObligatory: boolean;
  idFor: string | undefined;
}) {
  return (
    <label htmlFor={idFor} className="mb-1">
      {text} {isObligatory && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
