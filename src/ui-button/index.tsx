import React, {ReactChild, CSSProperties} from 'react'
import Ink from 'react-ink'

import {css} from '@emotion/core'
import styled from '@emotion/styled'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  info?: boolean
  primary?: boolean
  success?: boolean
  danger?: boolean
  warn?: boolean
  block?: boolean
  disabled?: boolean
  large?: boolean
}

interface OuterButtonProps extends ButtonProps {
  children: ReactChild
}

// prettier-ignore
const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  position: relative;
  cursor: pointer;

  font-size: 1em;
  font-weight: 500;
  text-decoration: none;

  width: auto;
  min-width: 6em;
  height: 2.6em;
  padding: 0.6em 1em;

  border-radius: 4px;

  color: #ffffff;
  background: #353e48;

  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

  ${(props: ButtonProps) => props.large && css`
    font-size: 1.4em;
  `}

  &:hover {
    transform: scale(1.03);
  }

  svg {
    margin-right: 0.3em;
  }

  ${(props: ButtonProps) => props.info && css`
    box-shadow: 0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2);
    background: #00d3ee;
  `}

  ${(props: ButtonProps) => props.primary && css`
    box-shadow: 0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2);
    background: #af2cc5;
  `}

  ${(props: ButtonProps) => props.success && css`
    box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
    background: #5cb860;
  `}

  ${(props: ButtonProps) => props.danger && css`
    box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2);
    background: #f55a4e;
  `}

  ${(props: ButtonProps) => props.warn && css`
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
    background: #ffa21a;
  `}

  ${(props: ButtonProps) => props.block && css`
    width: 100%;
  `}

  ${(props: ButtonProps) => props.disabled && css`
    color: #a3b4bb;
    background: #efefef;
    box-shadow: none;

    &:hover {
      background: #efefef;
    }
  `}
`

export const Button = ({children, ...props}: OuterButtonProps) => (
  <ButtonContainer {...props}>
    {children}

    <Ink />
  </ButtonContainer>
)
