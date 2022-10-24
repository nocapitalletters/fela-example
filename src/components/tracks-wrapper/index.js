import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'

const px = 'px';

const TracksWrapper = ({ children }) => {

    const { css } = useFela();

    return <div className={css(style)}>{children}</div>
};

const style = () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column'
});

export default TracksWrapper;