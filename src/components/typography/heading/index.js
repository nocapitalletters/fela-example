import React from 'react'
import { useFela } from 'react-fela'
import '../../../styles/variables.css'

const px = 'px';

const Heading = ({
    h1,
    h2,
    h3,
    h4,
    h5,
    color = '--pale-purple-pantone',
    fontSize, 
    text = 'Lorem Ipsum' }) => {

        const isH1 = h1 || (!h2 && !h3 && !h4 && !h5);
        const { css } = useFela({ fontSize, color, isH1 });

        const Component = () => {
            if (h2) {
                return <h2 className={css([styleRule, typographyRule])}>{text}</h2>
            } else if (h3) {
                return <h3 className={css(styleRule, typographyRule)}>{text}</h3>
            } else if (h4) {
                return <h4 className={css(styleRule, typographyRule)}>{text}</h4>
            } else if (h5) {
                return <h5 className={css(styleRule, typographyRule)}>{text}</h5>
            } else {
                return <h1 className={css([styleRule, typographyRule])}>{text}</h1>
            }
        }

        const styleRule = ({ color, isH1 }) => ({
            color: `var(${color})`,
            marginTop: isH1 ? 48 + px : 0,
            marginBottom: 12 + px 
        });

        const typographyRule = ({ fontSize }) => ({
            fontSize: fontSize ? fontSize + px : 'default',
        });

    return <Component />
};

export default Heading;