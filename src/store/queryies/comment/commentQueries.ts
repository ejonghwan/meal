import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentKeys } from '@/src/store/queryies/comment/commentKeys'
import { onLoadCommentListAPI, onLoadCommentDetailAPI, onCreateCommentAPI, onEditCommentAPI, onDeleteCommentAPI } from '@/src/store/queryies/comment/commentQueryFn'
import { CommentData, DeleteCommentData, EditCommentData } from '@/src/types/data/comment'



// 모든 댓글 로드
export const useLoadCommentList = (restaurant: string, page: number) => {
   return useQuery({
      queryKey: commentKeys.listAll(restaurant, page),
      queryFn: () => onLoadCommentListAPI(restaurant, page),
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
export const useEditCommentId = () => {

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: EditCommentData) => {
         return onEditCommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentKeys.listAll(variables.commentId, 10) });
         console.log('쿼리쪽 edit data?', data, variables)
      },
   })
}



// 댓글 삭제
export const useDeleteCommentId = () => {
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








