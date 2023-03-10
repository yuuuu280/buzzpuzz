import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const About: NextPage = () => {
  return (
    <div className={styles.main}>
      <Link href="/">
        <img src={'/logo.png'} width={'300'} height={'50'} />
      </Link>
      <div className={styles.container}>
        <h2>ゲームのプレイ方法</h2>
        <Link href="/">タイトルへ</Link>
      </div>
    </div>
  )
}
export default About
