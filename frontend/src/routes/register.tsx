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
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field";
import { useState } from "react";
import {registerErrorMessages} from "../utils/registerErrorMessages.ts";
import { registerFormSchema } from "../schemas/registerFormSchema.ts";
import {useMutation} from "@tanstack/react-query";
import {UserAPIService} from "../services/UserAPIService.ts";
import type {RegisterFormData} from "../types/RegisterFormData.ts";
import {Spinner} from "#components/ui/spinner";

const initialErrorMapState = new Map([
  ["username", true],
  ["display_name", true],
  ["email", true],
  ["password", true],
]);


const Register = () => {
  const [usernameTaken,setUsernameTaken] = useState(false);
  const [validationMap, setValidationMap] = useState(initialErrorMapState);
  const registerMutation = useMutation({
    mutationFn: (userData: RegisterFormData) => UserAPIService.registerUser(userData)
  });

  const usernameMutation = useMutation({
    mutationFn: (username : string) => UserAPIService.getUser(username),
    onSuccess: () => {
        setUsernameTaken(true);
    },
    onError: () => {
      setUsernameTaken(false);
    }
  });


  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data : RegisterFormData = Object.fromEntries(formData.entries()) as RegisterFormData;
    const result = registerFormSchema.safeParse(data);
    const newValidationMap = new Map<string, boolean>(initialErrorMapState);
    if (result.error) {
      for (let i = 0; i < result.error.issues.length; i++) {
          const issue = result.error.issues[i];
          const key = issue.path[0] as string;
          newValidationMap.set(key,false);
      }
    }
    setValidationMap(newValidationMap);

    if (result.success) {
      registerMutation.mutate(data);
    }
  };

  const handleUsernameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    const usernameSchema = registerFormSchema.shape.username;
    const newValidationMap = new Map<string, boolean>(validationMap);
    if (usernameSchema.safeParse(username).error) {
        newValidationMap.set('username',false);
        setValidationMap(newValidationMap);
        return;
    } else {
      newValidationMap.set('username',true);
      setValidationMap(newValidationMap);
    }
    usernameMutation.mutate(username);
  }

  return (
    <Card className="grow max-w-[480px] justify-center border-1b max-[479px]:h-screen [--card-spacing:--spacing(10)]">
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Please enter your details to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleFormSubmit}>
          <FieldGroup>
            <div className="flex flex-col gap-6">
              <Field className="grid gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  aria-invalid={!validationMap.get('email')}
                />
                {!validationMap.get('email') && (
                  <FieldDescription className="text-red-500">
                    {registerErrorMessages.get('email')}
                  </FieldDescription>
                )}
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="display-name">Display Name</FieldLabel>
                <Input
                  id="display-name"
                  type="text"
                  name="display_name"
                  required
                  aria-invalid={!validationMap.get('display_name')}
                />
                {!validationMap.get('display_name') && <FieldDescription className="text-red-500">{registerErrorMessages.get('display_name')}</FieldDescription>}

              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  required
                  aria-invalid={!validationMap.get('username')}
                  onChange={handleUsernameChange}
                />
                {!validationMap.get('username') && <FieldDescription className="text-red-500">{registerErrorMessages.get('username')}</FieldDescription>}
                {validationMap.get('username') && usernameMutation.isPending && <FieldDescription >Checking username... </FieldDescription>}
                {validationMap.get('username') && !usernameMutation.isPending && usernameTaken && <FieldDescription className="text-red-500">Username already taken.</FieldDescription>}

              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"text-red-500
                  type="password"
                  name="password"
                  required
                  aria-invalid={!validationMap.get('password')}
                />
                {!validationMap.get('password') && <FieldDescription className="text-red-500">{registerErrorMessages.get('password')}</FieldDescription>}
              </Field>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="register-form" type="submit" className="w-full">
          {registerMutation.isPending && <Spinner className="size-6" />}
          Register
        </Button>
        <div className="self-start">
          <span className="self-start">Already have an account? </span>
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export const Route = createFileRoute("/register")({
  component: Register,
});
