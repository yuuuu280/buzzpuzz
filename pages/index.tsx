import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'
import { css } from '@emotion/react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  const [splitNum, setSplitNum] = useState<string>()
  const [isvali, setIsvali] = useState<boolean>(false)
  const handleChange = (event: SelectChangeEvent) => {
    setSplitNum(event.target.value as string)
  }
  const validate_cat = (splitNum: string) => {
    if (splitNum === undefined) {
      setIsvali(true)
      return
    }
    window.location.href = '/cat?num=' + splitNum
  }
  const validate_ai = (splitNum: string) => {
    if (splitNum === undefined) {
      setIsvali(true)
      return
    }
    window.location.href = '/option?num=' + splitNum
  }
  return (
    <>
      <head>
        <meta property="og:title" content="バズパズ" />
        <meta property="og:description" content="バズパズで遊んでみよう" />
        <meta property="og:image" content="public/ogp.png" />
      </head>
      <div className={styles.main}>
        <Link className={styles.title} href="/">
          <img src={'/logo.png'} width={'300'} height={'50'} />
        </Link>
        <div className={styles.top}>
          {isvali && <p className={styles.vali}>※難易度を設定してください</p>}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">難易度</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={splitNum}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="3">😺３×３</MenuItem>
              <MenuItem value="4">🦁４×４</MenuItem>
              <MenuItem value="5">👹５×５（PC環境推奨）</MenuItem>
            </Select>
          </FormControl>
          <p></p>
          <button onClick={() => validate_cat(splitNum)}>Play with 👉Cats</button>
          <p></p>
          <button onClick={() => validate_ai(splitNum)}>Play with 👉AI</button>
        </div>
        <div className={styles.footer}>
          <p>
            このアプリは
            <a href="https://twitter.com/yuuuu2801" target="_blank" rel="noopener noreferrer">
              @yuuuu2801
            </a>
            が作りました
          </p>
        </div>
      </div>
    </>
  )
}
export default Home
