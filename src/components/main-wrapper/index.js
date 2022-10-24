import React from 'react'
import { useFela } from 'react-fela'
import '../../styles/variables.css'

const MainWrapper = ({ children }) => {

    const { css } = useFela();

    return <section className={css(style)}>{children}</section>
};

const style = () => ({
    background: 'transparent',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
});

export default MainWrapper;