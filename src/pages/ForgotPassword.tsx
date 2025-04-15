
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormData = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = React.useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // In a real app, this would be an API call to trigger password reset
    setTimeout(() => {
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for instructions to reset your password.",
      });
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-10">
        <div className="glass-card w-full max-w-md p-6">
          {submitted ? (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Check your email</h1>
              <p className="mb-6">
                We sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                If you don't see the email, check your spam folder or try again.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => setSubmitted(false)} 
                  variant="outline"
                  className="w-full"
                >
                  Try again
                </Button>
                <Link to="/login">
                  <Button variant="ghost" className="w-full">
                    Back to login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Forgot password</h1>
              <p className="text-center text-muted-foreground mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-job-blue to-job-light-blue hover:from-job-blue/90 hover:to-job-light-blue/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Sending email..." : "Send reset link"}
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center">
                <Link to="/login" className="text-job-blue hover:underline">
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
