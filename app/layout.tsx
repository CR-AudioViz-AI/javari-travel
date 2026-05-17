// app/layout.tsx — Javari Travel
// Fortune 50 quality — uses AppShell for full ecosystem integration
// May 17, 2026 — CR AudioViz AI, LLC
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Javari Travel | Javari by CR AudioViz AI',
  description: 'AI-powered travel planning',
  keywords: 'Javari Travel, Javari, AI, CR AudioViz AI',
}

import AppShell from '@/components/AppShell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AppShell
          appName="Javari Travel"
          appColor="#06b6d4"
          appEmoji="✈️"
          appDesc="AI-powered travel planning"
      handoffApp="Orlando Trip Deal"
      handoffUrl="https://orlandotripdeal.com"
      handoffPitch="Heading to Florida? Get the best Orlando deals →"
        >
          {children}
        </AppShell>
      </body>
    </html>
  )
}
