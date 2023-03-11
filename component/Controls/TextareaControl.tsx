import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';

type TextareaControlProps = { initValue: string; onChange?: (value: string) => void } & Omit<JSX.IntrinsicElements['textarea'], 'onChange' | 'ref' | 'css'>;

const style = css({ display: 'block', width: '60vw', height: '100px', border: '2px solid #ccc', padding: '5px' });

export const TextareaControl: React.FC<TextareaControlProps> = ({ initValue, onChange, ...props }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (ref.current === null) return;
    ref.current.value = initValue;
  }, [initValue]);

  return (
    <>
      <textarea
        ref={ref}
        css={style}
        onChange={(event) => {
          onChange && onChange(event.target.value);
        }}
        {...props}
      />
    </>
  );
};
