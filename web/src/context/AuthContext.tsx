"use client";

import { AuthService } from "@/supabase/services/AuthService";
import { client } from "@/supabase/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

type UserRole = "user" | "admin" | "moderator" | "super_admin";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ data: any; error: any }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === "admin" || profile?.role === "super_admin";

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setProfile(null);
        return;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setProfile(null);
    }
  };

  useEffect(() => {
    client.auth.getSession().then(async ({ data }) => {
      console.log(
        "Web Auth: Initial session restored:",
        data?.session?.user?.email
      );
      setUser(data?.session?.user || null);
      setSession(data?.session || null);

      if (data?.session?.user) {
        await fetchUserProfile(data.session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email);
      setUser(session?.user || null);
      setSession(session);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await AuthService.signUp(email, password, name);
    return { data, error };
  };
  const signIn = async (email: string, password: string) => {
    const { data, error } = await AuthService.signIn(email, password);
    return { data, error };
  };
  const signOut = async () => {
    const { error } = await AuthService.signOut();
    return { error };
  };

  const value = {
    user,
    session,
    profile,
    loading,
    isAdmin,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
