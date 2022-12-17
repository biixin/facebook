import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContext, AuthProvider } from '../context/AuthContext'
import {QueryClientProvider} from 'react-query'
import { queryClient } from '../services/queryClient'
import { ThemeProvider } from "next-themes";


export default function App({ Component, pageProps }: AppProps) {

  return (
  <QueryClientProvider client={queryClient}>
      <AuthProvider>

          <Component {...pageProps} />

      </AuthProvider> 
  </QueryClientProvider>
  )
}
