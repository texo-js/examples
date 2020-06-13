'use strict';

var graphqlGateway = require('@texo/graphql-gateway');
var logging = require('@texo/logging');

async function server() {
  const server = new graphqlGateway.GatewayServer({
    applicationName: "Schema Example",
    applicationVersion: "0.0.0",
    logger: createServerLogger(),
    modules: [new graphqlGateway.HttpGraphQLModuleDefinition('billing', {
      url: 'http://localhost:8080/graphql'
    })]
  });
  server.listen({
    port: 8081
  });
}

function createServerLogger() {
  const consoleFormat = logging.format.combine(logging.format.colorize(), logging.format.timestamp(), logging.format.metadata({
    fillExcept: ['level', 'ns', 'timestamp', 'message']
  }), logging.format.printf(info => `${info.level} ${info.timestamp} ${info.ns} ${info.message} ${JSON.stringify(info.metadata)}`));
  const filters = new logging.NamespaceFilters('debug', '*');
  return logging.createLogger('EXAMPLE', filters, {
    level: 'debug',
    format: consoleFormat,
    transports: [new logging.transports.Console()]
  });
}

(async () => {
  await server();
})();
//# sourceMappingURL=index.cjs.map
