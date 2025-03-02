import React from "react";
import { Button } from "../../ui";
import { NotesList } from "../../containers";
import { useMe } from "../../hooks/useMe";
import { useGetNotes } from "../../hooks/queries";
import { useCreateNote } from "../../hooks";

export const NotesPage = () => {
  const { isLoggedIn, isAdmin } = useMe();
  const { data, isLoading } = useGetNotes();
  const { mutateAsync: createNote } = useCreateNote();

  const handleCreateNote = async () => {
    const description = window.prompt("Enter description");
    if (description) {
      await createNote({ content: description });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="web-px-12 web-py-8 web-flex-1 web-flex web-justify-center web-items-center">
        <p className="web-text-2xl">Please login to access this page</p>
      </div>
    );
  }

  return (
    <div className="web-px-12 web-py-8 web-space-y-4 web-flex web-flex-col web-flex-1">
      <div className="web-items-center web-flex web-justify-between">
        <p className="web-text-xl web-font-bold">Notes</p>
        {isAdmin && <Button onClick={handleCreateNote}>Add New</Button>}
      </div>

      {isLoading && <p>Loading...</p>}
      <div className="web-flex-1">
        <NotesList
          notes={
            data?.map((note) => ({
              ...note,
              description: note.content,
            })) ?? []
          }
        />
      </div>
    </div>
  );
};
