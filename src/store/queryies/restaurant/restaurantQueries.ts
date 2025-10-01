import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadRestaurantListAPI, onLoadRestaurantDetailAPI, onCreateRestaurantAPI, onEditRestaurantAPI, onDeleteRestaurantAPI, onLikeRestaurantAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'
import { RestaurantData, RestaurantLikeData } from '@/src/types/data/restaurant'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

/*
1. 글 리스트 로드할 때 캐싱된 쿼리키
2. 해당 리스트를 변경하려면 쿼리키를 동일학 ㅔ맞춰서 업데이트 해줘야됨 
예를 들어 로드할떈 ['restaurant', 'listInfinite', categoryName], 이렇게 적었으면 업데이트할떄도 동일하게 적어줘야됨
*/


// 모든 글 로드
export const useRestaurantListInfinite = (limit: number, categoryName: string) => {

   // console.log('cate??', categoryName)

   return useInfiniteQuery({
      // queryKey: ['restaurant', 'listInfinite', categoryName],
      queryKey: restaurantKeys.listAll(categoryName),
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
         // if (lastPage?.data?.length < limit) return undefined;
         if (!lastPage.hasNext) return undefined;

         return {
            cursor: lastPage.nextCursor,
            cursorId: lastPage.nextCursorId,
         };
      },
      initialPageParam: {
         cursor: null,
         cursorId: null,
      },
      staleTime: 1000 * 60 * 10, //10분
   });
};



// 상세 로드
export const useRestaurant = (restauranId: string) => {

   return useQuery({
      queryKey: restaurantKeys.detail(restauranId),
      queryFn: () => onLoadRestaurantDetailAPI(restauranId),
      staleTime: 60 * 1000 * 10, //10분
      gcTime: 60 * 1000 * 11,
      // staleTime: 3600,
      // gcTime: 4000,
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

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: RestaurantData) => {
         return onEditRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: restaurantKeys.listAll(category) });
         console.log('쿼리쪽 edit data?', data, variables)
      },
   })
}


// 글 좋아요
export const useLikeRestaurant = (type: "list" | "detail" = "list") => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: RestaurantLikeData) => {
         return onLikeRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
         console.log('상세페이지에서 상태 ? ',)

         // 이부분 수정해야됨 

         queryClient.setQueryData(restaurantKeys.listAll(category), (oldData: any) => {
            console.log('oldData??', oldData, 'data?', data, '변수?', variables)
            console.log('캐시 ?', queryClient.getQueryCache().findAll());
            if (!oldData) return;

            // console.log('oldData??', oldData)
            // console.log('data??', data)
            // console.log('variables??', variables)

            console.log('상세페이지에서 업데이트 ? ', oldData,)

            // 리스트페이지일경우
            if (type === "list") {
               return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                     ...page,
                     data: page.data.map((restaurant) =>
                        restaurant.id === variables.restaurantId
                           ? { ...restaurant, like: data.data.like, hasMyLike: data.data.hasMyLike }
                           : restaurant
                     ),
                  })),
               };
            }

            // 상세페이지일경우 
            if (type === "detail") {
               return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                     ...page,
                     data: page.data.map((restaurant) =>
                        restaurant.id === variables.restaurantId
                           ? { ...restaurant, like: data.data.like, hasMyLike: data.data.hasMyLike }
                           : restaurant
                     ),
                  })),
               };
            }

         });

         // // 글에 좋아요 업데이트
         // queryClient.setQueryData(restaurantKeys.listAll(category), (oldData: any) => {

         //    console.log('oldData??', oldData, 'data?', data, '변수?', variables)

         //    return {
         //       ...oldData,
         //       data: oldData.data.map((restaurant) =>
         //          restaurant.id === variables.restaurantId ? { ...restaurant, like: data.data.like, hasMyLike: data.data.hasMyLike } : restaurant
         //       ),
         //    };
         // });
      },
   })
}





// 글 삭제
export const useDeleteRestaurant = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: { restaurantId: string, token: string }) => {
         return onDeleteRestaurantAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: restaurantKeys.listAll(category) });
         console.log('쿼리쪽 delete data?', data, variables)
      },
   })
}








