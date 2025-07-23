const { RealtimeClient } = require('@supabase/realtime-js');

const SUPABASE_PROJECT_ID = "duiziaafqnukalllcpoh";
const SUPABASE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aXppYWFmcW51a2FsbGxjcG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDgwNjIsImV4cCI6MjA2ODgyNDA2Mn0.hX7xtMXsszQQHhl-eNoNeHcY0A1-ue-qjyamJgES9Cc";
const TABLE = "test";
const SCHEMA = "public";

const SUPABASE_REALTIME_URL = `wss://${SUPABASE_PROJECT_ID}.supabase.co/realtime/v1/websocket?apikey=${SUPABASE_JWT}`;

const client = new RealtimeClient(SUPABASE_REALTIME_URL, {
  params: { apikey: SUPABASE_JWT }
});

console.log('[🚀] Connecting to Supabase Realtime...');

client.connect();

const channel = client.channel(`realtime:${SCHEMA}.${TABLE}`);

channel
  .on(
    'postgres_changes',
    { event: '*', schema: SCHEMA, table: TABLE },
    (payload) => {
      const record = payload.new || payload.record || payload;
      console.log('[🔄] Record:', JSON.stringify(record, null, 2));
    }
  )
  .on('error', (error) => {
    console.error('[❌] Channel error:', error);
  })
  .subscribe((status, err) => {
    console.log('[ℹ️] Channel status:', status, err);
  });
