import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({ users, setUsers, setOnEdit }) => {
 const handleEdit = (item) => {
  setOnEdit(item);
 };

 const handleDelete = async (id) => {
  try {
   const { data } = await axios.delete(`http://localhost:8800/${id}`);
   setUsers(users.filter((user) => user.id !== id));
   toast.success(data);
  } catch (error) {
   toast.error("Erro ao excluir usuário");
  }

  setOnEdit(null);
 };

 return (
  <table className="w-full mt-6 text-sm text-gray-700 border-separate border-spacing-1">
   <thead>
    <tr className="bg-gray-200 text-left text-sm font-semibold border-b">
     <th className="py-4 px-6">E-mail</th>
     <th className="py-4 px-6 hidden sm:table-cell">Telefone</th>
     <th className="py-4 px-6">Data de Nascimento</th>
     <th className="py-4 px-6 text-center">Ações</th>
    </tr>
   </thead>
   <tbody>
    {users.map((item, i) => (
     <tr
      key={i}
      className="hover:bg-gray-50 transition duration-300 ease-in-out border-b"
     >
      <td className="py-4 px-6">{item.email}</td>
      <td className="py-4 px-6 hidden sm:table-cell">{item.phone}</td>
      <td className="py-4 px-6 text-center">
       {new Date(item.birth_day).toLocaleDateString("pt-BR")}
      </td>
      <td className="flex py-4 px-6 justify-center space-x-4">
       <FaEdit
        className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-200 transform hover:scale-110"
        onClick={() => handleEdit(item)}
       />
       <FaTrash
        className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200 transform hover:scale-110"
        onClick={() => handleDelete(item.id)}
       />
      </td>
     </tr>
    ))}
   </tbody>
  </table>
 );
};

export default Grid;
