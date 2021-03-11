import * as Types from '../../../../../schema/__generated__/schema.all';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AddLyricMutationVariables = Types.Exact<{
  songId: Types.Scalars['ID'];
  content: Types.Scalars['String'];
}>;


export type AddLyricMutation = { __typename?: 'Mutation', addLyricToSong?: Types.Maybe<{ __typename?: 'Song', id?: Types.Maybe<string>, lyrics?: Types.Maybe<Array<{ __typename?: 'Lyric', content?: Types.Maybe<string> }>> }> };


export const AddLyricDocument = gql`
    mutation addLyric($songId: ID!, $content: String!) {
  addLyricToSong(songId: $songId, content: $content) {
    id
    lyrics {
      content
    }
  }
}
    `;
export type AddLyricMutationFn = Apollo.MutationFunction<AddLyricMutation, AddLyricMutationVariables>;

/**
 * __useAddLyricMutation__
 *
 * To run a mutation, you first call `useAddLyricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLyricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLyricMutation, { data, loading, error }] = useAddLyricMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddLyricMutation(baseOptions?: Apollo.MutationHookOptions<AddLyricMutation, AddLyricMutationVariables>) {
        return Apollo.useMutation<AddLyricMutation, AddLyricMutationVariables>(AddLyricDocument, baseOptions);
      }
export type AddLyricMutationHookResult = ReturnType<typeof useAddLyricMutation>;
export type AddLyricMutationResult = Apollo.MutationResult<AddLyricMutation>;
export type AddLyricMutationOptions = Apollo.BaseMutationOptions<AddLyricMutation, AddLyricMutationVariables>;