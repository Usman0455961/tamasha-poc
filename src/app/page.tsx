'use client';

import { getToken, fetchProducts } from '@/utils/auth';
import { JSX, useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:4000/jazz-auth-sdk.js';
    script.async = true;
    script.onload = () => {
      window.JazzAuth?.init({
        clientId: 'tamasha',  // or 'cricket'
        containerId: 'jazz-auth-container',
        buttonColor: '#E2136E', // Jazz brand color
        buttonText: 'Continue with Jazz',
        onLogin: () => {
          loadSession();  // Trigger reload
        },
      });
    };
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const loadSession = async () => {
    setLoading(true);
    const token = await getToken();
    if (token) {
      const data = await fetchProducts('tamasha', token);  // or 'cricket'
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (products.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img src="/jazz-logo.png" alt="Jazz Logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Tamasha</h1>
            <p className="text-lg text-gray-600">Your entertainment destination</p>
          </div>
          <ProductList products={products} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/jazz-logo.png" alt="Jazz Logo" className="h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Tamasha</h1>
          <p className="text-gray-600 mb-8">Sign in to access your entertainment</p>
        </div>
        <div id="jazz-auth-container" className="flex justify-center"></div>
      </div>
    </div>
  );
}