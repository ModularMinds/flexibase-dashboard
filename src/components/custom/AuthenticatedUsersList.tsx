import { authApi } from "@/api";
import { useFlexibaseAuth } from "@/context/FlexibaseAuthProvider";
import { useEffect, useState } from "react";

const AuthenticatedUsersList = () => {

  const [users, setUsers] = useState<{ id: string; email: string }[]>([]);

  const { fetchKey } = useFlexibaseAuth()

  useEffect(() => {
    authApi
      .get("/admin/get-users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchKey]);

  return (
    <div className="px-3 pt-3">
      <div className="grid grid-cols-2 bg-gray-900 text-white">
        <p className="p-3 ">User ID</p>
        <p className="p-3 ">Email</p>
      </div>
      {users.map(({ id, email }, key) => {
        return (
          <div key={key} className="grid grid-cols-2">
            <p className="border p-3">{id}</p>
            <p className="border p-3">{email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AuthenticatedUsersList;
