
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://zvfxbbsucbuvlmggkhgu.supabase.co';

// Replace this placeholder with your Supabase publishable key.
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_otXlcqkiRXK344Nosn7ufQ_c90bMTGH';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
