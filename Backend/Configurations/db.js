const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const client = createClient(supabaseUrl,supabaseKey);
console.log("supabase client initialized successfully");

module.exports = client;