import React, { useRef, useState } from "react";
import { Notes, NotesListRef, UserList, UserListRef } from "../../containers";
import { useMe } from "../../hooks/useMe";
import { Button, Tabs } from "../../ui";
import { useBulkUpsert } from "../../hooks";

enum Tab {
  USER = "user",
  NOTE = "note",
}

export const HomePage = () => {
  const { isLoggedIn, isAdmin } = useMe();
  const [activeTab, setActiveTab] = useState(Tab.USER);
  const { mutate, isPending } = useBulkUpsert();

  const userListRef = useRef<UserListRef>(null);
  const notesRef = useRef<NotesListRef>(null);

  const handleBulkUpsert = () => {
    const users = userListRef.current?.transactions ?? [];
    const notes = notesRef.current?.transactions ?? [];

    if (users.length || notes.length) {
      mutate({
        notes,
        users,
      });
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
    <div className="web-px-12 web-py-8 web-flex-1 web-flex web-flex-col web-space-y-4 web-overflow-hidden">
      <Tabs
        onChange={setActiveTab}
        active={activeTab}
        items={[
          {
            label: "User",
            value: Tab.USER,
          },
          {
            label: "Notes",
            value: Tab.NOTE,
          },
        ]}
      />
      <div
        className={`${activeTab === Tab.USER ? "web-visible" : "web-hidden"}`}
      >
        <UserList isAdmin={isAdmin} ref={userListRef} />
      </div>

      <div
        className={`${activeTab === Tab.NOTE ? "web-visible" : "web-hidden"}`}
      >
        <Notes isAdmin={isAdmin} ref={notesRef} />
      </div>
      {isAdmin && (
        <Button onClick={handleBulkUpsert} disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      )}
    </div>
  );
};
