import { useState, useEffect } from "react";

export default function Notification() {
const [number, setNumber] = useState("");

useEffect(() => {
   const ws = new WebSocket("ws://localhost:8000/ws");

   ws.onopen = () => {
   console.log("Connection Established!");};
   ws.onmessage = (event) => {
   console.log(event.data);

   setNumber(event.data);};
   ws.onclose = () => {
   console.log("Connection Closed!");};

   ws.onerror = () => {
   console.log("WS Error");};
   return () => {
   ws.close();
 };
}, []);

return (<div>
   <p>number :{number}</p>
   </div>
);
}