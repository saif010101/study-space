import { Button } from "#components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#components/ui/card"

import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";

function App() {
  return (
    <Card className="grow-1 max-w-[480px] justify-center border-2 max-[479px]:h-screen [--card-spacing:--spacing(10)]">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          We are so excited to see you again! Please enter your details to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="text"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <span className="self-start">Need an account? Register</span>
      </CardFooter>
    </Card>
  )
}



export default App;
