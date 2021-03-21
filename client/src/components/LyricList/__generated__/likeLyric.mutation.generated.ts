import * as Types from '../../../../../schema/__generated__/schema.all';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type LikeLyricMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type LikeLyricMutation = { __typename?: 'Mutation', likeLyric?: Types.Maybe<{ __typename?: 'Lyric', id: string, likes?: Types.Maybe<number> }> };


export const LikeLyricDocument = gql`
    mutation likeLyric($id: ID!) {
  likeLyric(id: $id) {
    id
    likes
  }
}
    `;
export type LikeLyricMutationFn = Apollo.MutationFunction<LikeLyricMutation, LikeLyricMutationVariables>;

/**
 * __useLikeLyricMutation__
 *
 * To run a mutation, you first call `useLikeLyricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeLyricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeLyricMutation, { data, loading, error }] = useLikeLyricMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeLyricMutation(baseOptions?: Apollo.MutationHookOptions<LikeLyricMutation, LikeLyricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeLyricMutation, LikeLyricMutationVariables>(LikeLyricDocument, options);
      }
export type LikeLyricMutationHookResult = ReturnType<typeof useLikeLyricMutation>;
export type LikeLyricMutationResult = Apollo.MutationResult<LikeLyricMutation>;
export type LikeLyricMutationOptions = Apollo.BaseMutationOptions<LikeLyricMutation, LikeLyricMutationVariables>;