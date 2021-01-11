import React, { useState, useEffect } from "react";
import functions from "../custom/services";
import Button from "react-bootstrap/Button";

const Registro = (props) => {
  const { postUsuario, getUsuarios, procUsuario } = functions();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then((res) => {
      let usuarios = res.data;
      usuarios.map((u) => {
        u.selected = false;
      });
      setUsuarios(usuarios);
    });
  }, []);

  const procesarUsuarios = () => {
    let ids = [];
    usuarios.map((u) => {
      if (u.selected === true) {
        ids.push(u.id);
      }
    });
    const aProcesar = { ids: ids };
    procUsuario(aProcesar).then((res) => {
      getUsuarios().then((res) => {
        let usuarios = res.data;
        setUsuarios(usuarios);
      });
    });
  };

  const guardarUsuario = () => {
    const usuario = { nombre: nombre, apellido: apellido, procesado: false };
    postUsuario(usuario).then((res) => {
      getUsuarios().then((res) => {
        let usuarios = res.data;
        setUsuarios(usuarios);
      });
    });
  };

  const selUsuario = (id) => {
    const nuevosUsuarios = [];
    usuarios.map((u) => {
      if (u.id === id) {
        u.selected = !u.selected;
      }
      nuevosUsuarios.push(u);
    });
    setUsuarios(nuevosUsuarios);
    console.log("TAMANO SELECTS");

    nuevosUsuarios.map((u) => {
      if (u.selected) {
        console.log(u.id);
      }
    });
  };

  return (
    <div>
      <div className="container bg-dark">
        <h2 className="text-center text-white">
          Prueba Técnica Backend - Miguel Puentes
        </h2>
      </div>
      <div className="container">
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <div className="container p-2">
                <h5 className="text-center p-3">Registro de usuarios</h5>

                <form>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      aria-describedby="emailHelp"
                      placeholder="Ingrese su nombre"
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Este campo es requerido.
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputPassword1">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      aria-describedby="emailHelp"
                      placeholder="Ingrese su apellido"
                      onChange={(e) => setApellido(e.target.value)}
                      required
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Este campo es requerido.
                    </small>
                  </div>

                  <button
                    id="registrar"
                    className="btn btn-dark"
                    onClick={(e) => guardarUsuario()}
                  >
                    Registrar
                  </button>
                </form>
              </div>
            </div>
            <div className="col">
              <div className="container p-3">
                <div className="p-3 row">
                  <div className="col">
                    <h5> Listado de Usuarios</h5>
                  </div>
                  <div className="col text-right">
                    <button
                      id="procesar"
                      className="btn btn-dark"
                      onClick={(e) => procesarUsuarios()}
                    >
                      Procesar
                    </button>
                  </div>
                </div>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Sel</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Procesado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((m, i) => (
                      <tr>
                        <th>{m.id}</th>
                        <th>
                          <Button
                            variant={`${m.selected ? "dark" : "outline-dark"}`}
                            onClick={() => selUsuario(m.id)}
                          ></Button>
                        </th>
                        <th className="font-weight-normal">{m.nombre}</th>
                        <th className="font-weight-normal">{m.apellido}</th>
                        <th className="font-weight-normal">
                          {String(m.procesado)}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Registro;
