import { SchemaServer, SchemaServerOptions } from '@texo/server-graphql-schema';
import { ServerMetadata, Logger, Loggers, Transports, Defaults, setSystemLogger } from '@texo/server-common';

import RootModule from './schema/root'

export async function server() {
  const logger = initializeLogging();

  const options: SchemaServerOptions = { name: 'blank' };
  const metadata: ServerMetadata = { applicationName: "Schema Example", applicationVersion: "0.0.0"}

  const modules = [ RootModule ]
  
  const server = new SchemaServer({ options, metadata, modules });
  server.listen({ port: 8080 });
}

function initializeLogging() : Logger {
  const consoleTransport = new Transports.Console({ format: Defaults.DefaultConsoleFormat });

  const logger = Loggers.create({ options: { level: 'debug', transports: [ consoleTransport ] }, namespace: 'example' });
  setSystemLogger(logger);

  return logger;
}