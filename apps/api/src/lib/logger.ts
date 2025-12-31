import pino from 'pino'

// Create Pino logger with structured logging
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        }
      : undefined,
  base: {
    service: 'zavvy-api',
  },
})

// Child loggers for specific modules
export const createModuleLogger = (module: string) =>
  logger.child({ module })

// Pre-configured module loggers
export const adminLogger = createModuleLogger('admin')
export const apiLogger = createModuleLogger('api')
export const webhookLogger = createModuleLogger('webhook')
