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
import { PiChatCircleTextDuotone, PiChatCenteredTextDuotone, PiPencilSimpleLineDuotone, PiStarDuotone, PiPhoneDuotone, PiDeviceMobileCameraDuotone, PiMapTrifoldDuotone, PiMapPinSimpleAreaDuotone, PiMapPinLineDuotone, PiPawPrintDuotone, PiCarrotDuotone, PiFileXDuotone, PiGearDuotone, PiXDuotone, PiTrashDuotone, PiCheckDuotone, PiArrowCircleRightDuotone } from "react-icons/pi";
import { Button } from '@heroui/button';
import Link from 'next/link';
import Divider from '../common/divider';
import CategoryWrap from '../common/category/category-wrap';
import { categorys } from '../common/category/category-data';



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
    }, 500, { leading: true, trailing: false })).current;



    return (
        <div>
            <Divider className='h-[2px] mb-[15px] bg-bg100 mx-[0px]' />
            <div className='flex flex-wrap items-center mb-[10px]'>
                <div className='w-full flex items-center gap-[5px] justify-end'>
                    <Link href={`/restaurant/detail/${restaurant.id}?hoho=zzzz`} className='flex gap-[5px] items-center mb-[5px]'>
                        <span className='text-[13px] text-[#d3d3d3]'>상세글 보기</span>
                        <span><PiArrowCircleRightDuotone /></span>
                    </Link>
                </div>
                {restaurant.user && (
                    <UserFirstName
                        user={restaurant.user}
                        className={'rounded-[50%] bg-gray-700 text-white size-[30px] text-[14px] flex items-center justify-center p-[5px] mr-[10px]'}
                    />
                )}
                <span>{restaurant.user.displayName}</span>
                <div className='flex flex-wrap items-center gap-[12px] ml-auto'>
                    {/* 좋아요 싫어요 구현 */}
                    <Like
                        handleLikeClick={() => debouncedLike(userInfo.uid, restaurant.id)}
                        likeLength={restaurant.like}
                        hasMyLike={restaurant.hasMyLike}
                        isPending={likeRestaurantPending}
                        isError={likeRestaurantError}
                        isSuccess={likeRestaurantSuccess}
                        className='flex items-center gap-[2px] p-0'
                        icoClassName='p-[0px] size-[18px] min-w-0'
                        isLength={false}
                    />

                    {restaurant?.user?.uid === userInfo?.uid && (
                        <div className='flex justify-end items-center gap-[10px]'>
                            {isEdit ? (
                                <>
                                    {/* 내용 수정되면 디세이블 풀고 프라이마리로  */}
                                    <button className='flex gap-[2px] items-center' type='button' onClick={() => setIsEdit(prev => !prev)}>
                                        <span><PiXDuotone className='size-[18px]' /></span>
                                        <span className='text-[13px] text-[#d3d3d3] mt-[2px]'>취소</span>
                                    </button>
                                    <button className='flex gap-[2px] items-center' type='button' onClick={handleEditComplate}>
                                        <span><PiCheckDuotone className='size-[18px]' /></span>
                                        <span className='text-[13px] text-[#d3d3d3] mt-[2px]'>완료</span>
                                    </button>

                                </>
                            ) : (
                                <>
                                    <button className='flex gap-[2px] items-center' type='button' onClick={() => setIsEdit(prev => !prev)}>
                                        <span><PiGearDuotone className='size-[18px]' /></span>
                                        <span className='text-[13px] text-[#d3d3d3] mt-[2px]'>수정</span>
                                    </button>
                                    <button className='flex gap-[2px] items-center' type='button' onClick={handleDelete}>
                                        {/* <span><PiFileXDuotone className='size-[18px]' /></span> */}
                                        <span><PiTrashDuotone className='size-[18px]' /></span>
                                        <span className='text-[13px] text-[#d3d3d3] mt-[2px]'>삭제</span>
                                    </button>

                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>

            {/* PiMeteorBold 귀여운 운석 */}
            {/* PiBowlFoodDuotone 밥아이콘 */}
            {/* PiChefHatDuotone  요리모자  */}
            {/* PiCheeseDuotone  치즈 */}
            {/* PiCookieDuotone  쿠키 */}
            {/* PiCowFill 흑우 */}

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
                    <div className="flex flex-col gap-1 w-full mt-[20px]">
                        <CategoryWrap category={categorys} defaultValue={restaurant.category} setRestaurant={setEditRestaurant} />
                    </div>
                </>
            ) : (
                <>
                    {restaurant.mapInfo && <MapLoad mapData={{ name: restaurant.mapInfo.name, rating: restaurant.totalRating, location: { lat: restaurant.mapInfo.y, lng: restaurant.mapInfo.x } }} />}
                    <ul className='mt-[20px]'>
                        {restaurant.title && (
                            <li className='flex gap-[5px]'>
                                <span><PiChatCircleTextDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>상호명</span><br />
                                    <span className='block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.title}</span>
                                </span>
                            </li>
                        )}
                        {restaurant.content && (
                            <li className='flex gap-[5px] mt-[15px] '>
                                <span><PiPencilSimpleLineDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>리뷰</span><br />
                                    <span className='block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.content}</span>
                                </span>
                            </li>
                        )}
                        {restaurant.mapInfo.adress && (
                            <li className='flex gap-[5px] mt-[15px]'>
                                <span><PiMapPinLineDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>분류 / 주소</span><br />
                                    <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.mapInfo.category}</span><br />
                                    <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.mapInfo.adress}</span>
                                </span>
                            </li>
                        )}
                        {restaurant.mapInfo.phone && (
                            <li className='flex gap-[5px] mt-[15px]'>
                                {/* <span><PiPhoneDuotone className='text-[20px]' /></span> */}
                                <span><PiDeviceMobileCameraDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>전화번호</span><br />
                                    <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.mapInfo.phone}</span>
                                </span>
                            </li>
                        )}
                        {restaurant.category && (
                            <li className='flex gap-[5px] mt-[15px]'>
                                <span><PiCarrotDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>카테고리</span><br />
                                    <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>{restaurant.category}</span>
                                </span>
                            </li>
                        )}
                        {restaurant.rating && (
                            <li className='flex gap-[5px] mt-[15px]'>
                                <span><PiStarDuotone className='text-[20px]' /></span>
                                <span className='text-[14px] text-[#c4c4c4]'>
                                    <span>평점</span><br />
                                    <span className='flex gap-[5px]'>
                                        <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>글쓴이 점수 {restaurant.rating} 점</span>
                                        <span className='inline-block mt-[5px] p-[10px] rounded-[14px] bg-[#27272a]'>총 점수 {restaurant.totalRating} 점</span>
                                    </span>
                                </span>
                            </li>
                        )}

                        {/* PiPawPrintDuotone  */}
                        {/* {restaurant.created_at && (<li>{changeViewDate(restaurant.created_at, 'second')}</li>)} */}
                        {/* {restaurant.updated_at && (<li>{timeForToday(restaurant.updated_at)} 수정됨</li>)} */}
                        {/* {restaurant.category && <li>카테고리 : {restaurant.category}</li>} */}
                        {/* {restaurant.rating && <li>{restaurant.rating}</li>} */}
                        {/* {restaurant.totalRating && <li>총 평점 : {restaurant.totalRating}</li>} */}
                        {/* 5.3.toFixed(1).includes('0') ? 5.0.toFixed(1).slice(0, 1) : 5.3.toFixed(1) */}
                        {/* {<li>댓글 개수 : {restaurant.commentCount}</li>} */}
                        {/* {<li>대댓글 개수 : {restaurant.recommentCount}</li>} */}
                    </ul>
                </>
            )}

            <Divider className='h-[2px] my-[30px] bg-bg100 mx-[0px]' />


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



