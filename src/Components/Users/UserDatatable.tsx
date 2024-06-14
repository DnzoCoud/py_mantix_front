'use client'
import { IUser } from "@/interfaces/IUser";
import { setDeleteUser, setUsers } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDeleteUserMutation, useFetchUsersQuery } from "@/redux/services/userService";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserForm from "./UserForm";
import { useToastStore } from "@/stores/useToastStore";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export default function UserDataTable() {
  const [user, setUser] = useState<IUser>();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data: fetchUsers, isLoading, isError, refetch } = useFetchUsersQuery();
  const users = useAppSelector((state) => state.user.users);
  const [deleteUser] = useDeleteUserMutation()
  const [saveLoad, setSaveLoad] = useState<boolean>(false);
  const toastStore = useToastStore();

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
  const header = renderHeader();

  const handleDelete = async (user:IUser) => {
    setSaveLoad(true)
    try {
      await deleteUser({id: user.id}).unwrap()
      dispatch(setDeleteUser(user.id))
      toastStore.setMessage("Eliminacion Correcta", toastStore.SUCCES_TOAST)
    } catch (error:any) {
      toastStore.setMessage("Error al eliminar", toastStore.ERROR_TOAST)
    }finally{
      setSaveLoad(false)
    }
  }
  const confirmDelete = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, user:IUser) =>{
    confirmPopup({
      target: event.currentTarget,
      message: 'Deseas eliminar este elemento?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        handleDelete(user)
      },
      reject:() => {return false}

    })
  }
  const actionHandler = (rowData: IUser) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          text
          className="mr-2"
          onClick={() => showDialog(rowData)}
        />
        <Button icon="pi pi-trash" rounded text severity="danger" onClick={(e) => confirmDelete(e, rowData)} loading={saveLoad}/>
      </React.Fragment>
    );
  };

  const showDialog = (user: IUser) => {
    setUser({ ...user });
    setEditUser(true);
    
  };
  const hideDialog = () => {
    setEditUser(false);
    setUser(undefined);
  };

  useEffect(() => {
    refetch(); // Realiza el fetch de las áreas cada vez que se monta o actualiza el componente
  }, [refetch]);
  useEffect(() => {
    if (fetchUsers) {
      dispatch(setUsers(fetchUsers))
    };
  }, [fetchUsers, dispatch ]);
  return (
    <div>
      <ConfirmPopup/>
      <DataTable
        tableStyle={{ minWidth: "50rem" }}
        value={users}
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
        <Column field="first_name" header="Nombre"sortable></Column>
        <Column field="last_name" header="Apellido"sortable></Column>
        <Column field="username" header="Usuario"sortable></Column>
        <Column field="email" header="Correo"sortable></Column>
        <Column field="role_detail.name" header="Rol"sortable></Column>
        {/* <Column field="email" header="Correo"></Column> */}
        <Column
          body={actionHandler}
          exportable={false}
          style={{ minWidth: "12rem" }}
        ></Column>
      </DataTable>

      <Dialog
        visible={editUser}
        style={{ width: "52rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Editar Usuario"
        modal
        className="p-1"
        onHide={hideDialog}
      >
        <UserForm id={user?.id}/>
      </Dialog>
    </div>
  );
}
