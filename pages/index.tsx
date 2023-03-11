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
  const handleChange = (event: SelectChangeEvent) => {
    setSplitNum(event.target.value as string)
  }
  return (
    <div className={styles.main}>
      <Link className={styles.title} href="/">
        <img src={'/logo.png'} width={'300'} height={'50'} />
      </Link>
      <div className={styles.top}>
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
            <MenuItem value="5">👹５×５</MenuItem>
          </Select>
        </FormControl>
        {/* <select
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSplitNum(Number(e.target.value))
          }}
          className="ui vertical buttons"
          name=""
          id=""
        >
          <option value="3">😺３×３</option>
          <option value="4">🦁４×４</option>
          <option value="5">👹５×５</option>
        </select> */}
        <p></p>
        <a href={'/cat?num=' + splitNum}>猫好きはこちらaaa</a>
        <p></p>
        <a href={'/option?num=' + splitNum}>AI好きはこちら</a>
      </div>
      <div className={styles.footer}>
        <p>このアプリは@yuuuu280が作りました</p>
      </div>
    </div>
  )
}
export default Home
