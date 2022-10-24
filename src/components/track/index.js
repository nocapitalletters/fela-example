import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'
import { useAtom } from 'jotai';
import { selectedTrack } from '../../shared/data'
import { isPlayingConfig } from '../../state/atoms';

const px = 'px';

const Track = ({ track }) => {

    const [isPlayingAtom, setIsPlayingAtom] = useAtom(isPlayingConfig);
    const [selectedTrackAtom, setIsSelectedTrackAtom] = useAtom(selectedTrack)
    const isSelected = selectedTrackAtom.id === track.id;
    const { css } = useFela({ isSelected, isPlayingAtom });

    const changeTrack = () => {
        if (isPlayingAtom) {
            return
        } else {
            setIsSelectedTrackAtom(track);
            setIsPlayingAtom(false);
        }
    };

    return (
        <div onClick={() => changeTrack()} className={css(style)}>
            <p>{track.title}</p>
            <p>{track.artist}</p>
        </div>
    );
};

const style = ({ isSelected, isPlayingAtom }) => ({
    background: isSelected ? '#556f7aff' : '#5c4b4b',
    color: '#ffe6ff',
    height: 100 + px,
    width: 280 + px,
    marginTop: 30 + px,
    padding: 20 + px,
    borderRadius: 2 + px,
    cursor: isSelected ? 'none' : isPlayingAtom ? 'not-allowed' : 'pointer',
    border: isSelected ? '1px solid #ffe6ff' : 'none'
});

export default Track;