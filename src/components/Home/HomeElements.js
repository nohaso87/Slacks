import styled from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 0.5fr 2fr 6fr 2.5fr
`
export const Panel = styled.div`
    padding-left: 20px;
    
    &:first-child {
        background-color: blue;
    }

    &:nth-child(2) {
        background-color: #fff;
    }

    &:nth-child(3) {
        background-color: green;
    }

    &:last-child {
        background-color: yellow
    }
`
export const SlacksLogo = styled.h2`
    font-family: 'Josefin Sans', sans-serif;
    color: orange;
`
export const Avatar = styled.div``