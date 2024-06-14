"use client";
import { IEvent } from "@/interfaces/IEvent";
import { IWorkOrder } from "@/interfaces/IWorkOrder";
import { useFindWorkOrderByEventIdQuery, useLazyGenerateWorkOrderPDFQuery } from "@/redux/services/workOrderService";
import { skipToken } from "@reduxjs/toolkit/query";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

export default function EventFormComplete({ event }: { event: IEvent }) {
  const [existWorkOrder, setExistWorkOrder] = useState<IWorkOrder>();
  const { data: fetchWorkOrder } = useFindWorkOrderByEventIdQuery(
    event.id ? { eventId: event.id } : skipToken
  );
  const [triggerGeneratePDF, { data: PdfBase64, isLoading}] = useLazyGenerateWorkOrderPDFQuery();
  const handlePDF = async () => {
    if (existWorkOrder) {
      triggerGeneratePDF({ id: existWorkOrder.id });
    }
  };
  useEffect(() => {
    if(fetchWorkOrder)
      setExistWorkOrder(fetchWorkOrder)
  }, [fetchWorkOrder])

   useEffect(() => {
    if (PdfBase64) {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${PdfBase64}`;
      link.download = 'WorkOrder.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [PdfBase64]);
  return (
    <>
      <div className="flex flex-col justify-start">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-400 rounded-full mr-2"></div>
          <span>Mantenimiento Completado</span>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-12">
            {existWorkOrder && (
              <Button
                label="Descargar Orden de trabajo"
                size="small"
                severity="danger"
                icon="pi pi-file-pdf"
                onClick={handlePDF}
                loading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
