import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Root() {
 const [users, setUsers] = useState([]);
 const [onEdit, setOnEdit] = useState(null);

 const getUsers = async () => {
  try {
   const res = await axios.get("http://localhost:8800/");
   setUsers(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
  } catch (error) {
   toast.error("Erro ao carregar usuários");
  }
 };

 useEffect(() => {
  getUsers();
 }, [setUsers]);

 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
   <div className="w-full max-w-3xl bg-white p-8 shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
     Usuários
    </h1>
    <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
    <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
   </div>
   <ToastContainer autoClose={3000} position="bottom-left" />
  </div>
 );
}

export default Root;
