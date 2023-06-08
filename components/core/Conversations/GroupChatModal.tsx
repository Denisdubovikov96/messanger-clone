"use client"
import Button from '#/components/UI/Button'
import Input from '#/components/UI/form/Input'
import Select from '#/components/UI/form/Select'
import Modal from '#/components/UI/Modal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
    isOpen: boolean,
    onClose: () => void,
    users: User[]
}

const GroupChatModal: React.FC<Props> = ({
    isOpen,
    onClose,
    users
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: []
        }
    })

    const members = watch('members')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post("/api/conversations", { ...data, isGroup: true })
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => {
                toast.error("Something went Wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Create group chat
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Create chat with 2 more users
                        </p>

                        <div className='mt-10 flex flex-col gap-y-8'>
                            <Input
                                register={register}
                                id='name'
                                label='Name'
                                required
                                errors={errors}
                                disabled={isLoading}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={
                                    users.map((user) => ({ value: user.id, label: user.name }))
                                }
                                onChange={(v) => setValue('members', v, { shouldValidate: true })}
                                value={members}
                            />
                        </div>

                    </div>

                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <Button
                            onClick={onClose}
                            disabled={isLoading}
                            type='button'
                            color='secondary'
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type='submit'
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal