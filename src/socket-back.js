import "dotenv/config";
import io from "./servidor.js";
import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import registrarEventosDocumento from "./registrarEventos/registrarEventosDocumento.js";
import registrarEventosCadastro from "./registrarEventos/registrarEventosCadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";


io.on("connection", (socket) => {

    registrarEventosInicio(socket, io);
    registrarEventosDocumento(socket, io);
    registrarEventosCadastro(socket, io);
    registrarEventosLogin(socket, io);

});

