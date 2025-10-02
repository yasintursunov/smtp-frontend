'use client';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import Toolbar from './Toolbar';

type Row = { id:number; name:string; email:string; status:'unverified'|'active'|'blocked'; last_login:string | null };



export default function UserTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [sel, setSel] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState<string|null>(null);

  async function load() {
    const data = await api('/api/users');
    setRows(data.rows);
    setSel({});
  }
  useEffect(() => { load(); }, []);

  const anySelected = Object.values(sel).some(Boolean);
  function toggleAll() {
    if (Object.values(sel).every(Boolean) && Object.keys(sel).length === rows.length) setSel({});
    else setSel(Object.fromEntries(rows.map(r => [r.id, true])));
  }
  function toggleOne(id:number) { setSel(s => ({ ...s, [id]: !s[id] })); }
  function selectedIds(): number[] { return rows.filter(r => sel[r.id]).map(r => r.id); }

  async function action(call:()=>Promise<any>, affectedFlag:boolean=false) {
    setMsg(null);
    try {
      const res = await call();
      if (affectedFlag && (res as any)?.currentAffected) window.location.href = '/login';
      await load();
      setMsg('Done.');
      setTimeout(()=>setMsg(null), 1500);
    } catch (e:any) {
      setMsg(e.message || 'Failed');
    }
  }

  const doBlock = () => action(()=>api('/api/users/block',{method:'POST',body:JSON.stringify({ids:selectedIds()})}), true);
  const doUnblock = () => action(()=>api('/api/users/unblock',{method:'POST',body:JSON.stringify({ids:selectedIds()})}));
  const doDelete = () => action(()=>api('/api/users/delete',{method:'POST',body:JSON.stringify({ids:selectedIds()})}), true);
  const doDeleteUnverified = () => action(()=>api('/api/users/delete-unverified',{method:'POST'}));

  const badg = (s:Row['status']) => s==='active' ? 'badge-green' : s==='blocked' ? 'badge-red' : 'badge-yellow';

  const filtered = useMemo(()=>{
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q));
  }, [rows, filter]);

  return (
    <div className="card p-3">
      <Toolbar anySelected={anySelected} onBlock={doBlock} onUnblock={doUnblock} onDelete={doDelete} onDeleteUnverified={doDeleteUnverified} filter={filter} setFilter={setFilter} />
      {msg && <div className="mb-2 rounded-md bg-blue-50 p-2 text-sm text-blue-700">{msg}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>
              <input aria-label="Select all" type="checkbox" onChange={toggleAll} checked={filtered.length>0 && filtered.every(r => sel[r.id])} />
            </th>
            <th>Name</th>
            <th>
              <span className="inline-flex items-center gap-1">Email </span>
            </th>
            <th>Status</th>
            <th title="Sorted on server by last login desc">Last seen</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, idx) => (
            <tr key={r.id} className={r.status==='blocked' ? 'opacity-50' : ''}>
              <td><input aria-label="Select row" type="checkbox" checked={!!sel[r.id]} onChange={()=>toggleOne(r.id)} /></td>
              <td className="whitespace-nowrap">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-slate-500">N/A</div>
              </td>
              <td className="whitespace-nowrap">{r.email}</td>
              <td><span className={`badge ${badg(r.status)}`}>{r.status}</span></td>
              <td className="whitespace-nowrap">
                <div>{r.last_login ? new Date(r.last_login).toLocaleString() : '—'}</div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 text-xs text-slate-500">Showing {filtered.length} of {rows.length} users</div>
    </div>
  );
}
