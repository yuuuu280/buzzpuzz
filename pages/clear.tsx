import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import "semantic-ui-css/semantic.min.css"

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const router = useRouter();
  const image = router.query.image

  return (
    <div
      className={styles.main}>
      <Link href="/">
        <h1>バズパズ</h1>
      </Link>
      <div className={styles.container}>
        <h1>クリアおめでとう！！！</h1>
        <img src={image}
          width={'400'}
          height={'400'} />
      </div>
    </div>
  );
};
export default Home;
