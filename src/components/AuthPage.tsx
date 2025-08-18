import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Sign in failed",
        description: error?.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const { fullName, email, password } = data;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullName },
        },
      });
      if (error) throw error;
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
      setMode("login");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Sign up failed",
        description: error?.message || "There was an error creating your account. Please try again.",
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