import React, { useState, useCallback } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setErrors(null);

        const signUpSchema = Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Email is not a valid email")
            .required("Email is required"),
          password: Yup.string().min(
            6,
            "Password must be at least 6 carachaters"
          ),
        });

        await signUpSchema.validate(formData, { abortEarly: false });
      } catch (err) {
        const error = getValidationErrors(err);

        setErrors(error);
      }
    },
    [formData]
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Go Barber" />

        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Input
            type="text"
            name="name"
            icon={FiUser}
            placeholder="Name"
            onChange={handleChange}
            error={errors && errors.name}
          />
          <Input
            type="text"
            name="email"
            icon={FiMail}
            placeholder="E-mail"
            onChange={handleChange}
            error={errors && errors.email}
          />
          <Input
            type="password"
            name="password"
            icon={FiLock}
            placeholder="Password"
            onChange={handleChange}
            error={errors && errors.password}
          />

          <Button type="submit">Register</Button>
        </form>

        <a href="">
          <FiUser />
          Already have a account?
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
