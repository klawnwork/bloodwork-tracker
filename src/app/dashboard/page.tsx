import { getSupabaseServer } from '@/lib/supabase-server' //New import for async cached client
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  let session = null;
  try {
    const supabase = await getSupabaseServer(); //Aw/Await the cached helper to init client
    const { data } = await supabase.auth.getSession()
    session = data.session;
  } catch (error) {
    console.error('Session fetch error:', error);
    redirect('/login'); //Fallback redirect on failure
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Dashboard</h2>
        <p>Welcome, {session.user.email}</p>
        {/*Upload form will go here in the next step */}
      </div>
    </div>
  )
}