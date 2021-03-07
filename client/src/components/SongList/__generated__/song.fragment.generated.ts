import * as Types from '../../../../../schema/__generated__/schema.all';

import { gql } from '@apollo/client';
export type SongFieldsFragment = { __typename?: 'Song', id?: Types.Maybe<string>, title?: Types.Maybe<string> };

export const SongFieldsFragmentDoc = gql`
    fragment SongFields on Song {
  id
  title
}
    `;