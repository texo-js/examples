import { Logger, Loggers, Defaults, Transports } from '@texo/logging';
import { ServerMetadata } from '@texo/server-common';
import { IdentityGatekeeperOptions, IdentityGatekeeperServer, configurer, ConfigurationError } from '@texo/server-identity-gatekeeper';

export async function server() {
  const logger = initializeLogging();
  console.log(process.cwd());
  try {
    const options: IdentityGatekeeperOptions = await configurer();
    const metadata: ServerMetadata = { applicationName: "Identity Gatekeeper Example", applicationVersion: "0.0.0" };

    const server = new IdentityGatekeeperServer({ options, metadata });

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
