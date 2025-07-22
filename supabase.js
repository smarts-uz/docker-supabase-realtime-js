const { RealtimeClient } = require('@supabase/realtime-js')

const client = new RealtimeClient('ws://localhost:4000/socket', {
  params: {
    apikey: 'super-secret-jwt',
  },
})

console.log('[🚀] Connecting to Realtime...')

client.connect()

const channel = client.channel('realtime:public:system_notification')

channel
  .on('postgres_changes', { event: '*', schema: 'public', table: 'system_notification' }, (payload) => {
    console.log('[📥] Received change:', payload)
  })
  .subscribe((status) => {
    console.log('[ℹ️] Channel status:', status)
  })
