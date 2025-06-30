import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onRestaurantListLoadAPI, onRestaurantDetailLoadAPI, onCreateRestaurantAPI, onEditRestaurantAPI, onDeleteRestaurantAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'
import { CommentData } from '@/src/types/data/comment'



// 모든 글 로드
export const useCommentIdListAll = (page: number) => {
   return useQuery({
      queryKey: commentIdKeys.listAll(page),
      queryFn: () => onCommentIdListLoadAPI(page),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}



// 상세 로드
export const useCommentIdList = (restauranId: string) => {
   return useQuery({
      queryKey: commentIdKeys.detail(restauranId),
      queryFn: () => onCommentIdDetailLoadAPI(restauranId),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}



// 글쓰기
export const useCreatecommentId = () => {
   return useMutation({
      mutationFn: (payload: CommentIdData) => {
         console.log('query fn ? ', payload)
         return onCreateCommentIdAPI(payload)
      },
   })
}



// 글 수정
export const useEditCommentId = () => {

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: CommentIdData) => {
         return onEditCommentIdAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentIdKeys.listAll(10) });
         console.log('쿼리쪽 edit data?', data, variables)
      },
   })
}



// 글 삭제
export const useDeleteCommentId = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: { commentIdId: string, token: string }) => {
         return onDeleteCommentIdAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentIdKeys.listAll(10) });
         console.log('쿼리쪽 delete data?', data, variables)
      },
   })
}








