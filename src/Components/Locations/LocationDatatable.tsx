import { ILocation } from "@/interfaces/ILocation";
import { setLocations } from "@/redux/features/locationSlice";
import { useAppSelector } from "@/redux/hooks";
import { useFetchLocationsQuery } from "@/redux/services/locationService";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LocationForm from "./LocationForm";

export default function LocationDatatable() {
  const [location, setLocation] = useState<ILocation>()
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [editLocation, setEditLocation] = useState<boolean>(false);
  const dispatch = useDispatch()
  const {data:fetchLocations, isLoading} = useFetchLocationsQuery()
  const locations = useAppSelector(state => state.location.locations)
  useEffect(()=>{
    if(fetchLocations)
      dispatch(setLocations(fetchLocations))
  },[fetchLocations, dispatch])

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

  const actionHandler = (rowData:ILocation) =>{
    return(
      <React.Fragment>
          <Button icon="pi pi-pencil" rounded text className="mr-2" onClick={() => showDialog(rowData)}/>
          <Button icon="pi pi-trash" rounded text severity="danger"  />
      </React.Fragment>
    )
  }
  const header = renderHeader();

  const showDialog = (location: ILocation) => {
    setLocation({...location})
    setEditLocation(true)
    
  }
  const hideDialog = () => {
    setEditLocation(false)
    setLocation(undefined)
  };

  return (
    <>
      <DataTable 
        tableStyle={{ minWidth: "50rem" }} 
        value={locations}
        paginator 
        rows={10} 
        rowsPerPageOptions={[10, 25, 50]} 
        dataKey="id"
        header={header}
        filters={filters}
        resizableColumns
        stripedRows
        showGridlines
        groupRowsBy="area_detail.name"
        pt={
          {
            root:{
              className:"rounded-md"
            }
          }
        }
      >
        <Column field="name" header="Nombre"></Column>
        <Column field="area_detail.name" header="Area"></Column>
        <Column field="manager_detail.username" header="Jefe de Locacion"></Column>
        <Column body={actionHandler} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>

      <Dialog visible={editLocation} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Editar Locacion" modal className="p-1" onHide={hideDialog}>
        <LocationForm id={location?.id}/>
      </Dialog>
    </>
  );
}
