import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'
import { useAtom } from 'jotai';
import { isPlayingConfig } from '../../state/atoms';

const px = 'px';

const Image = ({ size = 240, alt, src }) => {

  const [isPlayingAtom, ] = useAtom(isPlayingConfig);
  const { css } = useFela({ size, isPlayingAtom });

  return <img 
    alt={alt} 
    src={src} 
    className={css([baseStyleRule, styleRule])} />
}

const baseStyleRule = ({ size }) => ({
  height: size + px,
  width: size + px,
  marginTop: 80 + px,
  borderRadius: size/2 + px,
});

const rotationKeyframe = () => ({
  from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
})

const styleRule = ({ isPlayingAtom }, renderer) => ({
  border: isPlayingAtom ? `4px solid var(--maximum-yellow)` : `4px solid var(--rich-black-fogra-39)`,
  ':hover': {
    border: '4px solid var(--mountain-meadow)'
  },
  animationName: isPlayingAtom ? renderer.renderKeyframe(rotationKeyframe) : 'none',
  animationDuration: '5s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear'
});

export default Image;