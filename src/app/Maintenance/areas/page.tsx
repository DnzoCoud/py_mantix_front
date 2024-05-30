'use client'
import AreaDatatable from '@/Components/Areas/AreaDatatable'
import AreaForm from '@/Components/Areas/AreaForm'
import Headers from '@/Components/Globals/Headers'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'

export default function AreaPage() {
    const [activateAdd, setActivateAdd] = useState<boolean>(false);

  return (
    <>
        <div className="mb-4 flex justify-between items-center">
            <Headers
            title="Areas"
            subtitle="Gestion de las areas de la empresa"
            icon={PrimeIcons.BOOKMARK}
            />
            <Button
                label="Agregar Area"
                icon={PrimeIcons.PLUS}
                size="small"
                severity="success"
                onClick={() => setActivateAdd(true)}
            />
        </div>
        <div className="w-full h-auto flex items-center justify-end p-1">
        </div>
        <AreaDatatable />

        <Dialog
        header="Agregar Area"
        visible={activateAdd}
        onHide={() => setActivateAdd(false)}
        style={{ width: "70vw" }}
        draggable={false}
        pt={{
          content: {
            className: "max-h-[40rem]",
          },
          root: {
            className: "dark:bg-dark_medium_bg",
          },
        }}
      >
            <AreaForm/>
      </Dialog>
    </>
  )
}
