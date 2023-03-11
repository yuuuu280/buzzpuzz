import { css } from '@emotion/react'
import * as React from 'react'
import styles from '@/styles/Home.module.css'

type SelectControlProps = {
  selectRef?: React.MutableRefObject<HTMLSelectElement | null>
  options: { label: string; value: string | number }[]
  onChange: (value: string | number, label?: string) => void
} & Omit<JSX.IntrinsicElements['select'], 'onChange' | 'ref'>

const style = css({
  position: 'relative',
  padding: '10px 10px 10px 10px',
  fontSize: '18px'
  // border: '1px solid rgba(0,0,0, 0.3)'
  // '&::after': {
  //   position: 'absolute',
  //   top: '18px',
  //   right: '10px',
  //   width: '5px',
  //   height: '5px',
  //   content: '""',
  //   borderLeft: '6px solid transparent',
  //   borderRight: '6px solid transparent',
  //   borderTop: '6px solid blue',
  //   pointerEvents: 'none',
  // },
})

export const SelectControl: React.FC<SelectControlProps> = ({ selectRef, options, onChange, ...props }) => {
  return (
    <div css={style}>
      <select
        className={`ui selection dropdown ${styles.selectPrompt}`}
        ref={selectRef}
        {...props}
        onChange={(event) => {
          const selectEle = event.target
          const selectOptionsEle = selectEle[selectEle.selectedIndex] as HTMLOptionElement
          onChange(selectEle.value, selectOptionsEle.text)
        }}
        css={css({ appearance: 'auto' })}
      >
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}
