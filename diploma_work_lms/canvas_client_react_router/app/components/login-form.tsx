import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Form, useActionData, useNavigate, useRevalidator } from "react-router";
import { useState } from "react";
import pb from "app/routes/auth/pocketbase";
import { Info } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [errormsg, setErrormsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      if (pb.authStore.record.role == "teacher") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrormsg(error.toString());
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Bejelentkezés</CardTitle>
          <CardDescription>Írd be az email-ed és a jelszavad</CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="identity"
                  type="email"
                  placeholder="neptunkód@inf.elte.hu"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Jelszó</Label>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Bejelentkezés
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <Info className="inline-block mr-1 w-4 h-4" />
              Csak az adminisztrátor tud fiókot létrehozni. Ha nincs fiókja vagy
              nem tud bejelentkezni, forduljon az{" "}
              <a
                href="http://qter.elte.hu/"
                target="_blank"
                className="text-blue-700"
              >
                Oktatási Igazgatósághoz.
              </a>
              <p className="text-red-600 text-2xl">
                {errormsg ? "Sikertelen bejelentkezés" : ""}
              </p>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
