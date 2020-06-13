import { GatewayServer, GatewayServerConfig, GraphQLModuleDefinitionType, HttpGraphQLModuleDefinition } from '@texo/graphql-gateway';
import { createLogger, NamespacedLogger, NamespaceFilters, transports, format } from '@texo/logging';



export async function server() {
  const server = new GatewayServer({
    applicationName: "Schema Example",
    applicationVersion: "0.0.0",
    logger: createServerLogger(),
    modules: [
      new HttpGraphQLModuleDefinition('billing', { url: 'http://localhost:8080/graphql' })
    ]
  });

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