import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = typeof searchParams?.token === 'string' ? searchParams.token : '';
  return (
    <Suspense fallback={<div className="p-6">Checking token…</div>}>
      <ResetPasswordClient token={token} />
    </Suspense>
  );
}
