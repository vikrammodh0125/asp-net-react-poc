import { Button } from "../ui";
import { useDeleteNote, useEditNote, useMe } from "../hooks";

const NoteRow = ({ note }) => {
  const { isAdmin } = useMe();
  const { mutateAsync: deleteNote } = useDeleteNote();
  const { mutateAsync: editNote } = useEditNote();

  const handleDelete = async () => {
    await deleteNote(note.id);
  };

  const handleEdit = async () => {
    const description = window.prompt("Edit description", note.description);
    if (description) {
      await editNote({ ...note, content: description });
    }
  };

  return (
    <div className={`web-grid web-gap-2 ${isAdmin ? 'web-grid-cols-3' : 'web-grid-cols-2'}`}>
      <p className="web-text-center web-items-center web-flex web-justify-center web-py-2">{note.id}</p>
      <p className="web-text-center web-items-center web-flex web-justify-center web-py-2">{note.description}</p>
      {isAdmin && (
        <p className="web-text-center web-items-center web-flex web-justify-center web-py-2 web-space-x-2">
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Remove</Button>
        </p>
      )}
    </div>
  );
};

export const NotesList = ({ notes = [] }) => {
  const { isAdmin } = useMe();

  return (
    <div className="web-bg-gray-200 web-p-4 web-rounded-md">
      <div className={`web-grid web-gap-2 ${isAdmin ? 'web-grid-cols-3' : 'web-grid-cols-2'}`}>
        <p className="web-text-center web-font-bold web-py-2">
          Id
        </p>
        <p className="web-text-center web-font-bold web-py-2">
          Description
        </p>
        {isAdmin && (
          <p className="web-text-center web-font-bold web-py-2">Actions</p>
        )}
      </div>
      <div>
        {notes.map((note) => (
          <NoteRow note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
};
