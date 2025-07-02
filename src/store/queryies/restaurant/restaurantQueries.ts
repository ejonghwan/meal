import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadRestaurantListAPI, onLoadRestaurantDetailAPI, onCreateRestaurantAPI, onEditRestaurantAPI, onDeleteRestaurantAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'
import { RestaurantData } from '@/src/types/data/restaurant'



// 모든 글 로드
export const useRestaurantList = (page: number) => {
   return useQuery({
      queryKey: restaurantKeys.listAll(page),
      queryFn: () => onLoadRestaurantListAPI(page),
      staleTime: 60 * 1000,
      // staleTime: 3600,
      gcTime: 4000,
   })
}



// 상세 로드
export const useRestaurant = (restauranId: string) => {
   return useQuery({
      queryKey: restaurantKeys.detail(restauranId),
      queryFn: () => onLoadRestaurantDetailAPI(restauranId),
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

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: RestaurantData) => {
         return onEditRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: restaurantKeys.listAll(10) });
         console.log('쿼리쪽 edit data?', data, variables)
      },
   })
}



// 글 삭제
export const useDeleteRestaurant = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: { restaurantId: string, token: string }) => {
         return onDeleteRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: restaurantKeys.listAll(10) });
         console.log('쿼리쪽 delete data?', data, variables)
      },
   })
}








