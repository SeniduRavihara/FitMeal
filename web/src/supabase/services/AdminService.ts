import { client } from "../supabase";

export class AdminService {
  /**
   * Check if the current user has admin privileges
   */
  static async isAdmin(): Promise<boolean> {
    try {
      const { data, error } = await client.rpc("is_admin");

      if (error) {
        console.error("Error checking admin status:", error);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  }

  /**
   * Get user profile with role information
   */
  static async getUserProfile(userId: string) {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return { data: null, error };
    }
  }

  /**
   * Update user role (admin only)
   */
  static async updateUserRole(
    userId: string,
    role: "user" | "admin" | "moderator" | "super_admin"
  ) {
    try {
      const { data, error } = await client
        .from("profiles")
        .update({ role, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating user role:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error updating user role:", error);
      return { data: null, error };
    }
  }

  /**
   * Get all users (admin only)
   */
  static async getAllUsers() {
    try {
      const { data, error } = await client
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error fetching users:", error);
      return { data: null, error };
    }
  }
}
