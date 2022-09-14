
import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'

const px = 'px';

const Wrapper = ({ children, size }) => {

    const { css } = useFela({ size });

    return <section className={css(style)}>{children}</section>
};

const style = ({ size }) => ({
    background: 'var(--cadet)',
    width: size * 1.5 + px,
    height: size * 2 + px,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
});

export default Wrapper;