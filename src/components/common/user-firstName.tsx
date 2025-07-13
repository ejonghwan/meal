"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import _ from 'lodash'



interface Props {
    className: string;
    user: any;
}


const UserFirstName = ({ user, className }: Props) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // console.log('user?', user)

    return (
        <>
            <button type='button' onClick={onOpen} className={`${className ? className : ''}`} style={{ background: user?.bg }}>
                {user?.displayName.slice(0, 1).toLocaleUpperCase()}
            </button>

            <Modal
                backdrop="blur"
                isOpen={isOpen}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    },
                }}
                onOpenChange={onOpenChange}
            >

                {/* user Modal */}
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{user?.displayName} 프로필</ModalHeader>
                            <ModalBody>
                                <div className='rounded-[50%] bg-gray-700 text-white size-[60px] p-[5px] flex items-center justify-center'>
                                    {/* {data.user && (
                                        <UserFirstName
                                            // userData={data.user}
                                            firstString={data.user.displayName?.slice(0, 1).toLocaleUpperCase()}
                                            className={'rounded-[50%] bg-gray-700 text-white size-[140px] p-[5px]'}
                                            onClick={onOpen}
                                        />
                                    )} */}
                                    {user?.displayName?.slice(0, 1).toLocaleUpperCase()}
                                </div>
                                <div>{user?.displayName}</div>
                                <div>{user?.email}</div>
                            </ModalBody>
                            {/* <ModalFooter>
                                <button type='button' color="danger" onClick={onClose}>
                                    Close
                                </button>
                                <button type='button' color="primary" onClick={onClose}>
                                    Action
                                </button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserFirstName