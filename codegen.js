// Resources used for TS codegen setup:
// https://graphql-code-generator.com/docs/getting-started/development-workflow
// https://the-guild.dev/blog/graphql-codegen-best-practices
// https://the-guild.dev/blog/better-type-safety-for-resolvers-with-graphql-codegen
// https://hasura.io/learn/graphql/typescript-react-apollo/codegen/

module.exports = {
   schema: './schema/*.graphql',
   documents: './client/**/*.graphql',
   overwrite: true,
   generates: {
       './schema/__generated__/schema.all.ts': {
           plugins: [
               { 'typescript': { avoidOptionals: true } },
               { 'typescript-resolvers': { } },
           ],
           config: {
               noSchemaStitching: true,
               useIndexSignature: true,
               mappers: {
                  Song: "../../server/models/song#SongDocument",
                  Lyric: "../../server/models/lyric#LyricDocument",
                  User: "../../server/models/user#UserDocument",
               },
               //defaultMapper: "Partial<{T}>",
               resolverTypeWrapperSignature: "Promise<T | undefined> | T | undefined",
               maybeValue: "T | null | undefined",
               fieldContextTypes: [
                  "Mutation.signup#../LyricalPassportContext#LyricalPassportContext",
                  "Mutation.logout#../LyricalPassportContext#LyricalPassportContext",
                  "Mutation.login#../LyricalPassportContext#LyricalPassportContext",
                  "Query.user#../LyricalPassportContext#LyricalPassportContext",
               ]
           },
       },
       './': {
         preset: 'near-operation-file',
         presetConfig: {
            baseTypesPath: './schema/__generated__/schema.all.tsx',
            folder: '__generated__',
         },
         plugins: [
            'typescript-operations',
            'typescript-react-apollo',
        ],
        config: {
            skipTypename: false,
            withHooks: true,
            withHOC: false,
            withComponent: false,
            preResolveTypes: true,
        }
       }
   },
};