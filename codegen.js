module.exports = {
   schema: './schema/*.graphql',
   documents: './client/src/graphql/*.graphql',
   overwrite: true,
   generates: {
       './schema/__generated__/schema.all.tsx': {
           plugins: [
               'typescript',
               'typescript-operations',
               'typescript-react-apollo',
               'typescript-resolvers',
           ],
           config: {
               skipTypename: false,
               withHooks: true,
               withHOC: false,
               withComponent: false,
               noSchemaStitching: true,
               useIndexSignature: true,
           },
       }
   },
};