import React from "react";

interface HeadersProps {
  title: string;
  subtitle?: string;
  icon: string;
}
export default function Headers({ title, icon, subtitle }: HeadersProps) {
  return (
    <>
      <div className="w-auto flex justify-start items-center mb-4">
        <i
          className={`${icon} text-blue-400 dark:text-green-400 mr-4 text-xl`}
        ></i>
        <div className="w-auto flex flex-col">
          <span className="font-extrabold dark:text-white">{title}</span>
          <span className="text-slate-400">{subtitle}</span>
        </div>
      </div>
    </>
  );
}
