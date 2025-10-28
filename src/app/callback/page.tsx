'use client';

import { useSearchParams } from 'next/navigation';
import { JSX, useEffect } from 'react';

export default function CallbackPage(): JSX.Element {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const client_id = searchParams.get('client_id');

  useEffect(() => {
    const exchange = async () => {
      if (!code || !client_id) return;

      try {
        const res = await fetch('http://localhost:4000/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, client_id }),
        });

        const data = await res.json();
        localStorage.setItem('jazz_token', data.access_token);

        // Notify opener (if any) and close popup
        window.opener?.postMessage('login-success', '*');
        window.close();
      } catch (err) {
        console.error(err);
      }
    };

    exchange();
  }, [code, client_id]);

  return <div className="p-4">Processing login…</div>;
}