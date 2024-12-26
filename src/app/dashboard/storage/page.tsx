"use client";

import { storageApi } from "@/api";

import AuthenticatedUsersList from "@/components/custom/AuthenticatedUsersList";
import ServiceUnavailableBanner from "@/components/custom/ServiceUnavailableBanner";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Page = () => {
  const [isServiceAvailable, setIsServiceAvailable] = useState<boolean>();

  useEffect(() => {
    storageApi
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
        <ServiceUnavailableBanner serviceName="Storage" />
      ) : (
        <AuthenticatedUsersList />
      )}
    </div>
  );
};

export default Page;
