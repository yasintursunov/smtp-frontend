'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function ForgotPasswordPage(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string|nil>(null as any);

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();
    setMsg(null as any);
    try{
      await api('/api/auth/password/forgot',{method:'POST', body: JSON.stringify({ email })});
      setMsg('If this e-mail exists, we sent a reset link.');
    }catch(e:any){
      setMsg(e.message||'Failed');
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col">
        <div className="px-10 pt-10"><div className="text-2xl font-bold tracking-wider">THE APP</div></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-10">
            <h1 className="mb-6 text-2xl font-semibold">Forgot password</h1>
            {msg && <div className="mb-4 rounded-md bg-blue-50 p-2 text-sm text-blue-700">{msg}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
              <label className="block">
                <div className="mb-1 text-sm">E-mail</div>
                <div className="input-icon">
                  <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                  <span className="right-icon"><Icon name="mail" /></span>
                </div>
              </label>
              <button className="btn btn-primary w-full" type="submit">Send reset link</button>
              <div className="text-sm text-slate-600"><Link href="/login" className="underline">Back to login</Link></div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }} />
    </div>
  );
}
