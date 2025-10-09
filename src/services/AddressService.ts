import { supabase } from "../supabase/supabase";

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAddressData {
  full_name: string;
  phone_number: string;
  address_line1: string;
  address_line2?: string;
  latitude?: number;
  longitude?: number;
  is_default?: boolean;
}

export interface UpdateAddressData {
  full_name?: string;
  phone_number?: string;
  address_line1?: string;
  address_line2?: string;
  latitude?: number;
  longitude?: number;
  is_default?: boolean;
}

export class AddressService {
  /**
   * Get all addresses for the current user
   */
  static async getUserAddresses(): Promise<Address[]> {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching addresses:", error);
      throw new Error("Failed to fetch addresses");
    }

    return data || [];
  }

  /**
   * Get the default address for the current user
   */
  static async getDefaultAddress(): Promise<Address | null> {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("is_default", true)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No default address found
        return null;
      }
      console.error("Error fetching default address:", error);
      throw new Error("Failed to fetch default address");
    }

    return data;
  }

  /**
   * Create a new address
   */
  static async createAddress(addressData: CreateAddressData): Promise<Address> {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // If this is set as default, unset other default addresses
    if (addressData.is_default) {
      await this.unsetDefaultAddresses();
    }

    // Include user_id in the insert
    const addressWithUserId = {
      ...addressData,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("addresses")
      .insert([addressWithUserId])
      .select()
      .single();

    if (error) {
      console.error("Error creating address:", error);
      throw new Error("Failed to create address");
    }

    return data;
  }

  /**
   * Update an existing address
   */
  static async updateAddress(
    addressId: string,
    updateData: UpdateAddressData
  ): Promise<Address> {
    // If this is set as default, unset other default addresses
    if (updateData.is_default) {
      await this.unsetDefaultAddresses();
    }

    const { data, error } = await supabase
      .from("addresses")
      .update(updateData)
      .eq("id", addressId)
      .select()
      .single();

    if (error) {
      console.error("Error updating address:", error);
      throw new Error("Failed to update address");
    }

    return data;
  }

  /**
   * Delete an address
   */
  static async deleteAddress(addressId: string): Promise<void> {
    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", addressId);

    if (error) {
      console.error("Error deleting address:", error);
      throw new Error("Failed to delete address");
    }
  }

  /**
   * Set an address as default
   */
  static async setDefaultAddress(addressId: string): Promise<Address> {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    // First unset all default addresses
    await this.unsetDefaultAddresses();

    // Then set the specified address as default
    const { data, error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId)
      .eq("user_id", user.id) // Ensure user can only set their own addresses as default
      .select()
      .single();

    if (error) {
      console.error("Error setting default address:", error);
      throw new Error("Failed to set default address");
    }

    return data;
  }

  /**
   * Unset all default addresses for the current user
   */
  private static async unsetDefaultAddresses(): Promise<void> {
    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id)
      .eq("is_default", true);

    if (error) {
      console.error("Error unsetting default addresses:", error);
      throw new Error("Failed to unset default addresses");
    }
  }

  /**
   * Validate address data (MVP - Two line address validation)
   */
  static validateAddress(addressData: CreateAddressData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!addressData.full_name?.trim()) {
      errors.push("Full name is required");
    }

    if (!addressData.phone_number?.trim()) {
      errors.push("Phone number is required");
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(addressData.phone_number)) {
      errors.push("Please enter a valid phone number");
    }

    if (!addressData.address_line1?.trim()) {
      errors.push("Address line 1 is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
