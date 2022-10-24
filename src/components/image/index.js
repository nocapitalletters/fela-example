import React, { useRef, useLayoutEffect } from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'
import { useAtom } from 'jotai';
import { isPlayingConfig } from '../../state/atoms';
import { Circ, Power0, gsap } from 'gsap'
import { selectedTrack } from '../../shared/data'

const px = 'px';

const Image = ({ size = 240}) => {
  //
  // Fetch state atom
  //
  const [isPlayingAtom, ] = useAtom(isPlayingConfig);
  const [selectedTrackAtom, ] = useAtom(selectedTrack);
  const imageRef = useRef();
  const wrapperRef = useRef();
  //
  // Create gsap timeline
  //
  const timeline = useRef(gsap.timeline({ paused: true }));

  console.log(selectedTrackAtom.title)

  //
  // On load animation
  //
  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.to('img', { 
        ease: Circ.easeOut, 
        duration: 3, 
        rotation: "+=1440"
      });
    }, imageRef);
    return () => context.revert();
  }, [selectedTrackAtom]);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.to('div', { 
        ease: Circ.easeOut, 
        duration: 6, 
        '--rich-black-fogra-39': '#ffe6ff'
      });
    }, wrapperRef);
    return () => context.revert();
  }, [selectedTrackAtom]);

  //
  // Music playing animation
  //
  useLayoutEffect(() => {
    timeline.current
      .to('img', { 
        duration: 8, 
        repeat: -1,
        ease: Power0.easeNone, 
        rotation: "+=360"
      })
  }, [timeline]);

  useLayoutEffect(() => {
    isPlayingAtom ? timeline.current.play() : timeline.current.pause();   
  }, [isPlayingAtom, timeline]);

  //
  // Pass state to Fela
  //
  const { css } = useFela({ size, isPlayingAtom });

  return (
    <div ref={wrapperRef}>
      <div ref={imageRef} className={css([containerStyle, styleRule])}>
        <img alt={selectedTrackAtom.artist} src={selectedTrackAtom.image} className={css(baseStyleRule)} /> 
      </div>
    </div>
    );
}

//
// Style rules
//
const baseStyleRule = ({ size }) => ({

});

const styleRule = ({ isPlayingAtom }) => ({
  border: isPlayingAtom ? `4px solid var(--maximum-yellow)` : `4px solid var(--rich-black-fogra-39)`,
  ':hover': {
    border: '4px solid var(--mountain-meadow)'
  }
});

const containerStyle = ({ size }) => ({
  height: size + px,
  width: size + px,
  overflow: 'hidden',
  borderRadius: size/2 + px,
  marginTop: 80 + px,
  display: 'flex',
  justifyContent: 'center'
});

export default Image;