
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
}).refine(
  (data) => {
    // If any password field is filled, all should be filled
    if (data.currentPassword || data.newPassword || data.confirmNewPassword) {
      return !!data.currentPassword && !!data.newPassword && !!data.confirmNewPassword;
    }
    return true;
  },
  {
    message: "All password fields are required to change your password",
    path: ["newPassword"],
  }
).refine(
  (data) => {
    // If setting new password, check they match
    if (data.newPassword && data.confirmNewPassword) {
      return data.newPassword === data.confirmNewPassword;
    }
    return true;
  },
  {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  }
);

type FormData = z.infer<typeof formSchema>;

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; avatar?: string } | null>>;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser, onLogout }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // In a real app, this would be an API call
    // For now, we'll simulate updating the profile
    setTimeout(() => {
      const updatedUser = {
        ...user!,
        name: data.name,
        email: data.email,
      };
      
      localStorage.setItem("nijobhunter-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
      
      // Reset password fields
      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }, 1000);
  };
  
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col ai-gradient-bg">
      <Header user={user} onLogout={onLogout} />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-job-blue to-job-light-blue text-white text-4xl">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Button className="mt-4" variant="outline">
                  Upload Photo
                </Button>
              </CardContent>
            </Card>
            
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/saved-jobs")}>
                  Saved Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500" onClick={onLogout}>
                  Log out
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-job-blue to-job-light-blue hover:from-job-blue/90 hover:to-job-light-blue/90"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Saving changes..." : "Save changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
