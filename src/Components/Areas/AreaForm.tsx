import React from 'react'
import Label from '../Globals/Label'
import { InputText } from 'primereact/inputtext'

export default function AreaForm() {
  return (
    <>
        <div className="flex flex-col justify-evenly">
            <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 ">
                    <div className="w-full flex flex-col">
                    <Label text="Nombre del area" isObligatory={true} idFor="" />
                    <InputText
                        placeholder="Nombre del area"
                        size={'small'}
                    />
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
