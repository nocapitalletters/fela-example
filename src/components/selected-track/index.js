import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'
import Image from '../image';
import Heading from '../typography/heading';
import PlayControl from '../play-control';
import { useAtom } from 'jotai';
import { selectedTrack } from '../../shared/data'

const px = 'px';

const SelectedTrack = ({ size = 500 }) => {
    const [selectedTrackAtom, ] = useAtom(selectedTrack);

    const { css } = useFela({ size });

    return (
        <section className={css(style)}>
            <Image size={size} />
            <Heading fontSize={36} text={selectedTrackAtom.artist}/>
            <Heading h2 text={selectedTrackAtom.title} />
            <PlayControl pauseColor={'--maximum-yellow'} playColor={'#050505ff'} />
        </section>
    );
};

const style = ({ size }) => ({
    background: 'var(--cadet)',
    width: size * 1.5 + px,
    height: size * 2 + px,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 50 + px
});

export default SelectedTrack;