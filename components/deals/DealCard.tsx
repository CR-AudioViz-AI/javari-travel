'use client';

import { ExternalLink, Calendar, Tag, Hotel, Ticket, Users, Clock } from 'lucide-react';

interface Deal {
  id: string;
  type: 'hotel' | 'ticket' | 'package';
  title: string;
  destination: string;
  originalPrice: number;
  currentPrice: number;
  savings: number;
  provider: string;
  expiresAt?: string;
  url?: string;
}

interface DealCardProps {
  deal: Deal;
}

const typeIcons = {
  hotel: Hotel,
  ticket: Ticket,
  package: Users,
};

export function DealCard({ deal }: DealCardProps) {
  const Icon = typeIcons[deal.type] || Tag;
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all">
      <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <Icon className="w-16 h-16 text-white/50" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded-full font-bold">
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
        {deal.expiresAt && (
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Clock className="w-4 h-4" />
            <span>Expires: {deal.expiresAt}</span>
          </div>
        )}
        <a
          href={deal.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          View Deal <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default DealCard;
