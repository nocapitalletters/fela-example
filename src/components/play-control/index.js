import { React, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
import { useFela } from 'react-fela'
import { useAtom } from 'jotai';
import { isPlayingConfig, timeRemainingConfig } from '../../state/atoms';
import { gsap } from 'gsap'
import { selectedTrack } from '../../shared/data'

const px = 'px';

//
// Reflektion: gsap lirar inte med css-variabler så som jag skulle vilja. Alltså man kan inte använda css-variabeln som en konstant och animera till den, utan man animerar isåfall själva värdet av variabeln 
// Det här gör att jag skulle behöva plocka ut värdet av prop pauseColor som är == namnet på css-variabeln för att kunna animera den, tar bort lite poängen med att ha css-variabler...
//
// Det är också såhär att om jag _inte_ sätter mina tweens i en effect hook så får jag fula varningsmeddelanden i consolen
// Men om jag sätter de i en effect hook så tycker jag att jag får mer boilerplate då jag är tvingad att ha de i en timeline som är reffad och slå mot timeline.current 
//
// Timing issues med audio när man byter låt
//
const PlayControl = ({ playColor, pauseColor }) => {

    const [isPlayingAtom, setIsPlayingAtom] = useAtom(isPlayingConfig);
    const [timeRemaining, setTimeRemaining] = useAtom(timeRemainingConfig);

    const [selectedTrackAtom, ] = useAtom(selectedTrack);
    const audio = useMemo(() => { return new Audio(selectedTrackAtom.audio)}, [selectedTrackAtom]);

    const { css } = useFela({ playColor, pauseColor, isPlayingAtom });

    //
    // Gsap timeline
    //
    const timeline = useRef(gsap.timeline({ paused: true }));

    //
    // Time format method
    //
    const formatTime = (remaining) => {
        let seconds = Math.floor(remaining);
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        if (seconds < 10) {
            seconds = '0' + seconds.toString();
        }
        return `${minutes}:${seconds}`
    }

    //
    // Tweens
    //
    useLayoutEffect(() => {
        timeline.current
        .to('#remaining', { 
            color: '#ffe6ff',
            y: 4,
            duration: 0.2,
            fontWeight: 'bold',
            fontSize: '32px'
        });
    }, [timeline]);

    //
    // Render time remaining method
    //
    const renderTimeRemaing = () => {
        if (isPlayingAtom) {
            setTimeRemaining(formatTime(audio.duration - audio.currentTime));
       }
    }

    //
    // Set interval function to fire render time remaining method every second
    //
    let timeRemainingInterval = setInterval(renderTimeRemaing, 1000);

    //
    // Audio event handlers
    //
    useEffect(() => {
        audio.onloadedmetadata = (event) => {
            setTimeRemaining(formatTime(audio.duration));
        };
        audio.onended = (event) => {
            setIsPlayingAtom(false);
            //
            // Clean up interval function
            //
            clearInterval(timeRemainingInterval);
        };
    }, [selectedTrackAtom, audio, setTimeRemaining, setIsPlayingAtom, timeRemainingInterval]);

    //
    // Toggle play method
    //
    const togglePlay = () => {
        if (!isPlayingAtom) {
            audio.play();
            timeline.current.play();
        } else {
            timeline.current.reverse();
            audio.pause();  
        }
        setIsPlayingAtom(!isPlayingAtom);
    };

    //
    // Dynamic play control text
    //
    const playControlText = isPlayingAtom ? 'II' : "\u25b6";

    return (
        <>
            <span onClick={() => togglePlay()} className={css(stylePlayControl)}>{playControlText}</span>
            <p id={'remaining'} className={css(styleTime)}>{ timeRemaining }</p>
        </>
    );
}

const stylePlayControl = ({ playColor, pauseColor, isPlayingAtom }) => ({
    fontSize: 56 + px,
    color: isPlayingAtom ? `var(${pauseColor})` : `var(${playColor})`,
    marginTop: 24 + px,
    cursor: 'pointer'
});

const styleTime = () => ({
    fontSize: 20 + px,
    fontFamily: 'monospace'
});

export default PlayControl;