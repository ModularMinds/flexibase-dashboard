"use client";

import { authApi } from "@/api";
import { AddUserButton } from "@/components/custom/AddUserButton";
import AuthenticatedUsersList from "@/components/custom/AuthenticatedUsersList";

import ServiceUnavailableBanner from "@/components/custom/ServiceUnavailableBanner";
import FlexibaseAuthProvider from "@/context/FlexibaseAuthProvider";

import { useEffect, useState } from "react";

const Page = () => {
  const [isServiceAvailable, setIsServiceAvailable] = useState(false);

  useEffect(() => {
    authApi
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
        <ServiceUnavailableBanner serviceName="Authentication" />
      ) : (
        <FlexibaseAuthProvider>
          <div className="flex items-center justify-between px-10 py-4">
            <span></span>
            <AddUserButton />
          </div>
          <AuthenticatedUsersList />
        </FlexibaseAuthProvider>
      )}
    </div>
  );
};

export default Page;
