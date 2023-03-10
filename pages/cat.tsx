import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import Cat from './component/getimg_hiroki'
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
  if (num === undefined) {
    return <div></div>
  }
  if (!(Number(num) < 10 && Number(num) > 0)) {
    return (
      <div className={styles.main}>
        <div>
          <Link className={styles.title} href="/">
            <img src={'/logo.png'} width={'300'} height={'50'} />
          </Link>
        </div>
        <h1>難易度を選択画面から選択してね！！</h1>
      </div>
    )
  }

  return (
    <div className={styles.main}>
      <Link className={styles.title} href="/">
        <img src={'/logo.png'} width={'300'} height={'50'} />
      </Link>
      <QueryClientProvider client={queryClient}>
        <Cat splitNum={Number(num)} />
      </QueryClientProvider>
    </div>
  )
}
export default Home
