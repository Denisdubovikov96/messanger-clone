"use client"
import classNames from 'classnames';
import React from 'react'

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    fW?: boolean
    children?: React.ReactNode
    color?: "primary" | "secondary" | "danger"
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type,color = 'primary',fW }) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={classNames(`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `, {
                ['bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 text-white']: color === 'danger',
                ['text-gray-900']: color === 'secondary',
                ['text-white bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600']: color === 'primary',
                ['opacity-50 cursor-default']: disabled,
                ['w-full']: fW
            })}
        >
            {children}
        </button>
    )
}

export default Button