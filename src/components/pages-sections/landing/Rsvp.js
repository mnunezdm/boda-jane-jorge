"use client";

import React, { useState } from "react";
import Router from "next/router";
import { useForm } from "react-hook-form";

import { Confirmation } from "../../../lib/controllers/confirmation";
import { createConfirmation } from "../../../lib/provider/confirmation";
import { LoadingButton } from "../../loadingButton";

export default function RsvpSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (state) => {
    setLoading(true);
    setError("");

    try {
      const confirmation = Confirmation.fromState(state);

      await createConfirmation(confirmation);

      Router.push("/confirmed");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section">
      <article>
        <h2>Necesitamos tu confirmación:</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-element">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              autoComplete="firstName"
            ></input>
          </div>
          <div className="form-element">
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              autoComplete="lastName"
            ></input>
          </div>
          <div className="form-element">
            <label htmlFor="needBusToRestaurant">
              ¿Vas a necesitar autobus al banquete?
            </label>
            <input
              id="needBusToRestaurant"
              type="checkbox"
              {...register("needBusToRestaurant")}
            ></input>
          </div>
          <div className="form-element">
            <label htmlFor="needBusToCity">
              ¿Vas a necesitar autobus de vuelta?
            </label>
            <span id="instructions" className="help-text">
              El autobus saldrá al finalizar la fiesta
            </span>
            <input
              id="needBusToCity"
              type="checkbox"
              aria-describedby="instructions"
              {...register("needBusToCity")}
            ></input>
          </div>
          <div className="form-element">
            <label htmlFor="extraInformation">
              ¿Algo que debamos saber para el banquete?
            </label>
            <textarea
              id="extraInformation"
              type="text"
              {...register("extraInformation")}
            ></textarea>
          </div>
          <div className="form-element">
            <label htmlFor="mustHaveSong">¿Qué canción no puede faltar?</label>
            <input
              id="mustHaveSong"
              type="text"
              {...register("mustHaveSong")}
            ></input>
          </div>
          <div className="form-element">
            <LoadingButton
              className="button"
              loading={loading}
              staleText={"Enviar"}
              loadingText={"Enviando..."}
              type="submit"
            ></LoadingButton>
          </div>
        </form>
        {error && <div className="error-text">{error}</div>}
      </article>
    </section>
  );
}
