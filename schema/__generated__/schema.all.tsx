import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Lyric = {
  __typename?: 'Lyric';
  id?: Maybe<Scalars['ID']>;
  likes?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  song?: Maybe<Song>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addSong?: Maybe<Song>;
  addLyricToSong?: Maybe<Song>;
  likeLyric?: Maybe<Lyric>;
  deleteSong?: Maybe<Song>;
};


export type MutationAddSongArgs = {
  title?: Maybe<Scalars['String']>;
};


export type MutationAddLyricToSongArgs = {
  songId: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
};


export type MutationLikeLyricArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSongArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  songs?: Maybe<Array<Maybe<Song>>>;
  song?: Maybe<Song>;
  lyric?: Maybe<Lyric>;
};


export type QuerySongArgs = {
  id: Scalars['ID'];
};


export type QueryLyricArgs = {
  id: Scalars['ID'];
};

export type Song = {
  __typename?: 'Song';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  lyrics?: Maybe<Array<Maybe<Lyric>>>;
};

export type AllSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSongsQuery = (
  { __typename?: 'Query' }
  & { songs?: Maybe<Array<Maybe<(
    { __typename?: 'Song' }
    & Pick<Song, 'id' | 'title'>
  )>>> }
);


export const AllSongsDocument = gql`
    query allSongs {
  songs {
    id
    title
  }
}
    `;

/**
 * __useAllSongsQuery__
 *
 * To run a query within a React component, call `useAllSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSongsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSongsQuery(baseOptions?: Apollo.QueryHookOptions<AllSongsQuery, AllSongsQueryVariables>) {
        return Apollo.useQuery<AllSongsQuery, AllSongsQueryVariables>(AllSongsDocument, baseOptions);
      }
export function useAllSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSongsQuery, AllSongsQueryVariables>) {
          return Apollo.useLazyQuery<AllSongsQuery, AllSongsQueryVariables>(AllSongsDocument, baseOptions);
        }
export type AllSongsQueryHookResult = ReturnType<typeof useAllSongsQuery>;
export type AllSongsLazyQueryHookResult = ReturnType<typeof useAllSongsLazyQuery>;
export type AllSongsQueryResult = Apollo.QueryResult<AllSongsQuery, AllSongsQueryVariables>;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Lyric: ResolverTypeWrapper<Lyric>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Song: ResolverTypeWrapper<Song>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Lyric: Lyric;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  String: Scalars['String'];
  Mutation: {};
  Query: {};
  Song: Song;
  Boolean: Scalars['Boolean'];
}>;

export type LyricResolvers<ContextType = any, ParentType extends ResolversParentTypes['Lyric'] = ResolversParentTypes['Lyric']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationAddSongArgs, never>>;
  addLyricToSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationAddLyricToSongArgs, 'songId'>>;
  likeLyric?: Resolver<Maybe<ResolversTypes['Lyric']>, ParentType, ContextType, RequireFields<MutationLikeLyricArgs, 'id'>>;
  deleteSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationDeleteSongArgs, 'id'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  songs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QuerySongArgs, 'id'>>;
  lyric?: Resolver<Maybe<ResolversTypes['Lyric']>, ParentType, ContextType, RequireFields<QueryLyricArgs, 'id'>>;
}>;

export type SongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lyrics?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lyric']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Lyric?: LyricResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;