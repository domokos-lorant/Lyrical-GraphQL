import React from "react";
import { Maybe } from "../../../../schema/__generated__/schema.all";
import { LyricFieldsFragment } from "../SongDetail/__generated__/lyric.fragment.generated";

type Props = {
   lyrics: Maybe<LyricFieldsFragment[]>
}

export default function LyricList({ lyrics }: Props): JSX.Element {
   return (
      <ul className="collection">
         {renderLyrics(lyrics)}
      </ul>
   );
}

function renderLyrics(lyrics: Props["lyrics"]): JSX.Element[] {
   return (lyrics || []).map(({ id, content }) => {
      return (
         <li key={id} className="collection-item">
            {content}
         </li>
      );
   });
}