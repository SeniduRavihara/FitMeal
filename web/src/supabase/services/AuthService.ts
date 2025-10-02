import { client } from "../supabase";

export class AuthService{
    static async signUp(email: string, password: string, name: string){
        const { data, error } = await client.auth.signUp({
            email,
            password,
            options: { data: { name } }
        });
        return { data, error };
    }

    static async signIn(email: string, password: string){
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    }

    static async signOut(){
        const { error } = await client.auth.signOut();
        return { error };
    }
}