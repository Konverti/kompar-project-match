-- Create table for quiz analytics
CREATE TABLE public.quiz_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  step_number integer NOT NULL,
  step_name text NOT NULL,
  timestamp timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_analytics ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert analytics data
CREATE POLICY "Anyone can insert quiz analytics"
ON public.quiz_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy to allow authenticated users to read analytics
CREATE POLICY "Authenticated users can view quiz analytics"
ON public.quiz_analytics
FOR SELECT
TO authenticated
USING (true);

-- Create index for better query performance
CREATE INDEX idx_quiz_analytics_timestamp ON public.quiz_analytics(timestamp);
CREATE INDEX idx_quiz_analytics_session_id ON public.quiz_analytics(session_id);