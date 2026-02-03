-- Add Foreign Key to allow joining with profiles
ALTER TABLE public.user_progress
ADD CONSTRAINT user_progress_user_id_fkey_profiles
FOREIGN KEY (user_id)
REFERENCES public.profiles(id);

-- Update RLS to allow public read access (for leaderboard)
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;

CREATE POLICY "Public read access for leaderboard"
ON public.user_progress
FOR SELECT
USING (true);
