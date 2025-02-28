import { useEffect, useState } from "react";
import { Input } from "../ui";
import { useGetUsers } from "../hooks/queries";

export const UserSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: results = [], isLoading } = useGetUsers();
 
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    const filteredResults = results.filter((el) => el.name.toLowerCase().includes(search?.toLowerCase()));
    setSearchResults(filteredResults);
  }, [search]);

  return (
    <div className="web-flex-1 web-flex-col web-flex web-space-y-4">
      <p className="web-font-semibold web-text-2xl">Search User</p>
      <Input placeholder="Type here..." value={search} onChange={(e) => setSearch(e.target.value)} />

      {isLoading && <p>Loading...</p>}

      <div>
        <table className="web-w-full">
          <tr>
            <th className="web-w-1/2 web-text-left web-bg-gray-200 web-px-4 web-py-1">
              <span>ID</span>
            </th>
            <th className="web-w-1/2 web-text-left web-bg-gray-200 web-px-4 web-py-1">
              <span>Name</span>
            </th>
          </tr>
          {(searchResults.length > 0 ? searchResults : results)?.map((el, index) => (
            <tr key={index}>
              <td className="web-w-1/2 web-px-4 web-py-3">
                <span>{el.id}</span>
              </td>
              <td className="web-w-1/2 web-px-4 web-py-3">
                <span>{el.name}</span>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
