const { createClient } = require('@supabase/supabase-js');

const SUPABASE_PROJECT_ID = "duiziaafqnukalllcpoh";
const SUPABASE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aXppYWFmcW51a2FsbGxjcG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDgwNjIsImV4cCI6MjA2ODgyNDA2Mn0.hX7xtMXsszQQHhl-eNoNeHcY0A1-ue-qjyamJgES9Cc";
const TABLE = "test";
const SCHEMA = "public";

const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const SUPABASE_KEY = SUPABASE_JWT;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('[🚀] Connecting to Supabase Realtime...');

supabase.channel(`public:${TABLE}`)
  .on(
    'postgres_changes',
    { event: '*', schema: SCHEMA, table: TABLE },
    (payload) => {
      const record = payload.new || payload.record || payload;
      console.log('[🔄] Record:', JSON.stringify(record, null, 2));
    }
  )
  .subscribe((status, err) => {
    console.log('[ℹ️] Channel status:', status, err);
  });
