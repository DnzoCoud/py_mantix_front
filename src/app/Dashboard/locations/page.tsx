'use client'
import Headers from '@/Components/Globals/Headers'
import LocationDatatable from '@/Components/Locations/LocationDatatable'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import React, { useState } from 'react'

export default function LocationPage() {
    const [activateAdd, setActivateAdd] = useState<boolean>(false);
  return (
    <>
        <div className="mb-4 flex justify-between items-center">
            <Headers
            title="Locaciones"
            subtitle="Gestion de las locaciones de la empresa"
            icon={PrimeIcons.USERS}
            />
            <Button
                label="Agregar Locacion"
                icon={PrimeIcons.PLUS}
                size="small"
                severity="success"
                onClick={() => setActivateAdd(true)}
            />
        </div>
        <div className="w-full h-auto flex items-center justify-end p-1">
        </div>
        <LocationDatatable/>
    </>
  )
}
