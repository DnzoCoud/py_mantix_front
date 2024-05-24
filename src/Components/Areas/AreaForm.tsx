import React, { useState } from 'react'
import Label from '../Globals/Label'
import { InputText } from 'primereact/inputtext'
import SelectDirectors from '../Globals/Selects/SelectDirectors'
import { IUser } from '@/interfaces/IUser'

export default function AreaForm() {
    const [director, setDirector] = useState<IUser | null>()
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
                <div className="col-span-6">
                    <div className="w-full flex flex-col">
                        <Label text="Director de area" isObligatory={true} idFor="" />
                        <SelectDirectors value={director} onChange={setDirector}/>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
