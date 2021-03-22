import React, { ChangeEvent, useCallback, useState, FormEvent } from "react";
import { hashHistory, Link } from "react-router";
import useRequireAuth from "../../hooks/useRequireAuth";
import { AllSongsDocument } from "../SongList/__generated__/songs.query.generated";
import { useAddSongMutation } from "./__generated__/addSong.mutation.generated";

export default function SongCreate(): JSX.Element {
   useRequireAuth();

   const [title, setTitle] = useState("");
   const [addSong] = useAddSongMutation();
   const onTitleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         setTitle(event.target.value);
      },
      [title]);
   const onSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         await addSong({
            variables: { title },
            refetchQueries: [{ query: AllSongsDocument }]
         });
         hashHistory.push("/");
      },
      [title]);

   return (
      <div>
         <Link to="/">Back</Link>
         <h3>Create a New Song</h3>
         <form onSubmit={onSubmit}>
            <label>Song title:</label>
            <input
               onChange={onTitleChange}
               value={title} />
         </form>
      </div>
   );
}