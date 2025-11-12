// lib/logger.ts
interface LogMeta {
  [key: string]: unknown;
}

export const logger = {
  info: (message: string, meta?: LogMeta): void => {
    console.log(JSON.stringify({ 
      level: "info", 
      message, 
      meta, 
      timestamp: new Date().toISOString() 
    }));
  },
  
  error: (message: string, meta?: LogMeta): void => {
    console.error(JSON.stringify({ 
      level: "error", 
      message, 
      meta, 
      timestamp: new Date().toISOString() 
    }));
  }
};