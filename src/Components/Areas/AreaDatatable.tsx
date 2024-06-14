import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import React, { useCallback, useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { useAreaStore } from "@/stores/useAreaStore";
import { IArea } from "@/interfaces/IArea";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import AreaForm from "./AreaForm";
import Loader from "../Globals/Loader/Loader";
import { useDeleteAreaMutation, useFetchAreasQuery } from "@/redux/services/areaService";
import { useDispatch } from "react-redux";
import { setAreas, setDeleteArea } from "@/redux/features/areaSlice";
import { useAppSelector } from "@/redux/hooks";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useToastStore } from "@/stores/useToastStore";

export default function AreaDatatable() {
  const [area, setArea] = useState<IArea>()
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [editArea, setEditArea] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data: fetchAreas, isLoading, isError, refetch } = useFetchAreasQuery();
  const areas = useAppSelector(state => state.area.areas);
  const [deleteArea] = useDeleteAreaMutation()
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const toastStore = useToastStore();

  useEffect(() => {
    refetch(); // Realiza el fetch de las áreas cada vez que se monta o actualiza el componente
  }, [refetch]);
  useEffect(() => {
    if (fetchAreas) {
      dispatch(setAreas(fetchAreas));
    }
  }, [fetchAreas, dispatch]);

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

  const handleDelete = async (area:IArea) => {
    setSaveLoad(true)
    try {
      await deleteArea({id: area.id}).unwrap()
      dispatch(setDeleteArea(area.id))
      toastStore.setMessage("Eliminacion Correcta", toastStore.SUCCES_TOAST)
    } catch (error:any) {
      toastStore.setMessage("Error al eliminar", toastStore.ERROR_TOAST)
    }finally{
      setSaveLoad(false)
    }
  }
  const confirmDelete = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, area:IArea) =>{
    confirmPopup({
      target: event.currentTarget,
      message: 'Deseas eliminar este elemento?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        handleDelete(area)
      },
      reject:() => {return false}

    })
  }

  const actionHandler = (rowData:IArea) =>{
    return(
      <React.Fragment>
          <Button icon="pi pi-pencil" rounded text className="mr-2" onClick={() => showDialog(rowData)}/>
          <Button icon="pi pi-trash" rounded text severity="danger" onClick={(e) => confirmDelete(e, rowData)} loading={saveLoad}/>
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
      <ConfirmPopup/>
      <Loader isLoad={isLoading}/>
      <DataTable
        value={areas} 
        tableStyle={{ minWidth: "50rem" }} 
        paginator 
        rows={10} 
        rowsPerPageOptions={[10, 25, 50]} 
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