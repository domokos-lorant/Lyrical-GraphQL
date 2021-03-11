import React from "react";
import { Link } from "react-router";
import { LyricCreate } from "../LyricCreate/LyricCreate";
import { useGetSongQuery } from "./__generated__/getSong.query.generated";

type Props = {
   params: { id: string };
}

export default function SongDetail({ params: { id } }: Props): JSX.Element {
   const { loading, error, data } = useGetSongQuery({ variables: { id } });

   return (
      <>
         {
            data?.song ?
               <div>
                  <Link to="/">Back</Link>
                  <h3>{data.song.title}</h3>
                  <LyricCreate songId={id} />
               </div>
               : <div>Loading...</div>
         }
      </>
   );
}