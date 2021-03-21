import * as Types from '../../../../../schema/__generated__/schema.all';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddSongMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
}>;


export type AddSongMutation = { __typename?: 'Mutation', addSong?: Types.Maybe<{ __typename?: 'Song', id: string, title?: Types.Maybe<string> }> };


export const AddSongDocument = gql`
    mutation addSong($title: String!) {
  addSong(title: $title) {
    id
    title
  }
}
    `;
export type AddSongMutationFn = Apollo.MutationFunction<AddSongMutation, AddSongMutationVariables>;

/**
 * __useAddSongMutation__
 *
 * To run a mutation, you first call `useAddSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSongMutation, { data, loading, error }] = useAddSongMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddSongMutation(baseOptions?: Apollo.MutationHookOptions<AddSongMutation, AddSongMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSongMutation, AddSongMutationVariables>(AddSongDocument, options);
      }
export type AddSongMutationHookResult = ReturnType<typeof useAddSongMutation>;
export type AddSongMutationResult = Apollo.MutationResult<AddSongMutation>;
export type AddSongMutationOptions = Apollo.BaseMutationOptions<AddSongMutation, AddSongMutationVariables>;