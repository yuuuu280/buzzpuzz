import Lottie from 'lottie-react'

type LoopAnimationProps = {
  json: unknown
}

const LoopAnimation: React.FC<LoopAnimationProps> = ({ json }) => {
  return (
    <Lottie
      style={{
        width: '100%',
        height: '100%'
      }}
      animationData={json}
    />
  )
}

export default LoopAnimation
