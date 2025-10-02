'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Icon from '@/components/Icon';

type Me = { id:number; name:string; email:string; status:string; role:string };

export default function Home(){
  const [me, setMe] = useState<Me | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(()=>{
    api('/api/me').then(setMe).catch(e=>setErr(e.message||'Error'));
  },[]);

  async function logout(){ await api('/api/auth/logout',{method:'POST'}); window.location.href='/login'; }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      <div className="flex flex-col">
        <div className="px-10 pt-10 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-wider">THE APP</div>
          <button onClick={logout} className="btn btn-ghost">
            <Icon name="log-out" /> Logout
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-10">
            <h1 className="mb-6 text-2xl font-semibold">My Profile</h1>
            {err && <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">{err}</div>}
            {!me ? <div>Loading…</div> : (
              <div className="space-y-4">
                <div><div className="text-sm text-slate-500">Name</div><div className="font-medium">{me.name}</div></div>
                <div><div className="text-sm text-slate-500">Email</div><div className="font-medium">{me.email}</div></div>
                <div><div className="text-sm text-slate-500">Status</div><div className="font-medium capitalize">{me.status}</div></div>
                <div><div className="text-sm text-slate-500">Role</div><div className="font-medium">{me.role}</div></div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }} />
    </div>
  );
}
