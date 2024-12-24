"use client";

import { dbApi } from "@/api";

import AuthenticatedUsersList from "@/components/custom/AuthenticatedUsersList";
import ServiceUnavailableBanner from "@/components/custom/ServiceUnavailableBanner";

import { useEffect, useState } from "react";

const Page = () => {
  const [isServiceAvailable, setIsServiceAvailable] = useState(false);

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

  return (
    <div>
      {!isServiceAvailable ? (
        <ServiceUnavailableBanner serviceName="Database" />
      ) : (
        <AuthenticatedUsersList />
      )}
    </div>
  );
};

export default Page;
