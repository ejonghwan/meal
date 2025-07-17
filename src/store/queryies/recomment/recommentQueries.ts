import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { recommentKeys } from '@/src/store/queryies/recomment/recommentKeys'
import { restaurantKeys } from '@/src/store/queryies/restaurant/restaurantKeys'
import { onLoadRecommentListAPI, onLoadRecommentDetailAPI, onCreateRecommentAPI, onEditRecommentAPI, onDeleteRecommentAPI, onLikeRecommentAPI } from '@/src/store/queryies/recomment/recommentQueryFn'
import { RecommentData, DeleteRecommentData, EditRecommentData, LikeRecommentData, LoadRecommentData } from '@/src/types/data/recomment'
import { useSearchParams } from 'next/navigation'
import { commentKeys } from '../comment/commentKeys'


// 모든 댓글 로드
export const useLoadRecommentListInfinite = (payload: LoadRecommentData, options = {}) => {

   const { parentCommentId, limet, userId } = payload;

   return useInfiniteQuery({
      // queryKey: ['restaurant', 'listInfinite', categoryName],
      queryKey: recommentKeys.listAll(parentCommentId, limet),
      queryFn: ({ pageParam }) => {
         const { cursor, cursorId } = pageParam || {};
         // pageParam은 요청 보낼 때의 값
         // console.log('언제 실행되는지 ?', pageParam)

         return onLoadRecommentListAPI(parentCommentId, limet, userId, cursor, cursorId);
      },
      getNextPageParam: (lastPage) => {
         // 백엔드에서 넘겨준 다음 커서 정보
         // console.log('백엔드에서 넘겨준 다음 커서정보', lastPage)
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
      ...options
   });
};



// 특정 댓글 로드
export const useLoadRecomment = (recommentId: string) => {
   return useQuery({
      queryKey: recommentKeys.detail(recommentId),
      queryFn: () => onLoadRecommentDetailAPI(recommentId),
      staleTime: 60 * 1000 * 10, //10분
      gcTime: 60 * 1000 * 11,
      // staleTime: 3600,
      // gcTime: 4000,
   })
}



// 댓글 쓰기
export const useCreateRecomment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   const queryClient = useQueryClient();


   return useMutation({
      mutationFn: (payload: RecommentData) => {
         // console.log('query fn ? ', payload)
         return onCreateRecommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: recommentKeys.listAll(variables.parentCommentId, 5) });
         // console.log('쿼리쪽 edit data?', data, variables)

         // 댓글에 달린 총개수 업데이트
         queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 5), (oldData: any) => {

            // console.log('대댓 생성 olddata?', oldData, 'data?', data)
            if (!oldData) return;
            return {
               ...oldData,
               pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((comment) =>
                     comment.id === variables.parentCommentId
                        ? { ...comment, recommentLen: data.data.recommentLen }
                        : comment
                  ),
               })),
            };
         });


      },
   })
}



// 댓글 수정
export const useEditRecomment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'

   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: (payload: EditRecommentData) => {
         return onEditRecommentAPI(payload)
      },

      onSuccess: (data, variables) => {
         try {

            // 이건 안됨. 리스트를 그리고 있기 떄문에 특정 글 쿼리키 만들어서 해당글만 업데이트해도 반응없음
            // queryClient.invalidateQueries({ queryKey: recommentKeys.edit(variables.recommentId) });

            // data : response 받은값
            // variables : payload 값 

            console.log('쿼리쪽 edit data?', data, variables)
            queryClient.setQueryData(recommentKeys.listAll(variables.parentCommentId, 5), (oldData: any) => {
               console.log('recomment oldData?', oldData, data)
               // return {
               //    ...oldData,
               //    data: oldData.data.map((recomment) => recomment.id === variables.recommentId ? { ...recomment, ...variables } : recomment),
               // };
               return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                     ...page,
                     data: page.data.map((recomment) =>
                        recomment.id === variables.recommentId ? { ...recomment, content: data.data.content, rating: data.data.rating } : recomment
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
export const useLikeRecomment = () => {


   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (payload: LikeRecommentData) => {
         console.log('payload recommnetid', payload)
         return onLikeRecommentAPI(payload)
      },
      onSuccess: (data, variables) => {

         queryClient.setQueryData(recommentKeys.listAll(variables.parentCommentId, 5), (oldData: any) => {
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
                  data: page.data.map((recomment) =>
                     recomment.id === variables.recommentId
                        ? { ...recomment, like: data.data.like, hasMyLike: data.data.hasMyLike }
                        : recomment
                  ),
               })),
            };
         });

      },
   })
}




// 댓글 삭제
export const useDeleteRecomment = () => {

   const searchParams = useSearchParams()
   const category = searchParams.get('search') || '전체'
   const queryClient = useQueryClient();
   return useMutation({
      // payload로 온 데이터가 variables에 들어가는듯
      mutationFn: (payload: DeleteRecommentData) => {
         return onDeleteRecommentAPI(payload)
      },
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: recommentKeys.listAll(variables.parentCommentId, 5) });
         console.log('쿼리쪽 delete data?', data, variables)

         // 댓글에 달린 총개수 업데이트
         queryClient.setQueryData(commentKeys.listAll(variables.restaurantId, 5), (oldData: any) => {

            // console.log('대댓 생성 olddata?', oldData, 'data?', data)
            if (!oldData) return;
            return {
               ...oldData,
               pages: oldData.pages.map((page) => ({
                  ...page,
                  data: page.data.map((comment) =>
                     comment.id === variables.parentCommentId
                        ? { ...comment, recommentLen: data.data.recommentLen }
                        : comment
                  ),
               })),
            };
         });

      },
   })
}








