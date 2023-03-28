import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import Cat from 'component/getimg_hiroki'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Lottie from 'lottie-react'

interface ScrollAnimationProps {
  json: unknown
}
const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

const Home: NextPage = () => {
  const router = useRouter()
  const num = router.query.num
  if (!(Number(num) < 10 && Number(num) > 0)) {
    return (
      <div className={styles.main}>
        <div>
          <Link className={styles.title} href="/">
            <img src={'/logo.png'} width={'300'} height={'50'} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <QueryClientProvider client={queryClient}>
        <div>
          <Link className={styles.title} href="/">
            <img src={'/logo.png'} width={'300'} height={'50'} />
          </Link>
          <Cat splitNum={Number(num)} />
        </div>
      </QueryClientProvider>
    </div>
  )
}
export default Home
