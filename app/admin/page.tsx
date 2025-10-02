import dynamic from 'next/dynamic';
const UserTable = dynamic(() => import('@/components/UserTable'), { ssr: false });

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-2xl font-semibold">Users</div>
        <a href="/logout" className="btn btn-ghost"><img src="/log-out.svg" className="w-4 h-4" /> Logout</a>
      </div>
      <UserTable />
    </div>
  );
}
