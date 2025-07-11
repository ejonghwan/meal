"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";

import UserFirstName from '@/src/components/common/user-firstName';
import { useUserStore } from '@/src/store/front/user';
import MapLoad from '@/src/components/maps/map-load'
import { Input } from '@heroui/input';
import MapSelect from '@/src/components/maps/map-select';
import Search from '../common/input/search';
import _ from 'lodash'
import { useEditRestaurant, useDeleteRestaurant, useLikeRestaurant } from '@/src/store/queryies/restaurant/restaurantQueries';
import Like from '@/src/components/like/like';
import CommentWrap from '@/src/components/comment/comment-wrap';
import CommentCreate from '@/src/components/comment/comment-create';
import { getRelativeTime, changeViewDate, timeForToday } from '@/src/utillity/utils';



const RestaurantItem = ({ restaurant }) => {

    const { mutate: editMutate, data: editData, isError: editError, isSuccess: editSuccess } = useEditRestaurant()
    const { mutate: deleteMutate, data: deleteData, isError: deleteError, isSuccess: deleteSuccess } = useDeleteRestaurant()
    const { mutate: likeRestaurantMutate, isError: likeRestaurantError, isPending: likeRestaurantPending, isSuccess: likeRestaurantSuccess } = useLikeRestaurant()

    const { userInfo } = useUserStore()
    const [editRestaurant, setEditRestaurant] = useState(restaurant)
    const [isEdit, setIsEdit] = useState(false)
    const [hasMyComment, setHasMyComment] = useState(restaurant.hasMyComment)



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
        // console.log('edit mutate ?', editRestaurant)
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

    // 기존
    // const handleClickLike = () => {
    //     // like 클릭 시 userId restaurantId 보냄
    //     LikeRestaurantMutate({ userId: userInfo.uid, restaurantId: restaurant.id })
    // }

    // 의존성 경고
    // const handleClickLike = useCallback(_.debounce((userId: string, restaurantId: string) =>
    //     likeRestaurantMutate({ userId, restaurantId }), 1200), [likeRestaurantMutate]);

    // 의존성 경고때문에  ref로 수정
    const debouncedLike = useRef(_.debounce((userId: string, restaurantId: string) => {
        likeRestaurantMutate({ userId, restaurantId });
    }, 1200)).current;



    return (
        <div className="asd">

            <div>
                {/* 좋아요 싫어요 구현 */}
                <Like
                    handleLikeClick={() => debouncedLike(userInfo.uid, restaurant.id)}
                    likeLength={restaurant.like}
                    hasMyLike={restaurant.hasMyLike}
                    isPending={likeRestaurantPending}
                    isError={likeRestaurantError}
                    isSuccess={likeRestaurantSuccess}
                    className='flex items-center ml-[15px] gap-[4px]'

                />
            </div>
            {restaurant?.user?.uid === userInfo?.uid && (
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
                        {restaurant.rating && <li> 작성자 평점 : {restaurant.rating}</li>}
                        {restaurant.created_at && (<li>{changeViewDate(restaurant.created_at, 'second')}</li>)}
                        {restaurant.updated_at && (<li>{timeForToday(restaurant.updated_at)} 수정됨</li>)}
                        {restaurant.category && <li>{restaurant.category}</li>}
                        {/* {restaurant.rating && <li>{restaurant.rating}</li>} */}
                        {restaurant.totalRating && <li>총 평점 : {restaurant.totalRating}</li>}
                        {/* 5.3.toFixed(1).includes('0') ? 5.0.toFixed(1).slice(0, 1) : 5.3.toFixed(1) */}

                        {<li>댓글 개수 : {restaurant.commentCount}</li>}
                        {<li>대댓글 개수 : {restaurant.recommentCount}</li>}
                    </ul>
                </>
            )}

            {/* create comment */}
            {/* ui는 나오게 하고 비로그인 시 로그인 페이지로 넘기는게 나을듯 */}
            {userInfo?.uid && !hasMyComment &&
                <CommentCreate
                    restaurantId={restaurant.id}
                    userId={restaurant.user.uid}
                    hasMyComment={hasMyComment}
                    setHasMyComment={setHasMyComment}
                />
            }

            {/* comment */}
            <CommentWrap restaurantId={restaurant.id} setHasMyComment={setHasMyComment} />



        </div>
    )
}

export default RestaurantItem



