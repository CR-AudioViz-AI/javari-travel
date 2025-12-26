import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/globe-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Travel <span className="text-yellow-400">Smarter</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              AI-powered travel deals across the globe. Best prices, guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/deals"
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg text-lg transition-all transform hover:scale-105"
              >
                🔥 View Hot Deals
              </Link>
              <Link
                href="/alerts"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-lg border border-white/30 transition-all"
              >
                🔔 Set Price Alerts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white/5 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400">50K+</div>
              <div className="text-blue-200">Deals Found</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">$2.4M</div>
              <div className="text-blue-200">Saved by Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">15K+</div>
              <div className="text-blue-200">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">98%</div>
              <div className="text-blue-200">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            🌍 Popular Destinations
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Orlando', emoji: '🏰', deals: 234, savings: 'Up to 45%' },
              { name: 'Las Vegas', emoji: '🎰', deals: 189, savings: 'Up to 40%' },
              { name: 'New York', emoji: '🗽', deals: 312, savings: 'Up to 35%' },
              { name: 'Miami', emoji: '🏖️', deals: 167, savings: 'Up to 50%' },
              { name: 'Los Angeles', emoji: '🎬', deals: 198, savings: 'Up to 38%' },
              { name: 'Hawaii', emoji: '🌺', deals: 145, savings: 'Up to 42%' },
              { name: 'Cancun', emoji: '🌴', deals: 223, savings: 'Up to 55%' },
              { name: 'Paris', emoji: '🗼', deals: 134, savings: 'Up to 30%' },
            ].map((dest) => (
              <Link
                key={dest.name}
                href={`/destinations/${dest.name.toLowerCase().replace(' ', '-')}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all transform hover:scale-105 border border-white/10"
              >
                <div className="text-4xl mb-3">{dest.emoji}</div>
                <h3 className="text-xl font-bold text-white">{dest.name}</h3>
                <p className="text-blue-200 text-sm">{dest.deals} active deals</p>
                <p className="text-yellow-400 font-bold mt-2">{dest.savings}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            ✨ Why Choose CRAVTravel
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">AI Price Predictions</h3>
              <p className="text-blue-200">
                Our ML models predict price drops with 98% accuracy. Know exactly when to book.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Alerts</h3>
              <p className="text-blue-200">
                Get notified the moment prices drop on your watched destinations.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Guaranteed Savings</h3>
              <p className="text-blue-200">
                Average savings of 35% compared to booking directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Save on Your Next Trip?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join 15,000+ travelers who never overpay for travel again.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg text-xl transition-all transform hover:scale-105"
          >
            Start Saving Now - It&apos;s Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white font-bold text-2xl mb-4 md:mb-0">
              CRAV<span className="text-yellow-400">Travel</span>
            </div>
            <div className="text-blue-200 text-sm">
              Part of the <a href="https://craudiovizai.com" className="text-yellow-400 hover:underline">CR AudioViz AI</a> ecosystem
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
