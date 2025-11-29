export const logger = {
  info(message: string, meta?: any) {
    console.log(JSON.stringify({ level: "INFO", message, timestamp: new Date().toISOString(), ...meta }));
  },

  error(message: string, meta?: any) {
    console.error(JSON.stringify({ level: "ERROR", message, timestamp: new Date().toISOString(), ...meta }));
  },

  warn(message: string, meta?: any) {
    console.warn(JSON.stringify({ level: "WARN", message, timestamp: new Date().toISOString(), ...meta }));
  },
};