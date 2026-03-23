"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

/**
 * USER MANAGEMENT ACTIONS
 */

export async function verifyUser(userId: string) {
  const supabase = await createClient();
  
  // Verify Admin (Double check)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  const { error } = await supabase
    .from('profiles')
    .update({ is_verified: true })
    .eq('id', userId);

  if (error) return { error: error.message };
  revalidatePath('/admin/users');
  return { success: true };
}

export async function banUser(userId: string) {
  const supabase = await createClient();
  
  // Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  // For now, we'll just set a 'banned' flag if it exists, or maybe delete implementation
  // Adjusting to update role to 'banned' if supported, or just deleting.
  // Let's assume we want to preserve data but lock access.
  // Since we don't have a 'banned' boolean, let's use Metadata or a specialized role?
  // Let's set role to 'banned' (schema doesn't enforce enum strictness usually).
  
  const { error } = await supabase
    .from('profiles')
    .update({ role: 'banned' })
    .eq('id', userId);

  if (error) return { error: error.message };
  revalidatePath('/admin/users');
  return { success: true };
}

export async function adminResetPassword(email: string) {
  const supabase = await createClient();
  
  // Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  // Generate password reset link and send via email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function adminDeleteUser(userId: string) {
  const supabase = await createClient();
  
  // Verify Admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  // Delete from profiles (Cascade should handle related data if configured, or delete manually)
  // Note: auth.admin.deleteUser requires service_role key which shouldn't be in supabase-server for client ops
  // However, if we're using a standard client, we can only delete the profile.
  // To delete from auth.users, we typically need a management API or service role.
  // For this implementation, we'll focus on deleting the profile and marking for deletion.
  
  const { error: profileError } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (profileError) return { error: profileError.message };
  
  revalidatePath('/admin/users');
  return { success: true };
}

/**
 * PETITION MANAGEMENT ACTIONS
 */

export async function updatePetitionStatus(petitionId: string, status: 'active' | 'closed' | 'victory') {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  const { error } = await supabase
    .from('petitions')
    .update({ status })
    .eq('id', petitionId);

  if (error) return { error: error.message };
  revalidatePath('/admin/petitions');
  return { success: true };
}

export async function deletePetition(petitionId: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };
  const { data: adminProfile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (adminProfile?.role !== 'admin') return { error: "Unauthorized" };

  const { error } = await supabase
    .from('petitions')
    .delete()
    .eq('id', petitionId);

  if (error) return { error: error.message };
  revalidatePath('/admin/petitions');
  return { success: true };
}
