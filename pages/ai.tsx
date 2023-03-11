import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import Ai from 'component/getimg_ai'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Step } from 'semantic-ui-react'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

const Home: NextPage = () => {
  const router = useRouter()
  const num = router.query.num
  const prompt = router.query.prompt
  const step = router.query.step

  if (num === undefined || step === undefined || typeof prompt !== 'string') {
    return <p>Error</p>
  }
  return (
    <div className={styles.main}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Link className={styles.title} href="/">
            <img src={'/logo.png'} width={'300'} height={'50'} />
          </Link>
          <Ai splitNum={Number(num)} step={Number(step)} prompt={prompt} />
        </div>
      </QueryClientProvider>
    </div>
  )
}
export default Home
