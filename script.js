const WebSocket = require("ws");

const SUPABASE_PROJECT_ID = "duiziaafqnukalllcpoh";
const SUPABASE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1aXppYWFmcW51a2FsbGxjcG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDgwNjIsImV4cCI6MjA2ODgyNDA2Mn0.hX7xtMXsszQQHhl-eNoNeHcY0A1-ue-qjyamJgES9Cc";
const TABLE = "test";
const SCHEMA = "public";

const SUPABASE_REALTIME_URL = `wss://${SUPABASE_PROJECT_ID}.supabase.co/realtime/v1/websocket?apikey=${SUPABASE_JWT}`;

const ws = new WebSocket(SUPABASE_REALTIME_URL);

ws.on("open", () => {
  console.log("[✅] Connected to Supabase Realtime");

  const joinMessage = {
    topic: `realtime:${SCHEMA}.${TABLE}`,
    event: "phx_join",
    payload: {
      config: {
        broadcast: { self: false },
        postgres_changes: [
          {
            event: "*",
            schema: SCHEMA,
            table: TABLE,
          },
        ],
      },
      user_token: SUPABASE_JWT,
    },
    ref: "1",
  };

  ws.send(JSON.stringify(joinMessage));
  console.log(`[📡] Subscribed to realtime:${SCHEMA}.${TABLE}`);
});

ws.on("message", (data) => {
  try {
    const message = JSON.parse(data);
    if (message.event === "postgres_changes") {
      const record = message.payload?.data?.record;
      console.log("[🔄] Record:", JSON.stringify(record, null, 2));
    }
  } catch (error) {
    console.error("[❌] Error parsing message:", error);
  }
});

ws.on("error", (error) => {
  console.error("[❌] WebSocket error:", error);
});

ws.on("close", () => {
  console.log("[⚠️] WebSocket connection closed.");
});
