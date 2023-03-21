import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { css } from '@emotion/react'
import styles from '@/styles/Home.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Dropdown, Form, Select, Step, TextArea } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { PromptControl } from 'component/Controls/PromptControl/PromptControl'
import { promptOptions } from 'component/Controls/PromptControl/data'
import { TextareaControl } from 'component/Controls/TextareaControl'
import { SelectControl } from 'component/Controls/SelectControl'

const inter = Inter({ subsets: ['latin'] })

const quarityOptions = [
  { label: '2分（クオリティ高）', value: 20 },
  { label: '1分（クオリティ低）', value: 8 },
  { label: '30秒（クオリティ激低）', value: 3 }
]

const Home: NextPage = () => {
  const [splitNum, setSplitNum] = useState<number>(3)
  const router = useRouter()
  const num = router.query.num
  const [prompt, setPrompt] = useState(promptOptions.at(0)?.prompt || '')
  const [quartiy, setQuarity] = useState(quarityOptions[0].value)
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
      <Link href="/">
        <img src={'/logo.png'} width={'300'} height={'50'} />
      </Link>
      <div className={`${styles.container} ${styles.option}`}>
        <p>作りたい画像を英文で表してください</p>
        <PromptControl
          promptOptions={promptOptions}
          changeCallback={(prompt) => {
            setPrompt(prompt)
          }}
        />
        <div>
          <label>一枚あたりの所要時間:</label>
          <SelectControl
            options={quarityOptions}
            onChange={(value) => {
              setQuarity(Number(value))
            }}
          />
        </div>

        <Form>
          <TextareaControl
            placeholder="タップして記述"
            initValue={prompt || ''}
            onChange={(value) => {
              setPrompt(String(value))
            }}
          />
        </Form>
        <p></p>
        <a href={'/ai?num=' + num + '&step=' + quartiy + '&prompt=' + prompt}>
          <button className="positive ui button">▶︎スタート</button>
        </a>
      </div>
    </div>
    // </div >
  )
}
export default Home
