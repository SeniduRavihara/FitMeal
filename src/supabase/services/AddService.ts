import { supabase } from "../supabase";

export class AddService {
  // Add
  static async getCarouselItem() {
    const { data, error } = await supabase.from("carousel_items").select("*");
    return { data, error };
  }
}
