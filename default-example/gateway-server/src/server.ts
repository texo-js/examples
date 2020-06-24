import { GatewayServer, HttpGraphQLModuleDefinition, GatewayServerOptions } from '@texo/server-graphql-gateway';
import { createLogger, NamespacedLogger, NamespaceFilters, transports, format } from '@texo/logging';
import { ServerMetadata } from '@texo/server-common';

export async function server() {
  const rootLogger = createServerLogger();

  const options: GatewayServerOptions = { name: 'blank' };
  const metadata: ServerMetadata = { applicationName: "Schema Example", applicationVersion: "0.0.0" };

  const modules = [
    new HttpGraphQLModuleDefinition('billing', { url: 'http://localhost:8080/graphql' })
  ];

  const server = new GatewayServer({ options, metadata, modules, rootLogger });

  server.listen({ port: 8081 });
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