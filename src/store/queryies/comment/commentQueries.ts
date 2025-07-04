import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentKeys } from '@/src/store/queryies/comment/commentKeys'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadCommentListAPI, onLoadCommentDetailAPI, onCreateCommentAPI, onEditCommentAPI, onDeleteCommentAPI } from '@/src/store/queryies/comment/commentQueryFn'
import { CommentData, DeleteCommentData, EditCommentData } from '@/src/types/data/comment'



// 모든 댓글 로드
export const useLoadCommentList = (restaurant: string, page: number, userId: string) => {
   return useQuery({
      queryKey: commentKeys.listAll(restaurant, page),
      queryFn: () => onLoadCommentListAPI(restaurant, page, userId),
      staleTime: 60 * 1000,
      // staleTime: 3600,
      gcTime: 4000,
   })
}



// 특정 댓글 로드
export const useLoadComment = (commentId: string) => {
   return useQuery({
      queryKey: commentKeys.detail(commentId),
      queryFn: () => onLoadCommentDetailAPI(commentId),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}



// 댓글 쓰기
export const useCreatecomment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: CommentData) => {
         console.log('query fn ? ', payload)
         return onCreateCommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentKeys.listAll(variables.restaurantId, 10) });
         console.log('쿼리쪽 edit data?', data, variables)
      },
   })
}



// 댓글 수정
export const useEditComment = () => {

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: EditCommentData) => {
         return onEditCommentAPI(payload)
      },
      onSuccess: (data, variables) => {

         // 이건 안됨. 리스트를 그리고 있기 떄문에 특정 글 쿼리키 만들어서 해당글만 업데이트해도 반응없음
         // queryClient.invalidateQueries({ queryKey: commentKeys.edit(variables.commentId) });

         console.log('쿼리쪽 edit data?', data, variables)
         queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 10), (oldData: any) => {
            return {
               ...oldData,
               data: oldData.data.map((comment) => comment.id === variables.commentId ? { ...comment, ...variables } : comment),
            };
         });

         // 글에 달린 총평점도 업데이트 
         // queryClient.setQueryData(restaurantKeys.detail(variables.restaurantId), (oldData: any) => {
         //    return {
         //       ...oldData,
         //       data: oldData.data.map((restaurant) => restaurant.id === variables.restaurantId ? { ...restaurant, totalRating: restaurant.totalRating } : restaurant),
         //    };
         // });
      },
   })
}



// 댓글 삭제
export const useDeleteComment = () => {
   const queryClient = useQueryClient();
   return useMutation({
      // payload로 온 데이터가 variables에 들어가는듯
      mutationFn: (payload: DeleteCommentData) => {
         return onDeleteCommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentKeys.listAll(variables.restaurantId, 10) });
         console.log('쿼리쪽 delete data?', data, variables)
      },
   })
}








