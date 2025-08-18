import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";

interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Supabase login
      console.log("Login attempt:", { email: data.email, rememberMe: data.rememberMe });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
      
      // TODO: Redirect to main app
      console.log("Login successful - redirect to main app");
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual Supabase signup
      console.log("Signup attempt:", { 
        fullName: data.fullName, 
        email: data.email,
        acceptTerms: data.acceptTerms 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
      
      // Switch to login mode after successful signup
      setMode("login");
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="animate-slide-up">
        {mode === "login" ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setMode("signup")}
            isLoading={isLoading}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={() => setMode("login")}
            isLoading={isLoading}
          />
        )}
      </div>
    </AuthLayout>
  );
};