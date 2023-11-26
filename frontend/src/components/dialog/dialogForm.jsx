import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    titulo: props.titulo,
    autor: props.autor,
    genero: props.genero,
    ISBN: props.ISBN,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditBook = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      titulo: editValues.titulo,
      autor: editValues.autor,
      genero: editValues.genero,
      ISBN: editValues.ISBN,
      
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.id == editValues.id
            ? {
              id: editValues.id,
              titulo: editValues.titulo,
              autor: editValues.autor,
              genero: editValues.genero,
              ISBN: editValues.ISBN,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteBook = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Nome do Livro"
            defaultValue={props.titulo}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="autor"
            label="Autor"
            defaultValue={props.autor}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="genero"
            label="Gênero"
            defaultValue={props.genero}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="ISBN"
            label="ISBN"
            defaultValue={props.ISBN}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteBook()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditBook()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}