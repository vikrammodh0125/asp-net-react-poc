import React, {
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useState } from "react";
import { Button, Input } from "../ui";
import { useGetUsers } from "../hooks/queries";
import Popup from "reactjs-popup";
import { UserCreate } from "./user-create";
import { BulkUpsertItem, Schema, User } from "../types";

interface UserRowProps {
  user: Schema<User>;
  onRemove: (user: UserRowProps["user"]) => void;
  onEdit: (user: UserRowProps["user"]) => void;
  isAdmin: boolean;
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  onEdit,
  onRemove,
  isAdmin,
}) => {
  const [isOpenUserPopup, setOpenUserPopup] = useState(false);
  return (
    <tr>
      <td className="web-w-1/4 web-px-4 web-py-3 web-text-center">
        <span>{user.id}</span>
      </td>
      <td className="web-w-1/4 web-px-4 web-py-3 web-text-center">
        <span>{user.name}</span>
      </td>
      <td className="web-w-1/4 web-px-4 web-py-3 web-text-center">
        <span>{user.email}</span>
      </td>
      {isAdmin && (
        <td className="web-w-1/4 web-px-4 web-py-3 web-text-center">
          <p className="web-text-center web-items-center web-flex web-justify-center web-py-2 web-space-x-2">
            <Button onClick={() => setOpenUserPopup(true)}>Edit</Button>
            <Button onClick={() => onRemove(user)}>Remove</Button>
          </p>

          <Popup
            open={isOpenUserPopup}
            onClose={() => setOpenUserPopup(false)}
            modal
          >
            <div className="web-px-6 web-py-4">
              <UserCreate
                onSave={(values) => {
                  onEdit({ ...user, ...values });
                  setOpenUserPopup(false);
                }}
                initialValues={user}
              />
            </div>
          </Popup>
        </td>
      )}
    </tr>
  );
};

interface UserListProps {
  isAdmin: boolean;
}

export interface UserListRef {
  transactions: BulkUpsertItem<User>[];
}

export const UserList = React.forwardRef<UserListRef, UserListProps>(
  ({ isAdmin }, ref) => {
    const [search, setSearch] = useState("");
    const { data = [], isLoading } = useGetUsers();
    const transactionsRef = useRef<BulkUpsertItem<User>[]>([]);
    const [isOpenUserPopup, setOpenUserPopup] = useState(false);

    const [results, setResults] = useState(data);

    useImperativeHandle(
      ref,
      () => ({
        transactions: transactionsRef.current,
      }),
      [results]
    );

    useEffect(() => {
      setResults(data);
    }, [data]);

    const filteredResults = useMemo(() => {
      if (!search) {
        return results;
      }
      return results.filter((el) =>
        el.name.toLowerCase().includes(search?.toLowerCase())
      );
    }, [search, results]);

    const handleUserRemove = (user: Schema<User>, index: number) => {
      if (user.id) {
        const matchedUserIndex = transactionsRef.current.findIndex(
          (el) => el.id === user.id
        );

        if (matchedUserIndex !== -1) {
          transactionsRef.current[matchedUserIndex].isDeleted = true;
        } else {
          transactionsRef.current.push({
            ...user,
            isDeleted: true,
          });
        }
      }

      setResults((prev) =>
        prev.filter((_, elementIndex) => elementIndex !== index)
      );
    };

    const handleUserEdit = (user: Schema<User>, index: number) => {
      const matchedUserIndex = transactionsRef.current.findIndex(
        (el) => el.id === user.id
      );

      if (matchedUserIndex !== -1) {
        transactionsRef.current[matchedUserIndex] = user;
      } else {
        transactionsRef.current.push(user);
      }

      setResults((prev) =>
        prev.map((el, elementIndex) =>
          index === elementIndex ? { ...el, ...user } : el
        )
      );
    };

    const onUserCreate = (user: User) => {
      transactionsRef.current.push(user);

      setResults((prev) => [{ ...user, id: "" }, ...prev]);
      setOpenUserPopup(false);
    };

    return (
      <div className="web-flex-1 web-flex-col web-flex web-space-y-4">
        <div className="web-items-center web-flex web-justify-between">
          <p className="web-text-xl web-font-bold">Users</p>

          {isAdmin && (
            <Fragment>
              <Popup
                open={isOpenUserPopup}
                onClose={() => setOpenUserPopup(false)}
                modal
              >
                <div className="web-px-6 web-py-4">
                  <UserCreate onSave={onUserCreate} />
                </div>
              </Popup>
              <Button onClick={() => setOpenUserPopup(true)}>Add New</Button>
            </Fragment>
          )}
        </div>
        <Input
          placeholder="Type here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isLoading && <p>Loading...</p>}

        <div>
          <table className="web-w-full">
            <tr>
              <th className="web-w-1/4 web-bg-gray-200 web-px-4 web-py-2 web-text-center ">
                <span>ID</span>
              </th>
              <th className="web-w-1/4 web-bg-gray-200 web-px-4 web-py-2 web-text-center">
                <span>Name</span>
              </th>
              <th className="web-w-1/4 web-bg-gray-200 web-px-4 web-py-2 web-text-center">
                <span>Email</span>
              </th>
              {isAdmin && (
                <th className="web-w-1/4 web-bg-gray-200 web-px-4 web-py-2 web-text-center">
                  <span>Actions</span>
                </th>
              )}
            </tr>
            {filteredResults.map((el, index) => (
              <UserRow
                key={index}
                isAdmin={isAdmin}
                user={el}
                onEdit={(user) => handleUserEdit(user, index)}
                onRemove={(user) => handleUserRemove(user, index)}
              />
            ))}
          </table>
        </div>
      </div>
    );
  }
);
