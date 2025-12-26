'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Deal {
  id: string;
  type: 'hotel' | 'flight' | 'package';
  destination: string;
  title: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  provider: string;
  expiresAt: string;
  image?: string;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filter, setFilter] = useState<'all' | 'hotel' | 'flight' | 'package'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated deals - replace with API call
    const sampleDeals: Deal[] = [
      {
        id: '1',
        type: 'hotel',
        destination: 'Orlando, FL',
        title: 'Walt Disney World Resort Hotel',
        originalPrice: 399,
        currentPrice: 219,
        savings: 45,
        provider: 'Disney Direct',
        expiresAt: '2025-01-15',
      },
      {
        id: '2',
        type: 'flight',
        destination: 'Las Vegas, NV',
        title: 'Round-trip from NYC',
        originalPrice: 450,
        currentPrice: 198,
        savings: 56,
        provider: 'Multiple Airlines',
        expiresAt: '2025-01-10',
      },
      {
        id: '3',
        type: 'package',
        destination: 'Cancun, Mexico',
        title: '5-Night All-Inclusive Resort',
        originalPrice: 1899,
        currentPrice: 999,
        savings: 47,
        provider: 'Expedia',
        expiresAt: '2025-01-20',
      },
      {
        id: '4',
        type: 'hotel',
        destination: 'Miami Beach, FL',
        title: 'Oceanfront Luxury Suite',
        originalPrice: 599,
        currentPrice: 329,
        savings: 45,
        provider: 'Hotels.com',
        expiresAt: '2025-01-12',
      },
      {
        id: '5',
        type: 'flight',
        destination: 'Paris, France',
        title: 'Business Class from LAX',
        originalPrice: 4200,
        currentPrice: 2499,
        savings: 40,
        provider: 'Air France',
        expiresAt: '2025-02-01',
      },
      {
        id: '6',
        type: 'package',
        destination: 'Hawaii',
        title: '7-Night Maui Adventure',
        originalPrice: 3499,
        currentPrice: 1899,
        savings: 46,
        provider: 'CRAVTravel Exclusive',
        expiresAt: '2025-01-25',
      },
    ];
    
    setTimeout(() => {
      setDeals(sampleDeals);
      setLoading(false);
    }, 500);
  }, []);

  const filteredDeals = filter === 'all' 
    ? deals 
    : deals.filter(d => d.type === filter);

  const typeEmoji = {
    hotel: '🏨',
    flight: '✈️',
    package: '🎁',
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            CRAV<span className="text-yellow-400">Travel</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/deals" className="text-yellow-400 font-medium">Deals</Link>
            <Link href="/alerts" className="text-blue-200 hover:text-white">Alerts</Link>
            <Link href="/predictions" className="text-blue-200 hover:text-white">AI Predictions</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">🔥 Hot Deals</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {(['all', 'hotel', 'flight', 'package'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === type
                  ? 'bg-yellow-400 text-blue-900'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {type === 'all' ? '🌍 All' : `${typeEmoji[type]} ${type.charAt(0).toUpperCase() + type.slice(1)}s`}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="text-center text-blue-200 py-20">
            <div className="text-4xl mb-4">⏳</div>
            Loading amazing deals...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">{typeEmoji[deal.type]}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full">
                      {deal.savings}% OFF
                    </span>
                    <span className="text-blue-200 text-sm">{deal.destination}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{deal.title}</h3>
                  <p className="text-blue-200 text-sm mb-4">via {deal.provider}</p>
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-yellow-400">${deal.currentPrice}</span>
                    <span className="text-blue-300 line-through">${deal.originalPrice}</span>
                  </div>
                  <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg transition-all">
                    View Deal →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
