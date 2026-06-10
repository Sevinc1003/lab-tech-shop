'use client';

import { useState, useEffect } from 'react';

export default function PremiumPage() {
  // Form datalarını React state-ində idarə edirik (Controlled Inputs)
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    email: '',
  });

  const [isPaid, setIsPaid] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Səhifə yüklənəndə brauzer yaddaşında premium flag-ini yoxlayırıq
    if (localStorage.getItem('isPremium') === 'true') {
      setIsPaid(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Brauzer yaddaşına (localStorage) flag-i yazırıq ki, "refresh" zamanı silinməsin
    localStorage.setItem('isPremium', 'true');
    
    // 2. Səhifədə dərhal təsdiq mesajını göstəririk
    setIsPaid(true);

    // 3. AdBanner komponentini anında xəbərdar etmək üçün xüsusi event tetikləyirik
    window.dispatchEvent(new Event('premiumChange'));
  };

  // Hydration mismatch (ilk render tələsi) xətasının qarşısını almaq üçün mount-u gözləyirik
  if (!isMounted) return null;

  return (
    <main className="mx-auto w-full max-w-md flex-1 px-6 py-12">
      {isPaid ? (
        // Addım 2: Təsdiq mesajı
        <div className="rounded-2xl border border-green-500/30 bg-green-50 p-8 text-center dark:bg-green-950/20">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            ✅ Payment complete, ads removed!
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Thank you for going premium. Enjoy your clean, ad-free shop!
          </p>
        </div>
      ) : (
        // Addım 1: Ödəniş Formu
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold tracking-tight mb-6 text-center">
            Upgrade to Premium
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                required
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
                placeholder="0000 0000 0000 0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiry"
                  required
                  value={formData.expiry}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  required
                  value={formData.cvc}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Pay Now
            </button>
          </form>
        </div>
      )}
    </main>
  );
}