'use client'

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface Props {
    id: string,
    placeholder?: string,
    register: UseFormRegister<FieldValues>
    type?: string
    required?: boolean
    errors: FieldErrors
}

const MessageInput: React.FC<Props> = ({ id, placeholder, register, required, errors, type }) => {
    return (
        <div className='relative w-full'>
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
            />
        </div>
    )
}

export default MessageInput