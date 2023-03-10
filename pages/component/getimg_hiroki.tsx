import Link from 'next/link'
import router from 'next/router'
import { useState, useEffect, useRef, createRef, RefObject } from 'react'
import { useQuery } from 'react-query'
import styles from '@/styles/Home.module.css'
import LoopAnimation from '../loopAnimation'
import loadJson from '../lf20_xvec7y03.json'
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
}

const canMoveCheck = (holeInfo: { x: number; y: number }, clickInfo: { x: number; y: number }) => {
  if (clickInfo.x + 1 === holeInfo.x && clickInfo.y === holeInfo.y) return 'right'
  if (clickInfo.x - 1 === holeInfo.x && clickInfo.y === holeInfo.y) return 'left'
  if (clickInfo.x === holeInfo.x && clickInfo.y - 1 === holeInfo.y) return 'up'
  if (clickInfo.x === holeInfo.x && clickInfo.y + 1 === holeInfo.y) return 'down'
  return false
}

const checkAnswer = (fieldInfo: { x: number; y: number }[], splitNum: number) => {
  for (let i = 0; i < fieldInfo.length; i++) {
    if ((fieldInfo[i].x === i % splitNum && fieldInfo[i].y === Math.floor(i / splitNum)) === false) return false
  }

  return true
}

function Cat({ splitNum }: { splitNum: number }) {
  const { data, isLoading, isError, error } = useQuery<CreateImageResponse>(`python${splitNum}`, () =>
    fetchPython(splitNum)
  )
  const test = useRef(null)
  const flipList = useRef<RefObject<HTMLDivElement>[]>([])
  const firstRef = useRef(true)

  Array(splitNum * splitNum)
    .fill(null)
    .forEach((_, index) => {
      flipList.current[index] = createRef<HTMLDivElement>()
    })

  type fieldInfo = { x: number; y: number }[]
  const [fieldInfo, setFieldInfo] = useState<fieldInfo | null>(null)
  const [isHint, setHint] = useState(false)

  useEffect(() => {
    if (!fieldInfo || !firstRef.current) return

    firstRef.current = false

    fieldInfo.forEach((element, index) => {
      gsap.to(flipList.current[index].current, {
        x: element.x * pieceSize,
        y: element.y * pieceSize,
        duration: 0
      })
    })
  }, [fieldInfo])

  // const [isClear, setClear] = useState(false)

  // const [List, setList] = useState(['ringo'])
  if (isLoading) {
    return (
      <div className={styles.load}>
        <div css={css({ width: '300px' })}>
          <LoopAnimation json={loadJson}></LoopAnimation>
        </div>
        <h2>パズル作成中.....</h2>
      </div>
    )
  }
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  if (data === undefined || data === null) {
    return <span>Error</span>
  }
  if (fieldInfo === null) {
    // pythonを2次元配列にしたらここはいらなくなる
    const fieldInfo = Array.from({ length: splitNum * splitNum }, (_, i) => {
      const point = data.answer.indexOf(i)
      return {
        x: point % splitNum,
        y: Math.floor(point / splitNum)
      }
    })
    console.log(data.answer)
    console.log(fieldInfo)
    setFieldInfo(fieldInfo)
    return <span>Error</span>
  }

  const onClick = (x: number, y: number) => {
    let holeInfo = fieldInfo[fieldInfo.length - 1]
    let clickIndex = -1
    fieldInfo.forEach((element, index) => {
      if (element.x === x && element.y === y) {
        clickIndex = index
      }
    })
    if (clickIndex === -1) return

    let clickInfo = fieldInfo[clickIndex]
    const canMove = canMoveCheck(holeInfo, clickInfo)
    if (canMove === false) return

    fieldInfo[clickIndex] = { ...holeInfo }

    fieldInfo[fieldInfo.length - 1] = { x, y }

    setFieldInfo([...fieldInfo])

    // console.log(moveX, moveY)
    gsap.to(flipList.current[clickIndex].current, {
      x: holeInfo.x * pieceSize,
      y: holeInfo.y * pieceSize,
      duration: 0.2
    })

    if (checkAnswer(fieldInfo, splitNum)) {
      router.push({
        pathname: '/clear',
        query: { image: window.URL.createObjectURL(toBlob(data.original)) } // ココ
      })
    }
  }
  const onClickHint = () => {
    setHint(true)
  }
  const onClickNoHint = () => {
    setHint(false)
  }
  const pieceSize = window.parent.screen.width > 610 ? 450 / splitNum : (window.parent.screen.width * 0.66) / splitNum

  return (
    <div className={styles.container}>
      <div>
        <span className="ui buttons">
          <button onClick={() => onClickHint()} className={`ui button ${isHint && 'positive active'}`}>
            表示
          </button>
          <div className="or" data-text="hint"></div>
          <button onClick={() => onClickNoHint()} className={`ui button ${!isHint && 'positive active'}`}>
            非表示
          </button>
        </span>
        <p></p>
        <div css={css({ height: `${pieceSize * splitNum}px`, position: 'relative' })}>
          {fieldInfo.map((element, index) => {
            if (fieldInfo.length - 1 === index) return
            const top = element.y * pieceSize
            const left = element.x * pieceSize
            return (
              <div ref={flipList.current[index]} key={index} style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* fieldInfo: パズルのピースの並び順が入った配列 */}
                {/* isHint: ヒント表示が有効かどうかを表すフラグ */}
                {isHint && <p className={styles.hint}>{index + 1}</p>}

                <img
                  src={data.images[index]}
                  className={styles.img}
                  width={pieceSize}
                  height={pieceSize}
                  onClick={() => onClick(element.x, element.y)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cat
