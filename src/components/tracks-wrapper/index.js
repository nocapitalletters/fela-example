import { React, useLayoutEffect, useRef } from 'react';
import { useFela } from 'react-fela';
import '../../styles/variables.css';
import { gsap, Circ } from 'gsap';
import { useAtom } from 'jotai';
import { selectedTrack } from '../../shared/data'

const TracksWrapper = ({ children }) => {

    const { css } = useFela();
    const trackRef = useRef();
    const [selectedTrackAtom, ] = useAtom(selectedTrack);

    //
    // On load animation
    //
    useLayoutEffect(() => {
        let context = gsap.context(() => {
        gsap.from('.animateTrack', { 
            ease: Circ.easeOut, 
            duration: 1, 
            x: -600,
            stagger: 0.2
        });
        }, trackRef);
        return () => context.revert();
    }, [selectedTrackAtom]);

    return <div ref={trackRef} className={css(style)}>{children}</div>
};

const style = () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column'
});

export default TracksWrapper;