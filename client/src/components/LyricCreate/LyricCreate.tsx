import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useAddLyricMutation } from "./__generated__/addLyric.mutation.generated";

type Params = {
   songId: string;
}

export default function LyricCreate({ songId }: Params): JSX.Element {
   const [content, setContent] = useState("");
   const [addLyric] = useAddLyricMutation();
   const onContentChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
         setContent(event.target.value);
      },
      [content]);
   const onSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         await addLyric({
            variables: { songId, content },
            //refetchQueries: [{ query: AllSongsDocument }]
         });
         setContent("");
      },
      [content]);

   return (
      <form onSubmit={onSubmit}>
         <label>Add a Lyric</label>
         <input
            value={content}
            onChange={onContentChange} />
      </form>
   );
}