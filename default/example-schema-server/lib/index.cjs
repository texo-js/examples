'use strict';

var graphqlSchema = require('@texo/graphql-schema');
var logging = require('@texo/logging');

const typeDefs = graphqlSchema.gql`
  type Query {
    engine: String!
  }
`;
const resolvers = {
  Query: {
    engine: async () => 'texo-schema'
  }
};
const module$1 = {
  typeDefs,
  resolvers
};

async function server() {
  const server = new graphqlSchema.SchemaServer({
    schemaModules: [module$1],
    applicationName: "Schema Example",
    applicationVersion: "0.0.0",
    logger: logger()
  });
  server.listen({
    port: 8080
  });
}

function logger() {
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
