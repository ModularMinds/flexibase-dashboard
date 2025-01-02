import { dbApi } from "@/api";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useFlexibaseDB } from "@/context/FlexibaseDBProvider";

const TablesList = () => {
  const [tables, setTables] = useState<string[]>([]);

  const { fetchKey } = useFlexibaseDB()

  const router = useRouter();

  useEffect(() => {
    dbApi
      .get("/admin/get-tables")
      .then((res) => {
        setTables(res.data.tables);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [fetchKey]);

  return (
    <div className="px-10">
      {tables.map((table) => {
        return (
          <div
            className="flex items-center justify-between p-3 border"
            key={table}
          >
            <span className="">{table}</span>
            <Button
              onClick={() => router.push(`/dashboard/database/view/${table}`)}
            >
              View
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default TablesList;
