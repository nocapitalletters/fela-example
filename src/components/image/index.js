import React, { useRef, useLayoutEffect, useEffect } from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'
import { useAtom } from 'jotai';
import { isPlayingConfig } from '../../state/atoms';
import { Circ, Power0, gsap } from 'gsap'

const px = 'px';



const Image = ({ size = 240, alt, src }) => {
  const [isPlayingAtom, ] = useAtom(isPlayingConfig);
  const imageRef = useRef(); // create a ref for the root level element (we'll use it later)

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.to("#fuckYou", { 
        ease: Circ.easeOut, 
        duration: 3, 
        rotation: "+=1440"
      });
      gsap.to("img", { 
        ease: Circ.easeOut, 
        duration: 4, 
        '--rich-black-fogra-39': '#ffe6ff'
      });
    }, imageRef);
    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      let playTween = gsap.to("#fuckYou", { 
        duration: 8, 
        repeat: -1,
        ease: Power0.easeNone, 
        rotation: "+=360"
      });
      if (isPlayingAtom) {
        console.log("it is playing: " + isPlayingAtom);
        playTween.play();
      } else {
        console.log("it is not playing: " + isPlayingAtom);
        playTween.pause();
      }
    }, imageRef);
    return () => context.revert();
  }, [isPlayingAtom]);

  const { css } = useFela({ size, isPlayingAtom });

  return (
    <div ref={imageRef}>
      <img id={'fuckYou'} alt={alt} src={src} className={css([baseStyleRule, styleRule])} /> 
    </div>);
}

const baseStyleRule = ({ size }) => ({
  height: size + px,
  width: size + px,
  marginTop: 80 + px,
  borderRadius: size/2 + px,
});

/* const rotationKeyframe = () => ({
  from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
}) */

const styleRule = ({ isPlayingAtom }, renderer) => ({
  border: isPlayingAtom ? `4px solid var(--maximum-yellow)` : `4px solid var(--rich-black-fogra-39)`,
  ':hover': {
    border: '4px solid var(--mountain-meadow)'
  },
  //animationName: isPlayingAtom ? renderer.renderKeyframe(rotationKeyframe) : 'none',
  //animationDuration: '5s',
  //animationIterationCount: 'infinite',
  //animationTimingFunction: 'linear'
});

export default Image;