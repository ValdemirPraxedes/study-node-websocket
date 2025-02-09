import pino from 'pino';


const log = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty', // Deixa a saída mais legível no console
        options: { colorize: true }
    }
});


export default log;