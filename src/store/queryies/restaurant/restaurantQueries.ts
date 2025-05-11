import { useMutation, useQuery } from '@tanstack/react-query'
import { userKeys } from '@/src/store/queryies/user/userKeys'
import { onRestaurantListAllAPI, onRestaurantListAPI } from '@/src/store/queryies/restaurant/restaurantQueryFn'


// 모든 글 로드
export const useRestaurantListAll = () => {
   return useQuery({
      queryKey: userKeys.load(),
      queryFn: () => onRestaurantListAllAPI(),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}


// 상세 로드
export const useRestaurantList = (restauranId) => {
   return useQuery({
      queryKey: userKeys.load(),
      queryFn: () => onRestaurantListAPI(restauranId),
      // staleTime: 60 * 1000,
      staleTime: 3600,
      gcTime: 4000,
   })
}











// 회원가입
export const useUserSignup = () => {
   return useMutation({
      mutationFn: (user: { email: string; password: string, displayName: string }) => {
         return onUserSignupAPI(user)
      },
   })
}

// 회원가입 인증
export const useUserSignupAuth = () => {
   return useMutation({
      mutationFn: (authInfo) => {
         return onUserAuthAPI(authInfo)
      },
      onError: (error) => {
         console.error('로그인 실패:', error);
      },
   })
}


// 로그인
export const useUserLogin = () => {
   return useMutation<LoginResponse, Error, User>({
      mutationFn: (user: User) => {
         return onUserLoginAPI(user)
      },
   })
}


// 유저 삭제
export const useUserDelete = () => {
   // if (!token) return;
   return useMutation({
      mutationFn: (authInfo: any) => {
         return onUserDeleteAPI(authInfo)
      },
   })
}










