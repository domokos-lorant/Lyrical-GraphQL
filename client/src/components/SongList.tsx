import React from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
   {
      songs {
         id
         title
      }
   }
`;

export default function SongList(): JSX.Element {
   const { loading, error, data } = useQuery(query);

   return (
      <>
         {loading
            ? <div>Loading...</div>
            : <ul className="collection">
               {renderSongs(data.songs)}
            </ul>
         }
      </>
   );
}

function renderSongs(songs: any[]): JSX.Element[] {
   return songs.map(song => {
      return (
         <li key={song.id} className="collection-item">
            {song.title}
         </li>
      );
   });
}