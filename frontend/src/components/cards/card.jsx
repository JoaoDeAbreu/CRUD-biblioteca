import React, { useState } from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FormDialog
        open={open}
        setOpen={setOpen}
        titulo={props.titulo}
        genero={props.genero}
        autor={props.autor}
        listCard={props.listCard}
        setListCard={props.setListCard}
        ISBN={props.ISBN}
        id={props.id}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-titulo">{props.titulo}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-genero">{props.genero}</p>
        <p className="card-ISBN">{props.ISBN}</p>
        <h3 className="card-autor">{props.autor}</h3>
      </div>
    </div>
  );
}