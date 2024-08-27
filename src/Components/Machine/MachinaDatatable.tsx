import { IMaquina } from "@/interfaces/IMaquina";
import { setDeleteMachine, setMachines } from "@/redux/features/machineSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  useDeleteMachineMutation,
  useFetchMachinesQuery,
} from "@/redux/services/machineService";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MachineForm from "./MachineForm";
import { useToastStore } from "@/stores/useToastStore";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import MachineHistory from "./MachineHistory";

export default function MachinaDatatable() {
  const [machine, setMachine] = useState<IMaquina>();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [editMachine, setEditMachine] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    data: fetchMachines,
    isLoading,
    isError,
    refetch,
  } = useFetchMachinesQuery();
  const machines = useAppSelector((state) => state.machine.machines);
  const [deleteMachine] = useDeleteMachineMutation();
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const toastStore = useToastStore();

  useEffect(() => {
    refetch(); // Realiza el fetch de las áreas cada vez que se monta o actualiza el componente
  }, [refetch]);
  useEffect(() => {
    if (fetchMachines) {
      dispatch(setMachines(fetchMachines));
    }
  }, [fetchMachines, dispatch]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-end">
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Filtrar informacion"
        />
      </div>
    );
  };

  const handleDelete = async (maquina: IMaquina) => {
    setSaveLoad(true);
    try {
      await deleteMachine({ id: maquina.id }).unwrap();
      dispatch(setDeleteMachine(maquina.id));
      toastStore.setMessage("Eliminacion Correcta", toastStore.SUCCES_TOAST);
    } catch (error: any) {
      toastStore.setMessage("Error al eliminar", toastStore.ERROR_TOAST);
    } finally {
      setSaveLoad(false);
    }
  };
  const confirmDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    maquina: IMaquina
  ) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Deseas eliminar este elemento?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => {
        handleDelete(maquina);
      },
      reject: () => {
        return false;
      },
    });
  };

  const actionHandler = (rowData: IMaquina) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-clock"
          rounded
          text
          className="mr-2"
          onClick={() => {
            setShowHistory(true);
            setMachine({ ...rowData });
          }}
          severity="help"
        />
        <Button
          icon="pi pi-pencil"
          rounded
          text
          className="mr-2"
          onClick={() => showDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={(e) => confirmDelete(e, rowData)}
          loading={saveLoad}
        />
      </React.Fragment>
    );
  };
  const header = renderHeader();

  const showDialog = (maquina: IMaquina) => {
    setMachine({ ...maquina });
    setEditMachine(true);
  };
  const hideDialog = () => {
    setEditMachine(false);
    setMachine(undefined);
  };
  return (
    <>
      {/* <Loader isLoad={isLoading}/> */}
      <ConfirmPopup />

      <DataTable
        tableStyle={{ minWidth: "50rem" }}
        value={machines}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        header={header}
        filters={filters}
        resizableColumns
        stripedRows
        showGridlines
        pt={{
          root: {
            className: "rounded-md",
          },
        }}
      >
        <Column field="name" header="Maquina" sortable></Column>
        <Column field="model" header="Modelo" sortable></Column>
        <Column field="serial" header="Serial" sortable></Column>
        <Column
          field="location_detail.name"
          header="Locacion"
          sortable
        ></Column>
        <Column
          field="last_maintenance"
          header="Ultimo Mantenimiento"
          sortable
        ></Column>
        <Column
          body={actionHandler}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={editMachine}
        style={{ width: "52rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Editar Maquina"
        modal
        className="p-1"
        onHide={hideDialog}
      >
        <MachineForm id={machine?.id} />
      </Dialog>

      <Dialog
        visible={showHistory}
        style={{ width: "95%" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Historial Maquina"
        modal
        className="p-1"
        onHide={() => setShowHistory(false)}
      >
        <MachineHistory id={machine?.id ?? 0} />
      </Dialog>
    </>
  );
}
