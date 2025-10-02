'use client';
import { useEffect } from 'react';
import { api } from '@/lib/api';
export default function LogoutPage(){
  useEffect(()=>{ api('/api/auth/logout',{method:'POST'}).finally(()=>{ window.location.href='/login'; }); },[]);
  return <p className="p-6">Logging out…</p>;
}
