'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AlertsPage() {
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [alerts, setAlerts] = useState([
    { id: 1, destination: 'Orlando, FL', maxPrice: 200, active: true },
    { id: 2, destination: 'Las Vegas, NV', maxPrice: 150, active: true },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would call central API
    alert(`Alert created for ${destination} under $${maxPrice}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900">
      <header className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            CRAV<span className="text-yellow-400">Travel</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/deals" className="text-blue-200 hover:text-white">Deals</Link>
            <Link href="/alerts" className="text-yellow-400 font-medium">Alerts</Link>
            <Link href="/predictions" className="text-blue-200 hover:text-white">AI Predictions</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">🔔 Price Alerts</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Create Alert Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Alert</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-200 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:border-yellow-400 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-200 mb-2">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                  required
                >
                  <option value="">Select destination...</option>
                  <option value="orlando">Orlando, FL</option>
                  <option value="lasvegas">Las Vegas, NV</option>
                  <option value="miami">Miami, FL</option>
                  <option value="nyc">New York, NY</option>
                  <option value="losangeles">Los Angeles, CA</option>
                  <option value="hawaii">Hawaii</option>
                  <option value="cancun">Cancun, Mexico</option>
                  <option value="paris">Paris, France</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-200 mb-2">Max Price per Night</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:border-yellow-400 focus:outline-none"
                  placeholder="200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg transition-all"
              >
                Create Alert 🔔
              </button>
            </form>
          </div>

          {/* Active Alerts */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Active Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">{alert.destination}</h3>
                    <p className="text-blue-200">Under ${alert.maxPrice}/night</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      alert.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {alert.active ? '● Active' : '○ Paused'}
                    </span>
                    <button className="text-blue-200 hover:text-red-400">
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
