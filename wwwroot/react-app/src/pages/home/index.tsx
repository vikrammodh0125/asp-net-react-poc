import React from "react";
import { UserCreate, UserSearch } from "../../containers";
import { useMe } from "../../hooks/useMe";

export const HomePage = () => {
  const { isLoggedIn, isAdmin } = useMe();

  if (!isLoggedIn) {
    return (
      <div className="web-px-12 web-py-8 web-flex-1 web-flex web-justify-center web-items-center">
        <p className="web-text-2xl">Please login to access this page</p>
      </div>
    );
  }

  return (
    <div className="web-px-12 web-py-8 web-flex-1 web-grid web-grid-cols-4 web-gap-12">
      {isAdmin && (
        <div className="web-col-span-3 web-flex-1 web-flex">
          <UserCreate />
        </div>
      )}
      <UserSearch />
    </div>
  );
};
