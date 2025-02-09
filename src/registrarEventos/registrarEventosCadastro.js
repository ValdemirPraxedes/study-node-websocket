import log from "../config/logger.js";
import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
    socket.on("cadastrar_usuario", async (dados) => {
        log.info({ dados }, "parametros recebidos");

        const usuario = await encontrarUsuario(dados.nome);

        if (usuario === null) {
            const resultado = await cadastrarUsuario(dados);

            log.info({ resultado }, "resultado do cadastramento");

            if (resultado.acknowledged) {
                socket.emit("cadastro_sucesso");
            } else {
                socket.emit("cadastro_erro");
            }
        } else {
            socket.emit("usuario_ja_existente");
        }


    });
}

export default registrarEventosCadastro;