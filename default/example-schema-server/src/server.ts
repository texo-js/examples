import { SchemaServer } from '@texo/graphql-schema';
import { createLogger, NamespacedLogger, NamespaceFilters, transports, format } from '@texo/logging';

import RootModule from './schema/root'

export async function server() {
  const server = new SchemaServer({
    schemaModules: [ RootModule ],
    applicationName: "Schema Example",
    applicationVersion: "0.0.0",
    logger: logger()
  });

  server.listen({ port: 8080 });
}

function logger() : NamespacedLogger {
  const consoleFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.metadata({fillExcept: [ 'level', 'ns', 'timestamp', 'message' ]}),
    format.printf(info => `${info.level} ${info.timestamp} ${info.ns} ${info.message} ${JSON.stringify(info.metadata)}`)
  );

  const filters = new NamespaceFilters('debug', '*');
  return createLogger('EXAMPLE', filters, {
    level: 'debug',
    format: consoleFormat,
    transports: [ new transports.Console() ]
  });
}