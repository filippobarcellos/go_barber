import React, { useState, useCallback, useContext } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";

import { AuthContext } from "../../context/AuthContext";

import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  const { user, signIn } = useContext(AuthContext);

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

        const signInSchema = Yup.object().shape({
          email: Yup.string()
            .email("Email is not a valid email")
            .required("Email is required"),
          password: Yup.string().min(
            4,
            "Password must be at least 4 carachaters"
          ),
        });

        await signInSchema.validate(formData, { abortEarly: false });

        signIn(formData);
      } catch (err) {
        const error = getValidationErrors(err);

        setErrors(error);
      }
    },
    [formData, signIn]
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Go Barber" />

        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input
            type="email"
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

          <Button type="submit">Login</Button>

          <a href="/">Forgot my password</a>
        </form>

        <a href="">
          <FiLogIn />
          Create your account
        </a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
