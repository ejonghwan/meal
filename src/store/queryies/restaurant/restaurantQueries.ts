import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadRestaurantListAPI, onLoadRestaurantDetailAPI, onCreateRestaurantAPI, onEditRestaurantAPI, onDeleteRestaurantAPI, onLikeRestaurantAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'
import { RestaurantData, RestaurantLikeData } from '@/src/types/data/restaurant'
import { useInfiniteQuery } from '@tanstack/react-query'


// 모든 글 로드
export const useRestaurantListInfinite = (limit: number, categoryName: string) => {
   return useInfiniteQuery({
      queryKey: ['restaurant', 'listInfinite', categoryName],
      queryFn: ({ pageParam }) => {
         const { cursor, cursorId } = pageParam || {};
         // pageParam은 요청 보낼 때의 값
         // console.log('언제 실행되는지 ?', pageParam)

         return onLoadRestaurantListAPI(limit, categoryName, cursor, cursorId);
      },
      getNextPageParam: (lastPage) => {
         // 백엔드에서 넘겨준 다음 커서 정보
         // console.log('백엔드에서 넘겨준 다음 커서정보', lastPage)
         // if (!lastPage?.nextCursor || !lastPage?.nextCursorId) return undefined;
         if (lastPage?.data?.length < 10) return undefined;

         return {
            cursor: lastPage.nextCursor,
            cursorId: lastPage.nextCursorId,
         };
      },
      initialPageParam: {
         cursor: null,
         cursorId: null,
      },
      staleTime: 1000 * 60,
   });
};



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


// 글 좋아요
export const useLikeRestaurant = () => {

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: RestaurantLikeData) => {
         return onLikeRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
        // 글에 좋아요 업데이트
        queryClient.setQueryData(restaurantKeys.listAll(10), (oldData: any) => {

         console.log('oldData??', oldData, 'data?', data, '변수?', variables)

         return {
            ...oldData,
            data: oldData.data.map((restaurant) =>
               restaurant.id === variables.restaurantId ? { ...restaurant, like: data.data.like, hasMyLike: data.data.hasMyLike } : restaurant
            ),
         };
      });
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








