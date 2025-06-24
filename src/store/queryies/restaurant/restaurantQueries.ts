import { useMutation, useQuery } from '@tanstack/react-query'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onRestaurantListLoadAPI, onRestaurantDetailLoadAPI, onCreateRestaurantAPI, onEditRestaurantAPI, onDeleteRestaurantAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'
import { RestaurantData } from '@/src/types/data/restaurant'




// 모든 글 로드
export const useRestaurantListAll = (page: number) => {
   return useQuery({
      queryKey: restaurantKeys.listAll(page),
      queryFn: () => onRestaurantListLoadAPI(page),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}



// 상세 로드
export const useRestaurantList = (restauranId: string) => {
   return useQuery({
      queryKey: restaurantKeys.detail(restauranId),
      queryFn: () => onRestaurantDetailLoadAPI(restauranId),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}



// 글쓰기
export const useCreateRestaurant = () => {
   return useMutation({
      mutationFn: (payload: RestaurantData) => {
         console.log('query fn ? ', payload)
         return onCreateRestaurantAPI(payload)
      },
   })
}



// 글 수정
export const useEditRestaurant = () => {
   return useMutation({
      mutationFn: (payload: RestaurantData) => {
         return onEditRestaurantAPI(payload)
      },
   })
}



// 글 삭제
export const useDeleteRestaurant = () => {
   return useMutation({
      mutationFn: (payload: { restaurantId: string, token: string }) => {
         return onDeleteRestaurantAPI(payload)
      },
   })
}








