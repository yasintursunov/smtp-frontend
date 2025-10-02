'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
      setMsg(typeof res === 'string' ? res : res.message || 'Registered. Check your email to confirm.');
    } catch (e:any) {
      setMsg(e.message || 'Failed');
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
     
      <div className="flex flex-col">
        <div className="px-10 pt-10">
          <div className="text-2xl font-bold tracking-wider">THE APP</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md px-10">
            <div className="mb-8">
              <div className="text-sm text-slate-500">Create your account</div>
              <h1 className="text-2xl font-semibold">Sign Up to The App</h1>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              {msg && <div className="rounded-md bg-blue-50 p-2 text-sm text-blue-700">{msg}</div>}
              <label className="block">
                <div className="mb-1 text-sm">Name</div>
                <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" required />
              </label>
              <label className="block">
                <div className="mb-1 text-sm">E-mail</div>
                <div className="input-icon">
                  <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="test@example.com" required />
                  <span className="right-icon"><Icon name="mail" /></span>
                </div>
              </label>
              <label className="block">
                <div className="mb-1 text-sm">Password</div>
                <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
              </label>
              <button className="btn btn-primary w-full" type="submit">Create account</button>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <div>Already have an account? <Link href="/login" className="underline">Sign in</Link></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    
      <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpeg')" }} />
    </div>
  );
}
