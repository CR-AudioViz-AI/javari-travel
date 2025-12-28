'use client'

import { useState } from 'react'
import {
  Calendar, Users, DollarSign, MapPin, Star, Clock,
  Plane, Hotel, Car, Ticket, Utensils, Sparkles, ChevronRight,
  Sun, CloudRain, Thermometer, Plus, Minus, Heart, Share2,
  CheckCircle, AlertCircle, Info, Zap, Crown, Gift
} from 'lucide-react'

interface TripDay {
  date: string
  park: string
  parkIcon: string
  crowdLevel: 'low' | 'moderate' | 'high'
  weather: { high: number; low: number; condition: string }
  events: string[]
  reservations: Reservation[]
  tips: string[]
}

interface Reservation {
  time: string
  type: 'dining' | 'fastpass' | 'show' | 'tour'
  name: string
  location: string
  confirmed: boolean
}

interface ParkHours {
  park: string
  icon: string
  open: string
  close: string
  extraMagicMorning?: string
  extendedEvening?: string
}

interface Deal {
  id: string
  title: string
  savings: number
  savingsPercent: number
  category: 'hotel' | 'ticket' | 'dining' | 'package'
  provider: string
  expires: string
  code?: string
}

const SAMPLE_ITINERARY: TripDay[] = [
  {
    date: '2025-03-15',
    park: 'Magic Kingdom',
    parkIcon: '🏰',
    crowdLevel: 'moderate',
    weather: { high: 82, low: 65, condition: 'Sunny' },
    events: ['Festival of Fantasy Parade 3:00 PM', 'Happily Ever After 9:00 PM'],
    reservations: [
      { time: '8:00 AM', type: 'fastpass', name: 'Seven Dwarfs Mine Train', location: 'Fantasyland', confirmed: true },
      { time: '12:30 PM', type: 'dining', name: 'Be Our Guest Restaurant', location: 'Fantasyland', confirmed: true },
      { time: '4:00 PM', type: 'fastpass', name: 'Space Mountain', location: 'Tomorrowland', confirmed: true },
    ],
    tips: ['Rope drop recommended - head straight to Seven Dwarfs', 'Use Genie+ for Peter Pan after 2 PM', 'Fireworks viewing: Hub grass area']
  },
  {
    date: '2025-03-16',
    park: 'EPCOT',
    parkIcon: '🌐',
    crowdLevel: 'low',
    weather: { high: 79, low: 63, condition: 'Partly Cloudy' },
    events: ['Flower & Garden Festival', 'Luminous 9:00 PM'],
    reservations: [
      { time: '9:00 AM', type: 'fastpass', name: 'Guardians of the Galaxy', location: 'World Celebration', confirmed: true },
      { time: '6:00 PM', type: 'dining', name: 'Le Cellier', location: 'Canada Pavilion', confirmed: true },
    ],
    tips: ['Virtual queue opens at 7 AM for Guardians', 'Festival food booths less crowded 11 AM-12 PM', 'Spaceship Earth walk-on after 7 PM']
  },
  {
    date: '2025-03-17',
    park: 'Hollywood Studios',
    parkIcon: '🎬',
    crowdLevel: 'high',
    weather: { high: 84, low: 67, condition: 'Sunny' },
    events: ['St. Patrick\'s Day Celebrations', 'Fantasmic! 9:30 PM'],
    reservations: [
      { time: '7:00 AM', type: 'tour', name: 'Rise of the Resistance Boarding Group', location: 'Galaxy\'s Edge', confirmed: false },
      { time: '1:00 PM', type: 'dining', name: '50s Prime Time Cafe', location: 'Echo Lake', confirmed: true },
    ],
    tips: ['Join virtual queue at 7 AM sharp!', 'Slinky Dog Dash: use Genie+ immediately at park open', 'Tower of Terror: single rider available']
  },
]

const CURRENT_DEALS: Deal[] = [
  { id: 'd1', title: 'Walt Disney World Summer Package', savings: 850, savingsPercent: 25, category: 'package', provider: 'Disney', expires: '2025-02-28' },
  { id: 'd2', title: 'Swan & Dolphin Resort Special', savings: 320, savingsPercent: 30, category: 'hotel', provider: 'Marriott', expires: '2025-01-31', code: 'MAGIC30' },
  { id: 'd3', title: 'Universal 3-Park Explorer Ticket', savings: 75, savingsPercent: 15, category: 'ticket', provider: 'Universal', expires: '2025-03-15' },
  { id: 'd4', title: 'Disney Dining Plan Free Upgrade', savings: 200, savingsPercent: 20, category: 'dining', provider: 'Disney', expires: '2025-02-15' },
]

const PARK_HOURS: ParkHours[] = [
  { park: 'Magic Kingdom', icon: '🏰', open: '9:00 AM', close: '10:00 PM', extraMagicMorning: '7:30 AM' },
  { park: 'EPCOT', icon: '🌐', open: '9:00 AM', close: '9:00 PM', extendedEvening: '11:00 PM' },
  { park: 'Hollywood Studios', icon: '🎬', open: '8:30 AM', close: '9:00 PM' },
  { park: 'Animal Kingdom', icon: '🦁', open: '8:00 AM', close: '7:00 PM' },
]

export default function TripPlannerAI() {
  const [activeTab, setActiveTab] = useState<'planner' | 'deals' | 'parks' | 'budget'>('planner')
  const [tripDates, setTripDates] = useState({ start: '2025-03-15', end: '2025-03-18' })
  const [travelers, setTravelers] = useState({ adults: 2, children: 2 })
  const [selectedDay, setSelectedDay] = useState(0)

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500/20 text-green-400'
      case 'moderate': return 'bg-yellow-500/20 text-yellow-400'
      case 'high': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hotel': return <Hotel className="w-4 h-4" />
      case 'ticket': return <Ticket className="w-4 h-4" />
      case 'dining': return <Utensils className="w-4 h-4" />
      case 'package': return <Gift className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
            🏰
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Trip Planner</h1>
            <p className="text-blue-200">Your personalized Orlando vacation assistant</p>
          </div>
        </div>

        {/* Quick Trip Setup */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <label className="text-xs text-blue-200 mb-1 block">Check In</label>
            <input
              type="date"
              value={tripDates.start}
              onChange={(e) => setTripDates({ ...tripDates, start: e.target.value })}
              className="w-full bg-transparent border-b border-white/30 text-white focus:outline-none"
            />
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <label className="text-xs text-blue-200 mb-1 block">Check Out</label>
            <input
              type="date"
              value={tripDates.end}
              onChange={(e) => setTripDates({ ...tripDates, end: e.target.value })}
              className="w-full bg-transparent border-b border-white/30 text-white focus:outline-none"
            />
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <label className="text-xs text-blue-200 mb-1 block">Adults</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setTravelers({ ...travelers, adults: Math.max(1, travelers.adults - 1) })} className="p-1 hover:bg-white/20 rounded">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold">{travelers.adults}</span>
              <button onClick={() => setTravelers({ ...travelers, adults: travelers.adults + 1 })} className="p-1 hover:bg-white/20 rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <label className="text-xs text-blue-200 mb-1 block">Children</label>
            <div className="flex items-center gap-2">
              <button onClick={() => setTravelers({ ...travelers, children: Math.max(0, travelers.children - 1) })} className="p-1 hover:bg-white/20 rounded">
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-bold">{travelers.children}</span>
              <button onClick={() => setTravelers({ ...travelers, children: travelers.children + 1 })} className="p-1 hover:bg-white/20 rounded">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'planner', label: 'Itinerary', icon: Calendar },
          { id: 'deals', label: 'Hot Deals', icon: Zap, badge: CURRENT_DEALS.length },
          { id: 'parks', label: 'Park Hours', icon: Clock },
          { id: 'budget', label: 'Budget', icon: DollarSign },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.badge && <span className="px-1.5 py-0.5 bg-red-500 text-xs rounded-full">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* Itinerary Tab */}
      {activeTab === 'planner' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Day Selector */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-300">Your Trip Days</h3>
            {SAMPLE_ITINERARY.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(index)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedDay === index
                    ? 'bg-blue-600 border-2 border-blue-400'
                    : 'bg-gray-900 border border-gray-700 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{day.parkIcon}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${getCrowdColor(day.crowdLevel)}`}>
                    {day.crowdLevel} crowds
                  </span>
                </div>
                <p className="font-semibold">{day.park}</p>
                <p className="text-sm text-gray-400">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                  <Sun className="w-3 h-3" />
                  {day.weather.high}°F
                </div>
              </button>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-blue-500 hover:text-blue-400">
              <Plus className="w-5 h-5 mx-auto mb-1" />
              Add Day
            </button>
          </div>

          {/* Day Details */}
          <div className="lg:col-span-2 space-y-4">
            {SAMPLE_ITINERARY[selectedDay] && (
              <>
                {/* Day Header */}
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{SAMPLE_ITINERARY[selectedDay].parkIcon}</span>
                      <div>
                        <h2 className="text-xl font-bold">{SAMPLE_ITINERARY[selectedDay].park}</h2>
                        <p className="text-gray-400">
                          {new Date(SAMPLE_ITINERARY[selectedDay].date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Sun className="w-5 h-5" />
                        <span className="font-bold">{SAMPLE_ITINERARY[selectedDay].weather.high}°</span>
                      </div>
                      <p className="text-sm text-gray-400">{SAMPLE_ITINERARY[selectedDay].weather.condition}</p>
                    </div>
                  </div>

                  {/* Events */}
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_ITINERARY[selectedDay].events.map((event, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        ✨ {event}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reservations */}
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" /> Your Reservations
                  </h3>
                  <div className="space-y-3">
                    {SAMPLE_ITINERARY[selectedDay].reservations.map((res, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                        <div className="text-center min-w-[60px]">
                          <p className="font-bold text-blue-400">{res.time}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded capitalize ${
                              res.type === 'dining' ? 'bg-orange-500/20 text-orange-400' :
                              res.type === 'fastpass' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {res.type === 'fastpass' ? 'Lightning Lane' : res.type}
                            </span>
                            <span className="font-medium">{res.name}</span>
                          </div>
                          <p className="text-sm text-gray-400">{res.location}</p>
                        </div>
                        {res.confirmed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-300">
                    <Sparkles className="w-5 h-5" /> AI Tips for Today
                  </h3>
                  <ul className="space-y-2">
                    {SAMPLE_ITINERARY[selectedDay].tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Deals Tab */}
      {activeTab === 'deals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRENT_DEALS.map(deal => (
            <div key={deal.id} className="bg-gray-900 rounded-xl border border-gray-700 p-4 hover:border-green-500/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${
                    deal.category === 'hotel' ? 'bg-blue-500/20 text-blue-400' :
                    deal.category === 'ticket' ? 'bg-purple-500/20 text-purple-400' :
                    deal.category === 'dining' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}>
                    {getCategoryIcon(deal.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{deal.title}</h3>
                    <p className="text-sm text-gray-400">{deal.provider}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded font-bold">
                  {deal.savingsPercent}% OFF
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-400">Save ${deal.savings}</p>
                  <p className="text-xs text-gray-500">Expires: {deal.expires}</p>
                </div>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium">
                  Get Deal
                </button>
              </div>
              {deal.code && (
                <div className="mt-3 p-2 bg-gray-800 rounded flex items-center justify-between">
                  <span className="font-mono text-sm">{deal.code}</span>
                  <button className="text-xs text-blue-400">Copy</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Park Hours Tab */}
      {activeTab === 'parks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARK_HOURS.map(park => (
            <div key={park.park} className="bg-gray-900 rounded-xl border border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{park.icon}</span>
                <h3 className="font-semibold text-lg">{park.park}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Regular Hours</span>
                  <span>{park.open} - {park.close}</span>
                </div>
                {park.extraMagicMorning && (
                  <div className="flex justify-between">
                    <span className="text-blue-400">Early Entry</span>
                    <span className="text-blue-300">{park.extraMagicMorning}</span>
                  </div>
                )}
                {park.extendedEvening && (
                  <div className="flex justify-between">
                    <span className="text-purple-400">Extended Evening</span>
                    <span className="text-purple-300">{park.extendedEvening}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
