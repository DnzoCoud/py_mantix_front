import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { useAreaStore } from "@/stores/useAreaStore";
import { IArea } from "@/interfaces/IArea";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function AreaDatatable() {
  const [areas, setAreas] = useState<IArea[] | []>([])
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

  const areaStore = useAreaStore()
  useEffect(() => {
    const findAllAreas = async () => {
      await areaStore.getAreas()
      setAreas(areaStore.areas)
    }

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
  return (
    <div>
      <DataTable value={areas} tableStyle={{ minWidth: "50rem" }} 
        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id"
        header={header}
        filters={filters}
      >
        <Column field="name" header="Nombre" sortable ></Column>
        <Column field="director_detail.username" header="Director" sortable></Column>
      </DataTable>
    </div>
  );
}