/**
 * Automates the creation of a user profile in the public schema.
 *
 * This script sets up a PostgreSQL trigger and function to synchronize new user
 * sign-ups from Supabase's `auth.users` table to a public-facing
 * `public.user_profiles` table. This ensures that every authenticated user
 * has a corresponding profile record from the moment they are created.
 *
 * https://supabase.com/docs/guides/auth/managing-user-data
 */

import postgres from "postgres";
import "dotenv/config";

// --- Database Connection Setup ---
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
	throw new Error("Couldn't find db url. Please check your .env file.");
}
const sql = postgres(dbUrl);

// --- Main Seeding Function ---
async function main() {
	console.log("--- Running Full Database Seeding and Configuration ---");

	// STEP 1: Create/Update the function to sync new users to the profiles table
	// This function is the most critical part. It now includes the fix for the
	// "null username" error by using COALESCE as a fallback.
	console.log("1. Creating/Updating function `public.handle_new_user`...");
	await sql`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.user_profiles (
        id,
        username,
        email,
        phone,
        "firstName", 
        "lastName",
        "createdAt",
        "updatedAt"   
      )
      VALUES (
        new.id,
        -- FIX: Use COALESCE to provide a fallback (email) if username is null,
        -- preventing the not-null constraint violation.
        COALESCE(new.raw_user_meta_data ->> 'username', new.email),
        new.email,
        -- Use NULLIF to store NULL instead of an empty string for optional fields.
        NULLIF(new.raw_user_meta_data ->> 'phone', ''),
        new.raw_user_meta_data ->> 'first_name',
        new.raw_user_meta_data ->> 'last_name',
        NOW(),
        NOW()
      );
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
	console.log("   -> Function `handle_new_user` updated successfully.");

	// STEP 2: Create the trigger that calls the function after a new user signs up
	console.log("2. Dropping existing `on_auth_user_created` trigger to ensure a clean slate...");
	await sql`DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`;

	console.log("3. Creating new `on_auth_user_created` trigger...");
	await sql`
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  `;
	console.log("   -> Trigger `on_auth_user_created` created successfully.");

	// STEP 3: Set up the foreign key for automatic cascade deletion
	console.log("4. Cleaning up any orphaned user profiles before adding constraint...");
	// This prevents errors if a user was deleted from auth but their profile remains.
	await sql`DELETE FROM public.user_profiles WHERE id NOT IN (SELECT id FROM auth.users);`;

	console.log("5. Dropping existing foreign key `fk_user_id` to ensure re-runnability...");
	await sql`
    ALTER TABLE public.user_profiles
    DROP CONSTRAINT IF EXISTS fk_user_id;
  `;

	console.log("6. Creating foreign key `fk_user_id` with ON DELETE CASCADE...");
	// This ensures that if a user is deleted from auth.users, their profile is also deleted.
	await sql`
    ALTER TABLE public.user_profiles
    ADD CONSTRAINT fk_user_id
    FOREIGN KEY (id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE;
  `;
	console.log("   -> Foreign key `fk_user_id` created successfully.");

	console.log("✅ Database setup is complete. You can now try signing up.");
	process.exit();
}

// --- Script Execution ---
main().catch((err) => {
	console.error("❌ An error occurred during script execution:", err);
	process.exit(1);
});
