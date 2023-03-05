import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import "semantic-ui-css/semantic.min.css"
import { Dropdown } from 'semantic-ui-react'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const [splitNum, setSplitNum] = useState<number>(3);
  return (
    <div
      className={styles.main}
    >
      <Link href="/">
        <h1>バズパズ</h1>
      </Link>
      <div className={styles.container}>
        <Link href="/about">
          ゲームのプレイ方法
        </Link>
        <p>パズルの難易度</p>
        <select onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSplitNum(Number(e.target.value)) }}
          className="ui selection dropdown"
          name="" id="">
          <option value="3">３×３</option>
          <option value="4">４×４</option>
          <option value="5">５×５</option>
          <option value="6">６×６</option>
        </select>
        <p></p>
        <a href={'/cat?num=' + splitNum}>
          猫好きはこちら
        </a>
        <p></p>
        <a href={'/option?num=' + splitNum}>
          AI好きはこちら
        </a>

      </div>
      <div className={styles.footer}>
        <p>このアプリは@yuuuu280が作りました</p>
      </div>
    </div>
  );
};
export default Home;
