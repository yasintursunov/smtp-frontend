export async function api(path: string, init: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const res = await fetch(base + path, { 
    credentials: 'include', 
    ...init, 
    headers: { 'Content-Type': 'application/json', 
      ...(init.headers||{}) } });
      
  if (res.status === 401 || res.status === 403) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Auth required');
  }
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}