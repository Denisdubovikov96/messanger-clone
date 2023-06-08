'use client'

import React from 'react'
import Modal from '#/components/UI/Modal'
import { useRouter } from 'next/navigation'
import useConversation from '#/hooks/useConversation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from '@headlessui/react'
import Button from '#/components/UI/Button'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const ConfirmModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const router = useRouter()
    const { conversationId } = useConversation()
    const [isLoading, setIsLoading] = React.useState(false)

    const onDelete = React.useCallback(() => {
        setIsLoading(true)

        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose()
            router.push('/conversations')
        })
        .catch(()=> toast("Something went wrong"))
        .finally(() => {
            setIsLoading(false)
        })
    }, [conversationId,router,onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='sm:flex sm:items-center'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <FiAlertTriangle className='h-6 w-6 text-red-600'/>
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <Dialog.Title
                        as='h3'
                        className='text-base font-semibold loading-6 text-gray-900'
                    >
                    </Dialog.Title>
                        <div className='mt-2'>
                            <p className='text-sm text-gray-500'>
                                Are you sure you want to delete?
                            </p>
                        </div>
                </div>
            </div>

            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <Button
                    color='danger'
                    disabled={isLoading}
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    color='secondary'
                    disabled={isLoading}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal