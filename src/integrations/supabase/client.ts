import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Manual Override: Connecting BudRunner directly to your vxwbbr project
const SUPABASE_URL = "https://vxwbbrjfyrjldtakuqag.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4d2JicmpmeXJqbGR0YWt1cWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4OTc5NDAsImV4cCI6MjA4NzQ3Mzk0MH0.Ry4WkvR2dMtgq5U8ngQjsc1-bdyBwKnBhDwO_LI-3nU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Import the supabase client like this in other files:
// import { supabase } from "@/integrations/supabase/client";