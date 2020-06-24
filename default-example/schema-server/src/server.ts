import { SchemaServer, SchemaServerOptions } from '@texo/server-graphql-schema';
import { createLogger, NamespacedLogger, NamespaceFilters, transports, format } from '@texo/logging';

import RootModule from './schema/root'
import { Server } from 'http';
import { ServerMetadata } from '../../../../texo/node_modules/@texo/server-common/lib';

export async function server() {
  const rootLogger = logger();

  const options: SchemaServerOptions = { name: 'blank' };
  const metadata: ServerMetadata = { applicationName: "Schema Example", applicationVersion: "0.0.0"}

  const modules = [ RootModule ]
  
  const server = new SchemaServer({ options, metadata, modules, rootLogger});
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