import * as Types from '../../../../../schema/__generated__/schema.all';

import { gql } from '@apollo/client';
export type LyricFieldsFragment = { __typename?: 'Lyric', id?: Types.Maybe<string>, content?: Types.Maybe<string> };

export const LyricFieldsFragmentDoc = gql`
    fragment LyricFields on Lyric {
  id
  content
}
    `;