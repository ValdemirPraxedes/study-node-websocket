import "dotenv/config";
import io from "./servidor.js";
import { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento } from "./documentosDb.js";



io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    })


    socket.on("adicionar_documento", async (nomeDocumento) => {

        const documentoExiste = (await encontrarDocumento(nomeDocumento))  !== null;

        if(documentoExiste) {
            socket.emit("documento_existente", nomeDocumento);
        } else {
            const resultado = await adicionarDocumento(nomeDocumento);

            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nomeDocumento);
            }
        }
    });

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

});

