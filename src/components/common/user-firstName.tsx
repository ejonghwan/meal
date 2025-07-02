"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import { useUserStore } from '@/src/store/front/user';
import MapLoad from '@/src/components/maps/map-load'
import { Input } from '@heroui/input';
import MapSelect from '@/src/components/maps/map-select';
import Search from '../common/input/search';
import _ from 'lodash'
import { useEditRestaurant, useDeleteRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries';
import Like from '@/src/components/like/like';
import CommentWrap from '@/src/components/comment/comment-wrap';
import CommentCreate from '@/src/components/comment/comment-create';

import { Button } from '@/src/components/common/Button'


interface Props {
    className: string;
    user: any;
}


const UserFirstName = ({ user, className }: Props) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button type='button' size='none' onClick={onOpen} className={className ? className : ''}>
                {user?.displayName.slice(0, 1).toLocaleUpperCase()}
            </Button>

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
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
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