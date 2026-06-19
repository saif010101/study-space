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
import zod from "zod";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "#components/ui/field";
import { useState } from "react";
import {registerErrorMessages} from "../utils/registerErrorMessages.ts";


const initialErrorMapState = new Map([
  ["username", true],
  ["display_name", true],
  ["email", true],
  ["password", true],
]);

const Register = () => {
  const [validationMap, setValidationMap] = useState(initialErrorMapState);

  const formDataSchema = zod.object({
    username: zod
      .string()
      .toLowerCase()
      .regex(/^[a-z0-9]{5,20}$/),
    display_name: zod
      .string()
      .toLowerCase()
      .regex(/^[a-z]{5,50}$/),
    email: zod
      .string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/),
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const data = Object.fromEntries(formData.entries());
    const result = formDataSchema.safeParse(data);
    console.log(result.error)
    const newValidationMap = new Map<string, boolean>(initialErrorMapState);
    if (result.error) {
      for (let i = 0; i < result.error.issues.length; i++) {
          const issue = result.error.issues[i];
          const key = issue.path[0] as string;
          newValidationMap.set(key,false);
      }
    }
    setValidationMap(newValidationMap);
  };

  return (
    <Card className="grow-1 max-w-[480px] justify-center border-1b max-[479px]:h-screen [--card-spacing:--spacing(10)]">
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
                    {errorMessages.get('email')}
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
                {!validationMap.get('display_name') && <FieldDescription className="text-red-500">{errorMessages.get('display_name')}</FieldDescription>}
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  required
                  aria-invalid={!validationMap.get('username')}
                />
                {!validationMap.get('username') && <FieldDescription className="text-red-500">{errorMessages.get('username')}</FieldDescription>}
              </Field>
              <Field className="grid gap-2">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  aria-invalid={!validationMap.get('password')}
                />
                {!validationMap.get('password') && <FieldDescription className="text-red-500">{errorMessages.get('password')}</FieldDescription>}
              </Field>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="register-form" type="submit" className="w-full">
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
