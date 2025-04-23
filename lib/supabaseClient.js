const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://owosaaahwgoenuvxotoi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93b3NhYWFod2dvZW51dnhvdG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNTg2MTYsImV4cCI6MjA2MDczNDYxNn0.1V-1Y3ELNUOdl6FB9Rt6XkNw_wZoLGJ900aW41CYxZk';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;