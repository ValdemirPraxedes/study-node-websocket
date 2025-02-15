import log from "../config/logger.js";
import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumentos, removerConexao } from "../utils/conexoesDocumentos.js";


function registrarEventosDocumento(socket, io) {

    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {


        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const conexaoEncontrada = encontrarConexao(nomeDocumento, nomeUsuario);

            if(!conexaoEncontrada) {
                socket.join(nomeDocumento);
                log.info(`usuario ${nomeUsuario} entrou no documento ${nomeDocumento}`);
    
                adicionarConexao({nomeDocumento, nomeUsuario});

                socket.data = {
                    usuarioEntrou: true
                }
    
                const usuariosNoDocumento = obterUsuariosDocumentos(nomeDocumento);
                
                log.info({usuariosNoDocumento}, `usuarios conectados no documento ${nomeDocumento}`);
    
                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
    
                devolverTexto(documento.texto);
            } else {
                socket.emit("usuario_ja_no_documento");
            }
        }

        socket.on("disconnect", () => {

            if(socket.data.usuarioEntrou) {
                removerConexao(nomeDocumento, nomeUsuario);
                log.info(`usuario ${nomeUsuario} se desconectou do documento ${nomeDocumento}`);
    
                const usuariosNoDocumento = obterUsuariosDocumentos(nomeDocumento);
                
                log.info({usuariosNoDocumento}, `usuarios conectados no documento ${nomeDocumento}`);
    
                io.to(nomeDocumento).emit("usuarios_no_documento", usuariosNoDocumento);
            }

        });

    });


    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }

    });

    socket.on("excluir_documento", async (documento) => {
        const resultado = await excluirDocumento(documento);

        if (resultado.deletedCount) {
            io.emit("excluir_documento_sucesso", documento);
        }
    });



};

export default registrarEventosDocumento;