import * as Types from '../../../../../schema/__generated__/schema.all';

import { SongFieldsFragment } from './song.fragment.generated';
import { gql } from '@apollo/client';
import { SongFieldsFragmentDoc } from './song.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AllSongsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllSongsQuery = { __typename?: 'Query', songs?: Types.Maybe<Array<(
    { __typename?: 'Song' }
    & SongFieldsFragment
  )>> };


export const AllSongsDocument = gql`
    query allSongs {
  songs {
    ...SongFields
  }
}
    ${SongFieldsFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSongsQuery, AllSongsQueryVariables>(AllSongsDocument, options);
      }
export function useAllSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSongsQuery, AllSongsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSongsQuery, AllSongsQueryVariables>(AllSongsDocument, options);
        }
export type AllSongsQueryHookResult = ReturnType<typeof useAllSongsQuery>;
export type AllSongsLazyQueryHookResult = ReturnType<typeof useAllSongsLazyQuery>;
export type AllSongsQueryResult = Apollo.QueryResult<AllSongsQuery, AllSongsQueryVariables>;