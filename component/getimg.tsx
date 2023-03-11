import Link from 'next/link'
import router from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import styles from '@/styles/Home.module.css'
import LoopAnimation from './LoopAnimation'
import loadJson from 'public/animation/lf20_xvec7y03.json'
import { css } from '@emotion/react'
import { gsap } from 'gsap'

export const toBlob = (base64: string) => {
  var bin = atob(base64.replace(/^.*,/, ''))
  var buffer = new Uint8Array(bin.length)
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i)
  }
  // Blobを作成
  const blob = new Blob([buffer.buffer], {
    type: 'image/png'
  })

  return blob
}

const fetchPython = async (splitNum: number) => {
  console.log(splitNum)
  const res = await fetch('http://127.0.0.1:8000/cat/' + splitNum)
  console.log(res)
  return res.json()
}
type CreateImageResponse = {
  original: string
  answer: number[]
  images: string[]
  hole: number
}
function Cat({ splitNum }: { splitNum: number }) {
  const test = useRef(null)
  const flip = useRef(null)

  useEffect(() => {
    gsap.to(test.current, {
      backgroundImage: 'linear-gradient(to left, #30CFD0, #330867)',
      duration: 5
    })
  }, [test])
  useEffect(() => {
    gsap.to(flip.current, {
      backgroundImage: 'linear-gradient(to left, #30CFD0, #330867)',
      duration: 5
    })
  }, [flip])
  const { data, isLoading, isError, error } = useQuery<CreateImageResponse>(`python${splitNum}`, () =>
    fetchPython(splitNum)
  )
  const [answer, setAnswer] = useState<number[] | null>(null)
  const [hole, setHole] = useState<number | null>()
  const [isHint, setHint] = useState(false)
  // const [isClear, setClear] = useState(false)

  // const [List, setList] = useState(['ringo'])
  if (isLoading) {
    return (
      <div css={css({ width: '80vw' })}>
        <LoopAnimation json={loadJson}></LoopAnimation>
      </div>
    )
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (data === undefined || data === null) {
    return <span>Error</span>
  }
  if (answer === null) {
    setAnswer(data.answer)
    setHole(data.hole)
    return <span>Error</span>
  }

  const onClick = (option: number) => {
    const hole = answer.indexOf(splitNum * splitNum - 1)
    //斜めに移動しない要する
    if (option === hole + 1 && option % splitNum === 0) {
      return
    }
    if (option === hole - 1 && (option + 1) % splitNum === 0) {
      return
    }
    if (option === hole - 1 || option === hole - splitNum || option === hole + 1 || option === hole + splitNum) {
      //パズル入れ替え
      answer[hole] += answer[option]
      answer[option] = answer[hole] - answer[option]
      answer[hole] = answer[hole] - answer[option]

      setHole(option)
    }
    if (answer.toString() === [...Array(splitNum * splitNum)].map((_, i) => i).toString()) {
      // setClear(true)
      router.push({
        pathname: '/clear',
        query: { image: window.URL.createObjectURL(toBlob(data.original)) } // ココ
      })
    }
    console.log(answer)
    console.log(hole)
  }
  const onClickHint = () => {
    setHint(true)
  }
  const onClickNoHint = () => {
    setHint(false)
  }

  const roop = () => {
    const vertical = []
    // splitNum: パズルの縦横のピース数
    for (let j = 0; j < splitNum; j++) {
      // <div style={{ display: "flex" }}>
      const horizon = []
      for (let i = j * splitNum; i < j * splitNum + splitNum; i++) {
        // console.log(i)
        horizon.push(
          <div className={styles.box}>
            {/* answer: パズルのピースの並び順が入った配列 */}
            {/* isHint: ヒント表示が有効かどうかを表すフラグ */}
            {!(answer[i] === splitNum * splitNum - 1) && isHint && <p className={styles.hint}>{answer[i] + 1}</p>}
            <img
              src={data.images[answer[i]]}
              className={styles.img}
              width={450 / splitNum}
              height={450 / splitNum}
              onClick={() => onClick(i)}
            />
          </div>
        )
      }
      vertical.push(<div style={{ display: 'flex' }}>{horizon}</div>)
    }
    return vertical
  }

  return (
    <div>
      <div>
        <div ref={test} className="App">
          <h1>文字の色がだんだん変わります</h1>
          <h2>再読込してためしてみてください</h2>
        </div>
        <p>ヒント</p>
        <div className="ui buttons">
          <button onClick={() => onClickHint()} className={`ui button ${isHint && 'positive active'}`}>
            表示
          </button>
          <div className="or" data-text="●"></div>
          <button onClick={() => onClickNoHint()} className={`ui button ${!isHint && 'positive active'}`}>
            非表示
          </button>
        </div>
        <p></p>
        {roop()}
      </div>
    </div>
  )
}

export default Cat
