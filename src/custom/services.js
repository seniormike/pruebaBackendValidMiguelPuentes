const axios = require("axios");
const functions = () => {
  const postUsuario = async (obj) => {
    return await axios.post("http://localhost:8080/usuarios/guardar", obj, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const getUsuarios = async () => {
    return await axios.get("http://localhost:8080/usuarios/listado");
  };

  const procUsuario = async (obj) => {
    return await axios.post("http://localhost:8080/usuarios/procesar", obj, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  return { postUsuario, getUsuarios, procUsuario };
};

export default functions;
