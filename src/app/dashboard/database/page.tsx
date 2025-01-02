"use client";

import { dbApi } from "@/api";
import { CreateTableButton } from "@/components/custom/CreateTableButton";

import ServiceUnavailableBanner from "@/components/custom/ServiceUnavailableBanner";
import TablesList from "@/components/custom/TablesList";
import FlexibaseDBProvider from "@/context/FlexibaseDBProvider";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Page = () => {
  const [isServiceAvailable, setIsServiceAvailable] = useState<boolean>();

  useEffect(() => {
    dbApi
      .get("/service-check")
      .then(() => {
        setIsServiceAvailable(true);
      })
      .catch(() => {
        setIsServiceAvailable(false);
      });
  }, []);

  if (isServiceAvailable === undefined) {
    return (
      <div className="flex items-center justify-center h-[500px]">
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
    <div>
      {!isServiceAvailable ? (
        <ServiceUnavailableBanner serviceName="Database" />
      ) : (
        <FlexibaseDBProvider>
          <div className="flex items-center justify-between px-10 py-4">
            <span></span>
            <CreateTableButton />
          </div>
          <TablesList />
        </FlexibaseDBProvider>
      )}
    </div>
  );
};

export default Page;
