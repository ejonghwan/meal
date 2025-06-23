"use client"
import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import MapLoad from '@/src/components/maps/map-load'



const RestaurantItem = ({ restaurant }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { userInfo } = useUserStore()


    // 수정 mutation 추가 

    // 삭제 mutation 추가


    useEffect(() => {
        console.log('?restaurant', restaurant)
    }, [])


    return (
        <div className="asd">
            {restaurant.user.uid === userInfo.uid && (
                <div>
                    <button type='button'>수정</button>
                    <button type='button'>삭제</button>
                </div>
            )}

            {restaurant.user && (
                <UserFirstName
                    // userData={restaurant.user}
                    firstString={restaurant.user.displayName?.slice(0, 1).toLocaleUpperCase()}
                    className={'rounded-[50%] bg-gray-700 text-white size-[40px] p-[5px]'}
                    onClick={onOpen}
                />
            )}
            <MapLoad mapData={{ name: restaurant.mapInfo.name, rating: 4.5, location: { lat: restaurant.mapInfo.y, lng: restaurant.mapInfo.x } }} />
            <ul>
                <li>{restaurant.title}</li>
                <li>{restaurant.content}</li>
                <li>{restaurant.created_at}</li>
                <li>{restaurant.category}</li>
                <li>{restaurant.address}</li>
                <li>{restaurant.rating}</li>
                <li>{restaurant.userId}</li>
            </ul>

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
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <div>
                                    {restaurant.user && (
                                        <UserFirstName
                                            // userData={restaurant.user}
                                            firstString={restaurant.user.displayName?.slice(0, 1).toLocaleUpperCase()}
                                            className={'rounded-[50%] bg-gray-700 text-white size-[140px] p-[5px]'}
                                            onClick={onOpen}
                                        />
                                    )}
                                </div>
                                <div>{restaurant.user.displayName}</div>
                                <div>{restaurant.user.email}</div>
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
        </div>
    )
}

export default RestaurantItem



