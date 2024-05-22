import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export default function AreaDatatable() {
  return (
    <div>
      <DataTable tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Nombre"></Column>
        <Column field="area_detail.name" header="Director"></Column>
      </DataTable>
    </div>
  );
}
