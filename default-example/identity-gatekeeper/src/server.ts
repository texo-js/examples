import { createLogger, NamespacedLogger, NamespaceFilters, format, transports } from '@texo/logging';
import { ServerMetadata } from '@texo/server-common';
import { Server, getOptions } from '@texo/server-identity-gatekeeper';


export async function server() {
  const options = await getOptions();
  const metadata: ServerMetadata = { applicationName: '', applicationVersion: '' };
  const rootLogger = createServerLogger();

  const server = new Server({ options, metadata, rootLogger })
  server.listen({ port: 8082 });
}

function createServerLogger() : NamespacedLogger {
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