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
import { useEditRestaurant, useDeleteRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries';
import Like from '@/src/components/like/like';
import CommentWrap from '@/src/components/comment/comment-wrap';
import CommentCreate from '@/src/components/comment/comment-create';



const RestaurantItem = ({ restaurant }) => {

    const { mutate: editMutate, data: editData, isError: editError, isSuccess: editSuccess } = useEditRestaurant()
    const { mutate: deleteMutate, data: deleteData, isError: deleteError, isSuccess: deleteSuccess } = useDeleteRestaurant()
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
    const handleEditComplate = () => {
        const savedToken = localStorage.getItem('x-acc-token');
        console.log('edit mutate ?', editRestaurant)
        setIsEdit(prev => !prev)
        editMutate({
            ...editRestaurant,
            token: savedToken,
            restaurantId: editRestaurant.id
        })
    }



    // 삭제 mutation 추가
    const handleDelete = () => {
        const savedToken = localStorage.getItem('x-acc-token');
        const isDelete = confirm('정말 삭제하시겠습니까?')
        if (!isDelete) return;
        deleteMutate({
            token: savedToken,
            restaurantId: editRestaurant.id
        })
    }


    console.log('?????????????????', restaurant)


    return (
        <div className="asd">

            <div>
                {/* 좋아요 싫어요 구현 */}
                <Like />
            </div>
            {restaurant.user.uid === userInfo.uid && (
                <div>
                    {isEdit ? (
                        <>
                            <button type='button' onClick={() => setIsEdit(prev => !prev)}>취소</button>
                            <button type='button' onClick={handleEditComplate}>수정완료</button>
                        </>
                    ) : (
                        <>
                            <button type='button' onClick={() => setIsEdit(prev => !prev)}>수정</button>
                            <button type='button' onClick={handleDelete}>삭제</button>
                        </>
                    )}
                </div>
            )}

            {restaurant.user && (
                <UserFirstName
                    user={restaurant.user}
                    className={'rounded-[50%] bg-gray-700 text-white size-[40px] p-[5px]'}
                />
            )}

            {isEdit ? (
                <>
                    <strong className='block mb-[10px] text-[18px]'>가게명 검색</strong>
                    <Search className='w-full mb-[10px]' onChange={handleSearchInputChange} value={searchValue} setSearchValue={setSearchValue} />
                    <MapSelect
                        initialMapData={restaurant.mapInfo.name}
                        keyword={keyword}
                        restaurant={editRestaurant}
                        setRestaurant={setEditRestaurant}
                    />
                </>
            ) : (
                <>
                    {restaurant.mapInfo && <MapLoad mapData={{ name: restaurant.mapInfo.name, rating: restaurant.totalRating, location: { lat: restaurant.mapInfo.y, lng: restaurant.mapInfo.x } }} />}
                    <ul>
                        {restaurant.title && <li>{restaurant.title}</li>}
                        {restaurant.content && <li>{restaurant.content}</li>}
                        {restaurant.created_at && <li>{restaurant.created_at}</li>}
                        {restaurant.updated_at && <li>{restaurant.updated_at} 수정됨</li>}
                        {restaurant.category && <li>{restaurant.category}</li>}
                        {/* {restaurant.rating && <li>{restaurant.rating}</li>} */}
                        {restaurant.totalRating && <li>{restaurant.totalRating}</li>}
                    </ul>
                </>
            )}

            {/* create comment */}
            <CommentCreate restaurantId={restaurant.id} userId={restaurant.user.uid} />

            {/* comment */}
            <CommentWrap restaurantId={restaurant.id} />



        </div>
    )
}

export default RestaurantItem



