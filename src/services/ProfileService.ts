import { supabase } from "../supabase/supabase";

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export class ProfileService {
  /**
   * Get current user's profile
   */
  static async getCurrentProfile(): Promise<Profile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data;
  }

  /**
   * Update current user's profile
   */
  static async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .select()
      .single();

    if (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile");
    }

    return data;
  }

  /**
   * Create address from profile data (for first-time users)
   */
  static async createAddressFromProfile(): Promise<void> {
    const profile = await this.getCurrentProfile();

    if (!profile || !profile.full_name || !profile.phone || !profile.address) {
      return; // Profile doesn't have complete address data
    }

    // Check if user already has addresses
    const { data: existingAddresses } = await supabase
      .from("addresses")
      .select("id")
      .limit(1);

    if (existingAddresses && existingAddresses.length > 0) {
      return; // User already has addresses
    }

    // Create address from profile data (put full address in line 1)
    await supabase.from("addresses").insert([
      {
        full_name: profile.full_name,
        phone_number: profile.phone,
        address_line1: profile.address,
        is_default: true,
      },
    ]);
  }
}
