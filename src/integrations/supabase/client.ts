import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://tqtrgmwhsxsuekddfzdb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxdHJnbXdoc3hzdWVrZGRmemRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMjU3NDAsImV4cCI6MjA0NzgwMTc0MH0.1ZQXoG0PWRDuSmNlxmNFlNyY1R0obYbmqIVzQXWrEiw";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);