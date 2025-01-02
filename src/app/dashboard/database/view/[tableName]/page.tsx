"use client";

import { dbApi } from "@/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState, ChangeEvent } from "react";
import { TailSpin } from "react-loader-spinner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page({ params }: { params: { tableName: string } }) {
  const [tableRows, setTableRows] = useState<object[] | undefined>(undefined);
  const [cols, setCols] = useState<string[]>([]);
  const [fields, setFields] = useState<{ [key: string]: string }>({});
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [ fetchKey, triggerFetch ] = useState(0)

  // Fetch data for table rows
  useEffect(() => {
    dbApi
      .post("/fetch-data", {
        tableName: params.tableName,
      })
      .then((res) => {
        setTableRows(res.data.data);
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.tableName, fetchKey]);

  // Fetch columns for the table
  useEffect(() => {
    dbApi
      .get("/admin/get-columns", { params: { tableName: params.tableName } })
      .then((res) => {
        setCols(res.data.columns);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.tableName]);

  // Update the fields state when columns change
  useEffect(() => {
    setFields(
      cols.reduce((obj, key) => {
        obj[key] = "";
        return obj;
      }, {} as { [key: string]: string })
    );
  }, [cols]);

  // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  // Handle form submission (for adding data)
  const handleSubmit = async () => {
    try {
      await dbApi.post("/insert-data", {
        tableName: params.tableName,
        data: fields,
      });
      setDialogOpen(false); // Close dialog after successful submission
      // Optionally, you can refetch data here to update the table view
      triggerFetch(prev => prev + 1)
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  // If tableRows is undefined, show loading spinner
  if (tableRows === undefined) {
    return (
      <div className="flex items-center justify-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <div className="flex items-center w-full justify-center flex-col pt-10">
      <div className="flex items-center justify-between">
        <span></span>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              Add User
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>
                Add new users to your application here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {cols.map((col) => (
                <div key={col} className="grid items-center gap-4">
                  <Label htmlFor={col} className="text-right">
                    {col}
                  </Label>
                  <Input
                    id={col}
                    className="col-span-3"
                    name={col}
                    value={fields[col] || ""}
                    onChange={handleChange} // Handle the change for each input
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <h3 className="font-semibold text-xl p-3">{params.tableName}</h3>

      <table className="">
        <thead>
          <tr className="flex items-center">
            {cols.map((head) => (
              <th className="border w-96" key={head}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, rid) => {
            const cells = Object.entries(row);

            return (
              <tr key={rid} className="flex items-center">
                {cells.map((cell, cid) => (
                  <td className="border w-96 h-20 overflow-x-auto" key={cid}>
                    {cell[1]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
