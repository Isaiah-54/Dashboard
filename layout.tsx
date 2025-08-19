import './globals.css'

export const metadata = {
  title: 'Aztec Nodes & Stats',
  description: 'Map of Aztec nodes and high‑level network stats',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
