import log from "../config/logger.js";
import { encontrarUsuario } from "../db/usuariosDb.js";
import { criaHash, verificarHashIguais } from "../utils/criaHashESalSenha.js";
import { gerarToken } from "../utils/tokenJWT.js";


function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async (dados) => {
        log.info("inicio do evento autentica_usuario");
        log.info({ dados }, "parametros");
        const usuario = await encontrarUsuario(dados.nome);

        if (usuario !== null && usuario !== undefined  && Object.keys(usuario).length > 0) {
            log.info({ usuario }, "usuario encontrado");

            const hash =  criaHash(dados.senha, usuario.salSenha);

            log.info({ hash }, "hash gerada");

            const autenticacao = verificarHashIguais(hash, usuario.hashSenha);

            log.info({ autenticacao }, "resultado da autenticação");

            if(autenticacao) {
                const token = gerarToken(usuario.nome);
                log.info({ token }, "Token gerado");
                socket.emit("autenticacao_sucesso", token);
            } else {
                socket.emit("autenticacao_erro");   
            }
        } else {
            log.info({ usuario }, "usuario não encontrado");

            socket.emit("autenticacao_erro");   
        }


        log.info("fim do evento autentica_usuario");
    });
}

export default registrarEventosLogin;
