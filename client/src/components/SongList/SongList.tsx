import React from "react";
import { useAllSongsQuery } from "./__generated__/songs.query.generated";
import { SongFieldsFragment } from './__generated__/song.fragment.generated';
import { Maybe } from "../../../../schema/__generated__/schema.all";

export default function SongList(): JSX.Element {
   const { loading, error: _error, data } = useAllSongsQuery();

   return (
      <>
         {loading || !data
            ? <div>Loading...</div>
            : <ul className="collection">
               {renderSongs(data.songs)}
            </ul>
         }
      </>
   );
}

function renderSongs(songs: Maybe<SongFieldsFragment[]>): JSX.Element[] {
   return (songs || []).map(song => {
      return (
         <li key={song?.id} className="collection-item">
            {song?.title}
         </li>
      );
   });
}