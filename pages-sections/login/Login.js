import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import { loginUser, signUpUser } from "../../lib/provider/user";

import { LoadingButton } from "../../components/loadingButton";

const FORM_MODES = {
  SIGNUP_ONLY: 1,
  SIGNIN_ONLY: 2,
  ALL: 3,
};

const FIELDS = [
  {
    label: "Nombre",
    id: "firstName",
    autoComplete: "given-name",
    required: true,
    mode: FORM_MODES.SIGNUP_ONLY,
  },
  {
    label: "Apellidos",
    id: "lastName",
    autoComplete: "family-name",
    required: true,
    mode: FORM_MODES.SIGNUP_ONLY,
  },
  {
    label: "Usuario",
    id: "username",
    autoComplete: "username",
    required: true,
    mode: FORM_MODES.ALL,
  },
  {
    label: "Contraseña",
    id: "password",
    autoComplete: "current-password",
    type: "password",
    required: true,
    mode: FORM_MODES.ALL,
  },
];

const applyField = (field, isSignup) => {
  return (
    field.mode === FORM_MODES.ALL ||
    (field.mode === FORM_MODES.SIGNUP_ONLY && isSignup) ||
    (field.mode === FORM_MODES.SIGNIN_ONLY && !isSignup)
  );
};

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [logginIn, setLogginIn] = useState(false);

  const [isSignup, setIsSignUp] = useState(false);

  const enableSignUp = parseInt(process.env.NEXT_PUBLIC_ENABLE_SIGNUP);

  const onSubmit = async ({ username, password, firstName, lastName }) => {
    setError("");
    setLogginIn(true);
    try {
      if (isSignup) {
        await signUpUser({ username, password, firstName, lastName });
      } else {
        await loginUser(username, password);
      }
      const redirectTo = router.query.redirect || "admin";
      router.replace(`/${redirectTo}`);
    } catch (e) {
      setLogginIn(false);
      setError(e.message);
      console.error(e);
    }
  };

  const toggleIsSignUp = () => {
    setIsSignUp(!isSignup);
  };

  return (
    <article>
      <h2>Solo para los reyes de la boda:</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {FIELDS.filter((field) => applyField(field, isSignup)).map((field) => (
          <div className="form-element" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type || "text"}
              {...register(field.id, { required: field.required })}
              autoComplete={field.autoComplete}
            ></input>
          </div>
        ))}
        <div className="form-element">
          <LoadingButton
            className="button"
            loading={logginIn}
            staleText={isSignup ? "Registrarse" : "Iniciar Sesión"}
            loadingText={
              isSignup ? "Registrando usuario" : "Comprobando credenciales..."
            }
            type="submit"
          ></LoadingButton>
        </div>
      </form>
      {error && <div className="error-text">{error}</div>}
      {(enableSignUp && (
        <button className="button__text" onClick={toggleIsSignUp}>
          {isSignup ? "Ya tengo cuenta" : "Registrarme"}
        </button>
      )) ||
        ""}
    </article>
  );
}
