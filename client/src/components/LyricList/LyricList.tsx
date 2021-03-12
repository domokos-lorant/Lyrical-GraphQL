import React from "react";
import { Maybe } from "../../../../schema/__generated__/schema.all";
import { LyricFieldsFragment } from "../SongDetail/__generated__/lyric.fragment.generated";
import { LikeLyricMutationHookResult, useLikeLyricMutation } from "./__generated__/likeLyric.mutation.generated";

type Props = {
   lyrics: Maybe<LyricFieldsFragment[]>
}

export default function LyricList({ lyrics }: Props): JSX.Element {
   const [likeLyric] = useLikeLyricMutation();
   return (
      <ul className="collection">
         {renderLyrics(lyrics, likeLyric)}
      </ul>
   );
}

function renderLyrics(lyrics: Props["lyrics"], likeLyric: LikeLyricMutationHookResult[0]): JSX.Element[] {
   const onLike = (id: string, likes: number) => {
      likeLyric({
         variables: { id },
         optimisticResponse: {
            __typename: "Mutation",
            likeLyric: {
               id,
               likes: likes + 1,
               __typename: "Lyric"
            }
         }
      });
   };

   return (lyrics || []).map(({ id, content, likes }) => {
      return (
         <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
               <i
                  className="material-icons"
                  onClick={() => onLike(id, likes || 0)}>
                  thumb_up
               </i>
               {likes}
            </div>
         </li>
      );
   });
}