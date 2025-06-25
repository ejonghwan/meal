"use client"
import React, { useRef, useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import MapLoad from '@/src/components/maps/map-load'
import { Input } from '@heroui/input';
import MapSelect from '@/src/components/maps/map-select';
import Search from '../common/input/search';
import _ from 'lodash'



const RestaurantItem = ({ restaurant }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { userInfo } = useUserStore()
    const [editRestaurant, setEditRestaurant] = useState(restaurant)
    const [isEdit, setIsEdit] = useState(false)


    // 수정 컴포넌트 정리 다시 해야될듯
    const [searchValue, setSearchValue] = useState('')
    const [keyword, setKeyword] = useState('')


    const debounceRef = useRef<(val: string) => void>();
    useEffect(() => {
        debounceRef.current = _.debounce((val: string) => {
            setKeyword(val); // 검색어 확정
        }, 1200); //1.2초 후 검색요청
    }, []);


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);              // 즉시 반영 (인풋 UI)
        debounceRef.current?.(val);      // 디바운스 반영 (검색 요청용)
    };

    // 수정 mutation 추가 
    

    // 삭제 mutation 추가


    useEffect(() => {
        console.log('?restaurant', restaurant)
    }, [])


    return (
        <div className="asd">
            {restaurant.user.uid === userInfo.uid && (
                <div>
                    <button type='button' onClick={() => setIsEdit(prev => !prev)}>수정</button>
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

            {/* 지도 */}
            {restaurant.mapInfo && <MapLoad mapData={{ name: restaurant.mapInfo.name, rating: 4.5, location: { lat: restaurant.mapInfo.y, lng: restaurant.mapInfo.x } }} />}

            <ul>
                {isEdit ? (
                    <>
                        <article>
                            <strong className='block mb-[10px] text-[18px]'>가게명 검색</strong>
                            <div className='flex gap-[10px]'>

                                <Search className='w-full' onChange={handleSearchInputChange} value={searchValue} />
                                {/* key 멈추면 submit 으로 변경*/}
                                {/* <Button className='w-[150px] h-auto' type='submit' color="primary" >검색</Button> */}
                            </div>
                        </article>
                        <MapSelect keyword={keyword} restaurant={editRestaurant} setRestaurant={setEditRestaurant} />
                    </>
                ) : '취소'}
                {restaurant.title && <li>{restaurant.title}</li>}
                {restaurant.content && <li>{restaurant.content}</li>}
                {restaurant.created_at && <li>{restaurant.created_at}</li>}
                {restaurant.category && <li>{restaurant.category}</li>}
                {restaurant.rating && <li>{restaurant.rating}</li>}
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

                {/* user Modal */}
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



