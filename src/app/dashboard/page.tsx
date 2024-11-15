"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("flexibase-admin-user");
    if (!user) router.replace("/");
  })

  return <div>Dashboard</div>;
};

export default Page;
