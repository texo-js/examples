import { GatewayServer, HttpGraphQLModuleDefinition, GatewayServerOptions, configurer, ConfigurationError } from '@texo/server-graphql-gateway';
import { Loggers, Logger, Formats, Filters, Transports, NamespaceSet, setSystemLogger, Defaults } from '@texo/server-common';
import { ServerMetadata } from '@texo/server-common';

export async function server() {
  const logger = initializeLogging();
  
  try {
    const options: GatewayServerOptions = await configurer();
    const metadata: ServerMetadata = { applicationName: "Schema Example", applicationVersion: "0.0.0" };

    const modules = [
      new HttpGraphQLModuleDefinition('billing', { url: 'http://localhost:8080/graphql' })
    ];

    const server = new GatewayServer({ options, metadata, modules });

    server.listen({ port: 8081 });
  }
  catch (e) {
    if (e instanceof ConfigurationError) {
      logger.error('Failed to start server due to configuration error');
    }
  }
}

function initializeLogging() : Logger {
  const consoleTransport = new Transports.Console({ format: Defaults.DefaultConsoleFormat });

  const logger = Loggers.create({ options: { level: 'debug', transports: [ consoleTransport ] }, namespace: 'example' });
  setSystemLogger(logger);

  return logger;
}
