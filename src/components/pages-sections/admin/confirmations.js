import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useConfirmations } from "../../../lib/hooks/useConfirmations";

import ScaleLoader from "react-spinners/ScaleLoader";
import { UnauthenticatedUser } from "../../../lib/provider/confirmation";

export default function ConfirmationsSection() {
  const { confirmations, isValidating, error } = useConfirmations();
  const [filterText, setFilterText] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!isValidating && error instanceof UnauthenticatedUser) {
      router.replace("/login");
    }
  }, [error, isValidating, router]);

  const onSearch = (event) => {
    setFilterText(event.target.value);
  };

  const downloadConfirmations = () => {
    confirmations.download();
  };

  if (isValidating && !confirmations) {
    return (
      <section className="loader-container">
        <ScaleLoader color="#CCC"></ScaleLoader>
        <h2 className="loader-text">Cargando vuestro espacio personal</h2>
      </section>
    );
  } else if (!isValidating && !confirmations && error) {
    return (
      <section>
        <div className="placeholder">
          <picture>
            <Image
              src="/images/admin/error.png"
              alt=""
              width="128"
              height="128"
            />
          </picture>
          <h2 className="placeholder-caption">¡Algo ha fallado!</h2>
          <div className="placeholder-subcaption">{error.message}</div>
          <div className="placeholder-detail">{error.stackTrace}</div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <section className="confirmation-summary">
          <h2 className="confirmations-title">
            ¡¡Ya vamos por {confirmations.length} confirmaciones!!
          </h2>
          <div>
            Han confirmado un total de {confirmations.totalConfirmationMembers}{" "}
            personas. De todas ellas, {confirmations.totalBusToRestaurant} van a
            necesitar autobus al banquette y {confirmations.totalBusToCity} van
            a necesitar autobus de vuelta a Madrid
          </div>
          <button
            className="button standalone"
            onClick={downloadConfirmations}
            type="button"
          >
            Descargar reporte
          </button>
        </section>
        <section className="confirmation-list">
          <h2 className="confirmations-title">
            ¡¡Esta es la gente que ha confirmado por ahora!!
          </h2>
          {confirmations.length && (
            <div className="search-box-container">
              <div className="search-box input">
                <label htmlFor="searchBox">
                  <Image
                    src="/images/admin/search.svg"
                    alt=""
                    width="30"
                    height="30"
                  ></Image>
                </label>
                <input
                  id="searchBox"
                  type="text"
                  placeholder="Busca por nombre..."
                  onChange={onSearch}
                ></input>
              </div>
            </div>
          )}
          <ul className="confirmations-list">
            {(confirmations || [])
              .filter(
                (confirmation) =>
                  !filterText || confirmation.matchesText(filterText)
              )
              .map((confirmation) => (
                <ConfirmationItem
                  key={confirmation.id}
                  confirmation={confirmation}
                ></ConfirmationItem>
              ))}
          </ul>
          <div className="placeholder confirmation-placeholder">
            <picture>
              <Image
                src="/images/admin/desert.png"
                alt=""
                width="256"
                height="256"
              />
            </picture>
            <div className="placeholder-caption">
              {confirmations?.length
                ? "No se ha encontrado ninguna confirmacion para tu busqueda"
                : "Pues aún no ha confirmado nadie, ¡pero aquí empezaran a salir!"}
            </div>
          </div>
        </section>
      </>
    );
  }
}

function ConfirmationItem({ confirmation }) {
  return (
    <li className="confirmations-item">
      <ul className="confirmation-member-list">
        {confirmation.confirmationMembers.map((member) => (
          <li key={member.id} className="confirmation-member-item">
            ¡¡{member.name} ha confirmado!!
          </li>
        ))}
      </ul>
      <div>
        {confirmation.relativeCreatedDate} (el{" "}
        {confirmation.formattedCreatedDate})
      </div>
      <div>
        {confirmation.needBusToRestaurant
          ? "Va a necesitar autobus al banquete"
          : "No necesita autobus al banquete"}
      </div>
      <div>
        {confirmation.needBusToCity
          ? "Va a necesitar autobus a Madrid"
          : "No necesita autobus a Madrid"}
      </div>
      {confirmation.mustHaveSong && (
        <div>opina que tiene que sonar {confirmation.mustHaveSong}</div>
      )}
      <div>{confirmation.extraInformation}</div>
    </li>
  );
}
