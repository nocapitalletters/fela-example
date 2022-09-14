import { React } from 'react'
import { useFela } from 'react-fela'
import { useAtom } from 'jotai';
import { isPlayingConfig } from '../../state/atoms';

const px = 'px';

const PlayControl = ({ playColor, pauseColor, audio }) => {

    const [isPlayingAtom, setIsPlayingAtom] = useAtom(isPlayingConfig);

    const { css } = useFela({ playColor, pauseColor, isPlayingAtom });
    
    const togglePlay = () => {
        if (!isPlayingAtom) {
            audio.play();
        } else {
            audio.pause();
        }
        setIsPlayingAtom(!isPlayingAtom);
    };

    const text = isPlayingAtom ? 'II' : "\u25b6";

    return <span onClick={() => togglePlay()} className={css(styleRule)}>{text}</span>
}

const styleRule = ({ playColor, pauseColor, isPlayingAtom }) => ({
    fontSize: 56 + px,
    color: isPlayingAtom ? `var(${pauseColor})` : `var(${playColor})`,
    marginTop: 24 + px
});

export default PlayControl;