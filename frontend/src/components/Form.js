import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Form = ({ getUsers, onEdit, setOnEdit }) => {
 const ref = useRef();

 useEffect(() => {
  if (onEdit) {
   const user = ref.current;
   user.email.value = onEdit.email;
   user.phone.value = onEdit.phone;
   user.birth_day.value = onEdit.birth_day;
  }
 }, [onEdit]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const user = ref.current;

  if (!user.email.value || !user.phone.value || !user.birth_day.value) {
   return toast.warn("Preencha todos os campos!");
  }

  try {
   if (onEdit) {
    const { data } = await axios.put(`http://localhost:8800/${onEdit.id}`, {
     email: user.email.value,
     phone: user.phone.value,
     birth_day: user.birth_day.value,
    });
    toast.success(data);
   } else {
    const { data } = await axios.post("http://localhost:8800", {
     email: user.email.value,
     phone: user.phone.value,
     birth_day: user.birth_day.value,
    });
    toast.success(data);
   }

   user.email.value = "";
   user.phone.value = "";
   user.birth_day.value = "";

   setOnEdit(null);
   getUsers();
  } catch (error) {
   toast.error("Erro ao salvar usuário");
  }
 };

 return (
  <form
   className="flex flex-col gap-6 max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg"
   ref={ref}
   onSubmit={handleSubmit}
  >
   <div className="flex flex-col">
    <label className="font-semibold text-gray-700">E-mail</label>
    <input
     name="email"
     type="email"
     className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
     required
    />
   </div>

   <div className="flex flex-col">
    <label className="font-semibold text-gray-700">Telefone</label>
    <input
     name="phone"
     className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
     required
    />
   </div>

   <div className="flex flex-col">
    <label className="font-semibold text-gray-700">Data de Nascimento</label>
    <input
     name="birth_day"
     type="date"
     className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
     required
    />
   </div>

   <button
    type="submit"
    className="mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
   >
    {onEdit ? "Atualizar" : "Salvar"}
   </button>
  </form>
 );
};

export default Form;
