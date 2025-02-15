import "dotenv/config";
import io from "./servidor.js";
import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import registrarEventosDocumento from "./registrarEventos/registrarEventosDocumento.js";
import registrarEventosCadastro from "./registrarEventos/registrarEventosCadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";
import log from "./config/logger.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios");

nspUsuarios.use((socket, next) => {
  autorizarUsuario(socket, next);
});

nspUsuarios.on("connection", (socket) => {
    log.info(`usuario ${socket.id} logado com sucesso`);
    registrarEventosInicio(socket, nspUsuarios);
    registrarEventosDocumento(socket, nspUsuarios);
});

io.of("/").on("connection", (socket) => {

    registrarEventosCadastro(socket, io);
    registrarEventosLogin(socket, io);

});

