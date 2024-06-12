'use client'
import { IUser } from "@/interfaces/IUser";
import { setUsers } from "@/redux/features/userSlice";
import { useAppSelector } from "@/redux/hooks";
import { useFetchUsersQuery } from "@/redux/services/userService";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function UserDataTable() {
  const [user, setUser] = useState<IUser>();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [editUser, setEditUser] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data: fetchUsers, isLoading, isError } = useFetchUsersQuery();
  const users = useAppSelector((state) => state.user.users);

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
        <Button icon="pi pi-trash" rounded text severity="danger" />
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
    if (fetchUsers) {
      dispatch(setUsers(fetchUsers))
    };
  }, [fetchUsers, dispatch ]);
  return (
    <div>
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
        {/* <MachineForm id={machine?.id} /> */}
      </Dialog>
    </div>
  );
}
