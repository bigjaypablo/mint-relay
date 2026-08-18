import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrjndrluwoheebxbrkoa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yfPn_16DntXGtLqjttJxkg_9wfQULf_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
