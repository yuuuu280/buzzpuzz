import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import 'semantic-ui-css/semantic.min.css'
import { gsap } from 'gsap'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const router = useRouter()
  const image = router.query.image
  const bounce = useRef(null)
  const [splitNum, setSplitNum] = useState<number>(3)
  useEffect(() => {
    gsap.to(bounce.current, {
      y: 0,
      opacity: 1,
      ease: 'expo.out',
      duration: 2
    })
  }, [bounce])

  return (
    <div className={styles.main}>
      <Link className={styles.title} href="/">
        <img src={'/logo.png'} width={'300'} height={'50'} />
      </Link>
      <div className={`${styles.container} ${styles.clear}`}>
        <h1>クリアおめでとう！！！</h1>
        <h1>是非保存してシェアしてみてね</h1>
        <div>
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-size="large"
            data-text="バズパズの画像めっちゃかわいい！！<画像添付>"
            data-show-count="false"
          >
            Tweet
          </a>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
        <div style={{ opacity: 1 }}>
          <img
            ref={bounce}
            src={image}
            width={'400'}
            height={'400'}
            style={{ opacity: 0, transform: 'translate(0 , 150px)' }}
          />
        </div>
      </div>
    </div>
  )
}
export default Home
