const { RealtimeClient } = require('@supabase/realtime-js')

const client = new RealtimeClient('wss://nagcsbpmekppolegnisf.supabase.co/realtime/v1/websocket?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZ2NzYnBtZWtwcG9sZWduaXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Mzg5NjcsImV4cCI6MjA2NDAxNDk2N30.L2hUdOf2VZdyTDRisU9vgo3g_ThsYNsREsu0IWKO6Qw&vsn=1.0.0', {
  
})

console.log('[🚀] Connecting to Realtime...')

client.connect()

const channel = client.channel('realtime:public:system_notification')

channel
  .on('postgres_changes', { event: '*', schema: 'public', table: 'system_notification' }, (payload) => {
    console.log('[📥] Received change:', payload)
  })
  .on('error', (error) => {
    console.error('[❌] Channel error:', error)
  })
  .subscribe((status, err) => {
    console.log('[ℹ️] Channel status:', status, err)
  })
