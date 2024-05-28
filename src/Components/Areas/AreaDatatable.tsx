import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { useAreaStore } from "@/stores/useAreaStore";
import { IArea } from "@/interfaces/IArea";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AreaForm from "./AreaForm";

export default function AreaDatatable() {
  const [area, setArea] = useState<IArea>()
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [editArea, setEditArea] = useState<boolean>(false);

  const areaStore = useAreaStore()
  const findAllAreas = async () => {
    await areaStore.getAreas()
  }
  useEffect(() => {
    findAllAreas()
  }, [])

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let _filters = { ...filters };

      // @ts-ignore
      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  };
  const renderHeader = () => {
      return (
          <div className="flex justify-end">
            <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filtrar informacion" />
          </div>
      );
  };
  const header = renderHeader();

  const actionHandler = (rowData:IArea) =>{
    return(
      <React.Fragment>
          <Button icon="pi pi-pencil" rounded text className="mr-2" onClick={() => showDialog(rowData)}/>
          <Button icon="pi pi-trash" rounded text severity="danger"  />
      </React.Fragment>
    )
  }
  const showDialog = (area: IArea) => {
    setArea({...area})
    setEditArea(true)
    
  }
  const hideDialog = () => {
    setEditArea(false)
    setArea(undefined)
  };
  return (
    <>
      <DataTable
        value={areaStore.areas} 
        tableStyle={{ minWidth: "50rem" }} 
        paginator 
        rows={5} 
        rowsPerPageOptions={[5, 10, 25, 50]} 
        dataKey="id"
        header={header}
        filters={filters}
        resizableColumns
        stripedRows
        showGridlines
        pt={
          {
            root:{
              className:"rounded-md"
            }
          }
        }
      >
        <Column field="name" header="Nombre" sortable ></Column>
        <Column field="director_detail.username" header="Director" sortable></Column>
        <Column body={actionHandler} exportable={false} style={{ minWidth: '12rem' }}></Column>

      </DataTable>

      <Dialog visible={editArea} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Area" modal className="p-1" onHide={hideDialog}>
        <AreaForm id={area?.id}/>
      </Dialog>
    </>
  );
}