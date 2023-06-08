import './globals.css'
import { Inter } from 'next/font/google'
import ToasterContext from '#/context/Toaster.context'
import AuthContext from '#/context/Auth.context'
import ActiveStatus from '#/components/core/ActiveStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messanger',
  description: 'Test messanger app with next js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
