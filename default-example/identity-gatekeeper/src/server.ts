import { ServerMetadata, Logger, Loggers, Defaults, Transports, setSystemLogger } from '@texo/server-common';
import { Server, getOptions } from '@texo/server-identity-gatekeeper';

export async function server() {
  const logger = initializeLogging();

  const options = await getOptions();
  const metadata: ServerMetadata = { applicationName: 'Example Identity Gatekeeper', applicationVersion: process.env.npm_package_version || '<unknown>' };
  
  const server = new Server({ options, metadata })
  server.listen({ port: 8082 });
}

function initializeLogging() : Logger {
  const consoleTransport = new Transports.Console({ format: Defaults.DefaultConsoleFormat });

  const logger = Loggers.create({ options: { level: 'debug', transports: [ consoleTransport ] }, namespace: 'example' });
  setSystemLogger(logger);

  return logger;
}