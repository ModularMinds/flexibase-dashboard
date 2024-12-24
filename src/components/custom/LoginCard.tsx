"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const LoginCard = () => {
  const router = useRouter();

  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAdminCredentials({
      ...adminCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSignInClicked = async () => {
    const { username, password } = adminCredentials;

    if (
      username === process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_USER &&
      password === process.env.NEXT_PUBLIC_FLEXIBASE_ADMIN_PASSWORD
    ) {
      localStorage.setItem("flexibase-admin-user", username);
      router.replace("/dashboard");
    } else {
      alert("failed");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>
          Manage all your self-hosted services at one place.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                value={adminCredentials.username}
                type="text"
                id="username"
                placeholder="Enter your Admin username"
                onChange={handleChange}
                name="username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                value={adminCredentials.password}
                type="password"
                id="password"
                placeholder="Enter your Admin password"
                onChange={handleChange}
                name="password"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button onClick={onSignInClicked}>Sign In</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
