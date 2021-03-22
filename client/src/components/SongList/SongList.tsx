import React from "react";
import { AllSongsQueryHookResult, useAllSongsQuery } from "./__generated__/songs.query.generated";
import { SongFieldsFragment } from './__generated__/song.fragment.generated';
import { Maybe } from "../../../../schema/__generated__/schema.all";
import { Link } from "react-router";
import { DeleteSongMutationHookResult, useDeleteSongMutation } from "./__generated__/deleteSong.mutation.generated";
import useRequireAuth from "../../hooks/useRequireAuth";

export default function SongList(): JSX.Element {
   useRequireAuth();

   const { loading, error: _error, data, refetch } = useAllSongsQuery();
   const [deleteSong] = useDeleteSongMutation();

   return (
      <>
         {
            loading || !data
               ? <div>Loading...</div>
               : <div>
                  <ul className="collection">
                     {renderSongs(data.songs, deleteSong, refetch)}
                  </ul>
                  <Link
                     to="/songs/new"
                     className="btn-floating btn-large red right" >
                     <i className="material-icons">add</i>
                  </Link>
               </div>
         }
      </>
   );
}

function renderSongs(
   songs: Maybe<SongFieldsFragment[]>,
   deleteSong: DeleteSongMutationHookResult[0],
   refetch: AllSongsQueryHookResult["refetch"]): JSX.Element[] {
   const onDelete = async (id: string): Promise<void> => {
      await deleteSong({
         variables: { id: id || "" },
      });
      refetch();
   };

   return (songs || []).map(({ id, title }) => {
      return (
         <li key={id} className="collection-item" >
            <Link to={`/songs/${id}`}>{title}</Link>
            <i
               className="material-icons"
               onClick={() => onDelete(id || "")} >
               delete
            </i>
         </li >
      );
   });
}