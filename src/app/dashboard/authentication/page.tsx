"use client";

import { authApi } from "@/api";
import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState<{ id: string; email: string }[]>([]);

  useEffect(() => {
    authApi
      .get("/admin/get-users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {users.map(({ id, email }, key) => {
        return (
          <div key={key}>
            <span>{id}</span>
            <span>{email}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
