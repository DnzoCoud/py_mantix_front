// import { Middleware } from "@reduxjs/toolkit";

// export const websocketMiddleware: Middleware = (storeAPI) => {
//   let socket: WebSocket;

//   return (next) => (action) => {
//     if (action.type === "ws/connect") {
//       // Conectar al WebSocket
//       socket = new WebSocket("ws://localhost:8000/ws/events/");

//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         if (data.type === "event_created") {
//           // Despachar una acción para añadir el nuevo evento al estado
//           storeAPI.dispatch(eventAdded(data.event_data));
//         }
//       };

//       socket.onclose = () => {
//         console.log("WebSocket closed");
//       };
//     }

//     return next(action);
//   };
// };
