import React, { useState } from "react";
import { Button } from "../ui";
import { useMe } from "../hooks";
import { Note, Schema } from "../types";
import Popup from "reactjs-popup";
import { NoteCreate } from "./note-create";

interface NoteRowProps {
  note: Schema<Note>;
  onRemove: (note: NoteRowProps["note"]) => void;
  onEdit: (note: NoteRowProps["note"]) => void;
}

const NoteRow: React.FC<NoteRowProps> = ({ note, onRemove, onEdit }) => {
  const { isAdmin } = useMe();
  const [isOpenNotePopup, setOpenNotePopup] = useState(false);

  return (
    <div
      className={`web-grid web-gap-2 ${
        isAdmin ? "web-grid-cols-3" : "web-grid-cols-2"
      }`}
    >
      <p className="web-text-center web-items-center web-flex web-justify-center web-py-2">
        {note.id}
      </p>
      <p className="web-text-center web-items-center web-flex web-justify-center web-py-2">
        {note.content}
      </p>
      {isAdmin && (
        <p className="web-text-center web-items-center web-flex web-justify-center web-py-2 web-space-x-2">
          <Button onClick={() => setOpenNotePopup(true)}>Edit</Button>
          <Button onClick={() => onRemove(note)}>Remove</Button>
        </p>
      )}

      <Popup
        open={isOpenNotePopup}
        onClose={() => setOpenNotePopup(false)}
        modal
      >
        <div className="web-px-6 web-py-4">
          <NoteCreate
            onSave={(values) => {
              onEdit({ ...note, ...values });
              setOpenNotePopup(false);
            }}
            initialValues={note}
          />
        </div>
      </Popup>
    </div>
  );
};

interface NotesListProps {
  notes: Schema<Note>[];
  onRemove: (note: Schema<Note>, index: number) => void;
  onEdit: (note: Schema<Note>, index: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes = [],
  onRemove,
  onEdit,
}) => {
  const { isAdmin } = useMe();

  return (
    <div className="web-rounded-md">
      <div
        className={`web-grid web-gap-2 web-bg-gray-200  ${
          isAdmin ? "web-grid-cols-3" : "web-grid-cols-2"
        }`}
      >
        <p className="web-text-center web-font-bold web-py-2">ID</p>
        <p className="web-text-center web-font-bold web-py-2">Description</p>
        {isAdmin && (
          <p className="web-text-center web-font-bold web-py-2">Actions</p>
        )}
      </div>
      <div>
        {notes.map((note, index) => (
          <NoteRow
            note={note}
            key={note.id || index}
            onRemove={(note) => onRemove(note, index)}
            onEdit={(note) => onEdit(note, index)}
          />
        ))}
      </div>
    </div>
  );
};
