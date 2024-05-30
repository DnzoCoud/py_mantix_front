import React from 'react'
import './loader.css'
export default function Loader({isLoad}:{isLoad:boolean}) {
  return (
    <>
      <div className={`w-full h-full  items-center justify-center fixed bg-slate-800 bg-opacity-70 z-50 ${isLoad ? 'flex' : 'hidden'}`}>
        <div className="container">
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
          <div className="slice"></div>
        </div>
      </div>
    </>
  )
}
