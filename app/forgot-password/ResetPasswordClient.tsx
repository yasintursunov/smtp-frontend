'use client';

import { useEffect, useState, FormEvent } from 'react';
import { api } from '@/lib/api';

export default function ResetPasswordClient({ token }: { token: string }) {
  const [valid, setValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    api('/api/auth/password/reset/verify?token=' + encodeURIComponent(token))
      .then((r: any) => setValid(r.valid))
      .catch(() => setValid(false));
  }, [token]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // mevcut submit mantığını burada token ile kullan
    // ör: await api('/api/auth/password/reset', { method: 'POST', body: JSON.stringify({ token, password }) })
    // setMsg('Your password has been updated.');
  }

  if (valid === null) return <div className="p-6">Checking token…</div>;
  if (valid === false) return <div className="p-6">Reset link is invalid or expired.</div>;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* ... mevcut JSX ... */}
      <form onSubmit={onSubmit} className="space-y-4">
        {/* ... */}
      </form>
    </div>
  );
}
