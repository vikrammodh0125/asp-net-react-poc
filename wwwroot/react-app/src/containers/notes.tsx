import React, { Fragment, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { NotesList } from "./notes-list";
import { Button, Input } from "../ui";
import { useGetNotes } from "../hooks";
import { NoteCreate } from "./note-create";
import { BulkUpsertItem, Note, Schema } from "../types";

interface NotesProps {
  isAdmin: boolean;
}

export interface NotesListRef {
  transactions: BulkUpsertItem<Note>[];
}

export const Notes = React.forwardRef<NotesListRef, NotesProps>(
  ({ isAdmin }, ref) => {
    const { data = [], isLoading } = useGetNotes();
    const [search, setSearch] = useState("");
    const transactionsRef = useRef<BulkUpsertItem<Note>[]>([]);
    const [isOpenNotePopup, setOpenNotePopup] = useState(false);

    const [results, setResults] = useState(data);

    useEffect(() => {
      setResults(data);
    }, [data]);

    useImperativeHandle(
      ref,
      () => ({
        transactions: transactionsRef.current,
      }),
      [results]
    );

    const filteredResults = useMemo(() => {
      if (!search) {
        return results;
      }
      return results.filter((el) =>
        el.content.toLowerCase().includes(search?.toLowerCase())
      );
    }, [search, results]);

    const handleNoteRemove = (note: Schema<Note>, index: number) => {
      if (note.id) {
        const matchedNoteIndex = transactionsRef.current.findIndex(
          (el) => el.id === note.id
        );

        if (matchedNoteIndex !== -1) {
          transactionsRef.current[matchedNoteIndex].isDeleted = true;
        } else {
          transactionsRef.current.push({
            ...note,
            isDeleted: true,
          });
        }
      }

      setResults((prev) =>
        prev.filter((_, elementIndex) => elementIndex !== index)
      );
    };

    const handleNoteEdit = (note: Schema<Note>, index: number) => {
      const matchedNoteIndex = transactionsRef.current.findIndex(
        (el) => el.id === note.id
      );

      if (matchedNoteIndex !== -1) {
        transactionsRef.current[matchedNoteIndex] = note;
      } else {
        transactionsRef.current.push(note);
      }

      setResults((prev) =>
        prev.map((el, elementIndex) =>
          index === elementIndex ? { ...el, ...note } : el
        )
      );
    };

    const onNoteCreate = (note: Note) => {
      transactionsRef.current.push(note);

      setResults((prev) => [{ ...note, id: "" }, ...prev]);
      setOpenNotePopup(false);
    };

    return (
      <div className="web-flex web-flex-col web-flex-1 web-space-y-4">
        <div className="web-items-center web-flex web-justify-between">
          <p className="web-text-xl web-font-bold">Notes</p>

          {isAdmin && (
            <Fragment>
              <Popup
                open={isOpenNotePopup}
                onClose={() => setOpenNotePopup(false)}
                modal
              >
                <div className="web-px-6 web-py-4">
                  <NoteCreate onSave={onNoteCreate} />
                </div>
              </Popup>
              <Button onClick={() => setOpenNotePopup(true)}>Add New</Button>
            </Fragment>
          )}
        </div>

        <Input
          placeholder="Type here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isLoading && <p>Loading...</p>}
        <div className="web-flex-1">
          <NotesList
            notes={filteredResults}
            onRemove={handleNoteRemove}
            onEdit={handleNoteEdit}
          />
        </div>
      </div>
    );
  }
);
