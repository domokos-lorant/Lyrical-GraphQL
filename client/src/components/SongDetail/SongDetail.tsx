import React from "react";
import { Link } from "react-router";
import useRequireAuth from "../../hooks/useRequireAuth";
import LyricCreate from "../LyricCreate/LyricCreate";
import LyricList from "../LyricList/LyricList";
import { useGetSongQuery } from "./__generated__/getSong.query.generated";

type Props = {
   params: { id: string };
}

export default function SongDetail({ params: { id } }: Props): JSX.Element {
   useRequireAuth();

   const { loading, error, data } = useGetSongQuery({ variables: { id } });
   const song = data?.song;

   return (
      <>
         {
            song ?
               <div>
                  <Link to="/">Back</Link>
                  <h3>{song.title}</h3>
                  <LyricList lyrics={song.lyrics} />
                  <LyricCreate songId={id} />
               </div>
               : <div>Loading...</div>
         }
      </>
   );
}