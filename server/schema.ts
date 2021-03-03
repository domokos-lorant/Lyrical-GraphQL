import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from "./resolvers";

const typeDefs = loadSchemaSync(join(__dirname, './schema/*.graphql'), {
   loaders: [
       new GraphQLFileLoader()
   ]
});

const schema = addResolversToSchema({
   schema: typeDefs,
   resolvers,
});

export default schema;