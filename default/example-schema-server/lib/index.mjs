import { gql, SchemaServer } from '@texo/graphql-schema';
import { createLogger, transports, format, NamespaceFilters } from '@texo/logging';

const typeDefs = gql`
  type Query {
    engine: String!
  }
`;
const resolvers = {
  Query: {
    engine: async () => 'texo-schema'
  }
};
const module = {
  typeDefs,
  resolvers
};

async function server() {
  const server = new SchemaServer({
    schemaModules: [module],
    applicationName: "Schema Example",
    applicationVersion: "0.0.0",
    logger: logger()
  });
  server.listen({
    port: 8080
  });
}

function logger() {
  const consoleFormat = format.combine(format.colorize(), format.timestamp(), format.metadata({
    fillExcept: ['level', 'ns', 'timestamp', 'message']
  }), format.printf(info => `${info.level} ${info.timestamp} ${info.ns} ${info.message} ${JSON.stringify(info.metadata)}`));
  const filters = new NamespaceFilters('debug', '*');
  return createLogger('EXAMPLE', filters, {
    level: 'debug',
    format: consoleFormat,
    transports: [new transports.Console()]
  });
}

(async () => {
  await server();
})();
//# sourceMappingURL=index.mjs.map
