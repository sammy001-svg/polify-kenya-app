-- Allow users to delete their own policy ideas
DROP POLICY IF EXISTS "Users can delete own ideas" ON public.policy_ideas;
CREATE POLICY "Users can delete own ideas" ON public.policy_ideas FOR DELETE USING (auth.uid() = user_id);
