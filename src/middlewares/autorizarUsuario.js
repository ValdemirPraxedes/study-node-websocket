import log from "../config/logger.js";
import { verificarToken } from "../utils/tokenJWT.js";

function autorizarUsuario(socket, next) {

    const tokenJwt = socket.handshake.auth.token;

    try {
        if (tokenJwt === undefined) next(new Error("Usuário não logado"));
        const payloadToken = verificarToken(tokenJwt);
        
        socket.emit("autorizacao_sucesso", payloadToken);
        log.info({payloadToken}, "Usuario autorizado");
        next();
    } catch (erro) {
        next(erro);
    }

}

export default autorizarUsuario;