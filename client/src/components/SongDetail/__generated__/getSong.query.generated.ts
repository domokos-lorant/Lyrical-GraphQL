import * as Types from '../../../../../schema/__generated__/schema.all';

import { LyricFieldsFragment } from './lyric.fragment.generated';
import { gql } from '@apollo/client';
import { LyricFieldsFragmentDoc } from './lyric.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetSongQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSongQuery = { __typename?: 'Query', song?: Types.Maybe<{ __typename?: 'Song', id?: Types.Maybe<string>, title?: Types.Maybe<string>, lyrics?: Types.Maybe<Array<(
      { __typename?: 'Lyric' }
      & LyricFieldsFragment
    )>> }> };


export const GetSongDocument = gql`
    query getSong($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics {
      ...LyricFields
    }
  }
}
    ${LyricFieldsFragmentDoc}`;

/**
 * __useGetSongQuery__
 *
 * To run a query within a React component, call `useGetSongQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSongQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSongQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSongQuery(baseOptions: Apollo.QueryHookOptions<GetSongQuery, GetSongQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSongQuery, GetSongQueryVariables>(GetSongDocument, options);
      }
export function useGetSongLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSongQuery, GetSongQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSongQuery, GetSongQueryVariables>(GetSongDocument, options);
        }
export type GetSongQueryHookResult = ReturnType<typeof useGetSongQuery>;
export type GetSongLazyQueryHookResult = ReturnType<typeof useGetSongLazyQuery>;
export type GetSongQueryResult = Apollo.QueryResult<GetSongQuery, GetSongQueryVariables>;