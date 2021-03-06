// Resources used for TS codegen setup:
// https://graphql-code-generator.com/docs/getting-started/development-workflow
// https://the-guild.dev/blog/graphql-codegen-best-practices
// https://the-guild.dev/blog/better-type-safety-for-resolvers-with-graphql-codegen
// https://hasura.io/learn/graphql/typescript-react-apollo/codegen/

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
               mappers: {
                  Song: "../../server/models/song#SongDocument",
                  Lyric: "../../server/models/lyric#LyricDocument",
               },
               //defaultMapper: "Partial<{T}>",
               resolverTypeWrapperSignature: "Promise<T | undefined> | T | undefined"
           },
       }
   },
};