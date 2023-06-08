"use client"

import React from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import Input from '#/components/UI/form/Input'
import Button from '#/components/UI/Button'
import AuthSocialBtn from './AuthSocialBtn'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

type Variant = 'login' | 'register'

const AuthForm = ({ }) => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = React.useState<Variant>('login')
    const [isLoading, setIsLoading] = React.useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    React.useEffect(() => {

        if (session.status === 'authenticated') {
            router.push("/users")
        }

    }, [session.status,router])

    const toggle = React.useCallback(() => {
        // setVariant((prev) => )
        if (variant === 'login') {
            setVariant('register')
        } else {
            setVariant('login')
        }
    }, [variant])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'login') {
            // log in req
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid credentials")
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged In')
                    router.push("/users")
                }
            }).finally(() => setIsLoading(false))
        }

        if (variant === 'register') {
            // reg  req
            axios.post('/api/register', data)
                .then(() => signIn("credentials", data))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (act: string) => {
        setIsLoading(true);

        // logic here
        signIn(act, { redirect: false }).then((callback) => {
            if (callback?.error) {
                toast.error("Invalid credentials")
            }

            if (callback?.ok && !callback?.error) {
                toast.success('Logged In')
                router.push("/users")
            }
        }).finally(() => setIsLoading(false))
    }

    return (
        <div
            className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md '
        >
            <div
                className=' bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 '
            >
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'register' && (
                        <Input
                            label='Name'
                            id='name'
                            register={register}
                            errors={errors}
                        />
                    )}
                    <Input
                        label='Email'
                        id='email'
                        type='email'
                        register={register}
                        errors={errors}
                    />
                    <Input
                        label='Password'
                        id='password'
                        type='password'
                        register={register}
                        errors={errors}
                    />

                    <div>
                        <Button
                            color='primary'
                            fW
                            disabled={isLoading}
                            type='submit'
                        >
                            {variant === 'register' ? "Register" : "Login"}
                        </Button>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className='relative'>
                        <div className=' absolute inset-0 flex items-center '>
                            <div className=' w-full border-t border-gray-300 ' />
                        </div>

                        <div className=' relative flex justify-center  text-sm'>
                            <span
                                className='bg-white px-2 text-gray-400'
                            >
                                Continue with
                            </span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialBtn
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialBtn
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>

                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                    <div>
                        {variant === 'login' ? "New to Messanger?" : "Already have an account"}
                    </div>
                    <div
                        onClick={toggle}
                        className="underline cursor-pointer"
                    >
                        {variant === 'login' ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm