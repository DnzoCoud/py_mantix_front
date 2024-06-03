"use client";
import React, { useRef } from "react";

export default function EventHeader({ options }:any) {
  const configMenu = useRef<HTMLElement | null>(null);
  return (
    <>
      <div className="w-full flex items-center p-4 bg-red-200">
        <button
          className="p-panel-header-icon p-link mr-2"
          onClick={(e) => configMenu?.current?.toggle(e)}
        >
          <span className="pi pi-cog"></span>
        </button>
        {options.togglerElement}
      </div>
    </>
  );
}
