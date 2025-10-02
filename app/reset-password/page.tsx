'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function ResetPasswordPage(){
  const sp = useSearchParams();
  const token = sp.get('token') || '';
  const [valid, setValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string|null>(null);

  useEffect(()=>{
    api('/api/auth/password/reset/verify?token='+encodeURIComponent(token))
      .then((r)=>{ setValid(r.valid); })
      .catch(()=> setValid(false));
  },[token]);

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setMsg(null);
    try{
      await api('/api/auth/password/reset', { method:'POST', body: JSON.stringify({ token, password }) });
      setMsg('Password changed. You can log in now.');
      setTimeout(()=>{ window.location.href='/login'; }, 1200);
    }catch(e:any){
      setMsg(e.message || 'Failed');
    }
  }

  if(!token) return <div className="p-6">Invalid token</div>;
  if(valid === null) return <div className="p-6">Checking token…</div>;
  if(valid === false) return <div className="p-6">Reset link is invalid or expired.</div>;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col">
        <div className="px-10 pt-10"><div className="text-2xl font-bold tracking-wider">THE APP</div></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-10">
            <h1 className="mb-6 text-2xl font-semibold">Set a new password</h1>
            {msg && <div className="mb-4 rounded-md bg-blue-50 p-2 text-sm text-blue-700">{msg}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <div className="mb-1 text-sm">New password</div>
                <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
              </label>
              <button className="btn btn-primary w-full" type="submit">Change password</button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }} />
    </div>
  );
}
