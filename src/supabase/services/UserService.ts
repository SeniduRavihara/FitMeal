import { supabase } from "../supabase";

export class UserService {
  static async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  }

  // User Profile
  static async createUserProfile(userId: string, profile: any) {
    const { data, error } = await supabase
      .from("profiles")
      .insert([{ id: userId, ...profile }])
      .select()
      .single();
    return { data, error };
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    return { data, error };
  }

  static async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    return { data, error };
  }


}
