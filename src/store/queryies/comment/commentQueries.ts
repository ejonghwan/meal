import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentKeys } from '@/src/store/queryies/comment/commentKeys'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadCommentListAPI, onLoadCommentDetailAPI, onCreateCommentAPI, onEditCommentAPI, onDeleteCommentAPI, onLikeCommentAPI } from '@/src/store/queryies/comment/commentQueryFn'
import { CommentData, DeleteCommentData, EditCommentData, CommentLikeData } from '@/src/types/data/comment'
import { useSearchParams } from 'next/navigation'



// 모든 댓글 로드
export const useLoadCommentListInfinite = (restaurantId: string, limet: number, userId: string) => {

   // console.log('cate??', categoryName)
   // console.log('res??', restaurantId)

   return useInfiniteQuery({
      // queryKey: ['restaurant', 'listInfinite', categoryName],
      queryKey: commentKeys.listAll(restaurantId, limet),
      queryFn: ({ pageParam }) => {
         const { cursor, cursorId } = pageParam || {};
         // pageParam은 요청 보낼 때의 값
         // console.log('언제 실행되는지 ?', pageParam)

         return onLoadCommentListAPI(restaurantId, limet, userId, cursor, cursorId);
      },
      getNextPageParam: (lastPage) => {
         // 백엔드에서 넘겨준 다음 커서 정보
         // console.log('백엔드에서 넘겨준 다음 커서정보', lastPage)
         // if (!lastPage?.nextCursor || !lastPage?.nextCursorId) return undefined;
         // if (lastPage?.data?.length < limet) return undefined;
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

// export const useLoadCommentList = (restaurant: string, page: number, userId: string) => {
//    return useQuery({
//       queryKey: commentKeys.listAll(restaurant, page),
//       queryFn: () => onLoadCommentListAPI(restaurant, page, userId),
//       // staleTime: 60 * 1000 * 10, //10분
//       // gcTime: 60 * 1000 * 11,
//       staleTime: 3600,
//       gcTime: 4000,
//    })
// }



// 특정 댓글 로드
export const useLoadComment = (commentId: string) => {
   return useQuery({
      queryKey: commentKeys.detail(commentId),
      queryFn: () => onLoadCommentDetailAPI(commentId),
      staleTime: 60 * 1000 * 10, //10분
      gcTime: 60 * 1000 * 11,
      // staleTime: 3600,
      // gcTime: 4000,
   })
}



// 댓글 쓰기
export const useCreatecomment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   const queryClient = useQueryClient();


   return useMutation({
      mutationFn: (payload: CommentData) => {
         console.log('query fn ? ', payload)
         return onCreateCommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentKeys.listAll(variables.restaurantId, 5) });
         // console.log('쿼리쪽 edit data?', data, variables)

         // 식당 아이디 잘 받는데 렌더링안됨 확인 해야댐
         // queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 5), (oldData: any) => {
         //    console.log('????????베리어블스', variables, oldData)
         //    if (!oldData) return;
         //    return {
         //       ...oldData,
         //       pages: oldData.pages.map((page) => ({
         //          ...page,
         //          data: [variables, ...data]
         //       })),
         //    };
         // });

         // 글에 달린 총평점도 업데이트  이거 쿼리키 수정해야됨
         queryClient.setQueryData(restaurantKeys.listAll(category), (oldData: any) => {
            if (!oldData) return;
            return {
               ...oldData,
               pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((restaurant) =>
                     restaurant.id === variables.restaurantId
                        ? { ...restaurant, totalRating: data.data.newTotalRating }
                        : restaurant
                  ),
               })),
            };
         });


      },
   })
}



// 댓글 수정
export const useEditComment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: EditCommentData) => {
         return onEditCommentAPI(payload)
      },

      onSuccess: (data, variables) => {
         try {

            // 이건 안됨. 리스트를 그리고 있기 떄문에 특정 글 쿼리키 만들어서 해당글만 업데이트해도 반응없음
            // queryClient.invalidateQueries({ queryKey: commentKeys.edit(variables.commentId) });

            // data : response 받은값
            // variables : payload 값 

            console.log('쿼리쪽 edit data?', data, variables)
            queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 5), (oldData: any) => {
               console.log('comment oldData?', oldData, data)
               // return {
               //    ...oldData,
               //    data: oldData.data.map((comment) => comment.id === variables.commentId ? { ...comment, ...variables } : comment),
               // };
               return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                     ...page,
                     data: page.data.map((comment) =>
                        comment.id === variables.commentId ? { ...comment, content: data.data.content, rating: data.data.rating } : comment
                     ),
                  })),
               };
            });

            // 인피니티 쿼리 적용하면서 데이터 구조 변경됨. 불변 재설정
            queryClient.setQueryData(restaurantKeys.listAll(category), (oldData: any) => {
               console.log('캐시 ?', queryClient.getQueryCache().findAll());
               if (!oldData) return;

               console.log('oldData??', oldData)
               console.log('data??', data)

               return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                     ...page,
                     data: page.data.map((restaurant) =>
                        restaurant.id === variables.restaurantId
                           ? { ...restaurant, totalRating: data.data.newTotalRating }
                           : restaurant
                     ),
                  })),
               };
            });


            // 글에 달린 총평점도 업데이트 // 이거 쿼리키 수정해야됨
            // queryClient.setQueryData(restaurantKeys.listAll('전체'), (oldData: any) => {
            //    console.log('oldData?', oldData)
            //    console.log('data?', data)
            //    // oldData : 이전 restaurant 값이 data
            //    // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            //    // message "성공"
            //    // nextCursor 2025-06-29T15:17:16.885Z"
            //    // state"SUCCESS"

            //    //data : 리스폰스 받은 data message state 세개 들어있음
            //    // console.log(queryClient.getQueryCache().findAll());
            //    // return {
            //    //    ...oldData,
            //    //    data: oldData?.data.map((restaurant) =>
            //    //       restaurant.id === variables.restaurantId ? { ...restaurant, totalRating: data.data.newTotalRating } : restaurant
            //    //    ),
            //    // };

            // });
         } catch (e) {
            console.error('mutate error', e)
         }

      },
   })
}



// 댓글 좋아요
export const useLikeComment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: CommentLikeData) => {
         console.log('payload commnetid', payload)
         return onLikeCommentAPI(payload)
      },
      onSuccess: (data, variables) => {

         queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 5), (oldData: any) => {
            console.log('oldData??', oldData, 'data?', data, '변수?', variables)
            console.log('캐시 ?', queryClient.getQueryCache().findAll());
            if (!oldData) return;

            // console.log('oldData??', oldData)
            // console.log('data??', data)
            // console.log('variables??', variables)

            return {
               ...oldData,
               pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((comment) =>
                     comment.id === variables.commentId
                        ? { ...comment, like: data.data.like, hasMyLike: data.data.hasMyLike }
                        : comment
                  ),
               })),
            };
         });

      },
   })
}




// 댓글 삭제
export const useDeleteComment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   const queryClient = useQueryClient();
   return useMutation({
      // payload로 온 데이터가 variables에 들어가는듯
      mutationFn: (payload: DeleteCommentData) => {
         return onDeleteCommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: commentKeys.listAll(variables.restaurantId, 5) });
         console.log('쿼리쪽 delete data?', data, variables)

         // 글에 달린 총평점도 업데이트  이거 쿼리키 수정해야됨
         queryClient.setQueryData(restaurantKeys.listAll(category), (oldData: any) => {
            if (!oldData) return;
            return {
               ...oldData,
               pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((restaurant) =>
                     restaurant.id === variables.restaurantId
                        ? { ...restaurant, totalRating: data.data.newTotalRating }
                        : restaurant
                  ),
               })),
            };
         });

      },
   })
}








