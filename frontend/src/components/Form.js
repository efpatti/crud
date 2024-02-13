import axios from "axios";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;
      user.name.value = onEdit.name;
      user.email.value = onEdit.email;
      user.phone.value = onEdit.phone;
      user.birth_day.value = onEdit.birth_day;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.name.value ||
      !user.email.value ||
      !user.phone.value ||
      !user.birth_day.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }
    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          birth_day: user.birth_day.value,
        });
        toast.success("Usuário atualizado com sucesso.");
      } else {
        await axios.post("http://localhost:8800", {
          name: user.name.value,
          email: user.email.value,
          phone: user.phone.value,
          birth_day: user.birth_day.value,
        });
        toast.success("Usuário criado com sucesso.");
      }
      getUsers();
      user.name.value = "";
      user.email.value = "";
      user.phone.value = "";
      user.birth_day.value = "";
      setOnEdit(null);
    } catch (error) {
      toast.error("Erro ao salvar usuário");
    }
  };
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="name"></Input>
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email"></Input>
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="phone"></Input>
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="birth_day" type="date"></Input>
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
