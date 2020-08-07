import { GatewayServer, GatewayServerOptions, configure, ConfigurationError, ServiceDefinitions, ServiceModuleDefinition } from '@texo/server-graphql-gateway';
import { Loggers, Logger, Defaults, Transports } from '@texo/logging';
import { ServerMetadata } from '@texo/server-common';

export async function server() {
  const logger = initializeLogging();
  
  try {
    const options: GatewayServerOptions = await configure();
    const metadata: ServerMetadata = { applicationName: "Gateway Server Example", applicationVersion: "0.0.0" };

    const modules: ServiceModuleDefinition[] = [
      //new ServiceDefinitions.Http('billing', 'http://localhost:8080/graphql')
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
  Loggers.setSystem(logger);

  return logger;
}
