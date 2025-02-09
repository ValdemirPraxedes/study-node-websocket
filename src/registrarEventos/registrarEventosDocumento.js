import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";


function registrarEventosDocumento(socket, io) {

    socket.on("selecionar_documento", async (nome, devolverTexto) => {
        socket.join(nome);

        const documento = await encontrarDocumento(nome);

        if (documento) {
            devolverTexto(documento.texto);
        }

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