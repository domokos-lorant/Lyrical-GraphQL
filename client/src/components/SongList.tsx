import React from "react";
// Todo: move operation generation closer.
// Todo: why is TS autocomplete not working in client folder?
import { useAllSongsQuery, AllSongsQuery } from "../../../schema/__generated__/schema.all";

export default function SongList(): JSX.Element {
   const { loading, error, data } = useAllSongsQuery();

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

function renderSongs(songs: AllSongsQuery["songs"]): JSX.Element[] {
   return (songs || []).map(song => {
      return (
         <li key={song?.id} className="collection-item">
            {song?.title}
         </li>
      );
   });
}