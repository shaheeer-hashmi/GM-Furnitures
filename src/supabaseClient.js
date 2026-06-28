import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fvrdayggilkttxdpagsd.supabase.co'
const supabaseKey = 'sb_publishable__-ujtm3wjwTZOl_nIx9SzQ_uBgegTiF'

export const supabase = createClient(supabaseUrl, supabaseKey)