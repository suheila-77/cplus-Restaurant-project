import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import cplusLogo from "@/assets/logo-without-text.png";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn } = useAuth();
  const navigate = useNavigate();

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSignIn = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    await signIn(values.email, values.password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img src={cplusLogo} alt="C+" className="h-20 w-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Admin Access</h1>
          <p className="text-muted-foreground mt-2">TASTE PLUS</p>
        </div>

        <Card className="backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="admin@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Need an account? Contact your administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
