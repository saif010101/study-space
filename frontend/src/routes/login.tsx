import { Button } from "#components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#components/ui/card";
import { Input } from "#components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field";
import { Link, createFileRoute } from "@tanstack/react-router";
import {useMutation} from "@tanstack/react-query";
import {UserAPIService} from "../services/UserAPIService.ts";
import type {LoginFormData} from "../types/LoginFormData.ts";
import {useState} from "react";

export const Login = () => {

  // const [userInvalid,isUserInvalid] = useState(false)

  const loginMutation = useMutation({
    mutationFn: (userData: LoginFormData) => UserAPIService.loginUser(userData)
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries()) as LoginFormData;
    loginMutation.mutate(data);
  };


  return (
    <Card className="grow max-w-[480px] justify-center border-1b max-[479px]:h-screen [--card-spacing:--spacing(10)]">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          We are so excited to see you again! Please enter your details to sign
          in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleFormSubmit}>
          <FieldGroup>
          <div className="flex flex-col gap-6">
            <Field className="grid gap-2">
              <FieldLabel htmlFor="email">Username</FieldLabel>
              <Input id="email" type="text" required aria-invalid={loginMutation.isError} />
              {loginMutation.isError && <FieldDescription className="text-red-500">Invalid username or password</FieldDescription>}
            </Field>
            <Field className="grid gap-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required aria-invalid={loginMutation.isError} />
              {loginMutation.isError && <FieldDescription className="text-red-500">Invalid username or password</FieldDescription>}
            </Field>
          </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="login-form" className="w-full">
          Login
        </Button>
        <div className="self-start">
          <span className="self-start">Need an account? </span>
          <Link to="/register" className="underline">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Route = createFileRoute("/login")({
  component: Login,
});
