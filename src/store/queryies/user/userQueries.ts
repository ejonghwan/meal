import { useMutation, useQuery } from '@tanstack/react-query'
import { userKeys } from '@/src/store/queryies/user/userKeys'
import { fetchUsers, fetchUserById, onUserLoadAPI, onUserLoginAPI, onUserAuthAPI, onUserDeleteAPI, onUserSignupAPI } from '@/src/store/queryies/user/userQueryFn'


type User = {
    email: string;
    password: string;
};

type LoginResponse = {
    uid: string;
    token: string;
};



// 유저 로드
export const useUserLoad = (token: string) => {
    return useQuery({
        queryKey: userKeys.load(),
        queryFn: () => onUserLoadAPI(token),
        staleTime: 60 * 1000 * 10, //10분
        gcTime: 60 * 1000 * 11,
        // staleTime: 3600,
        // gcTime: 4000,
        enabled: !!token,
    })
}


// 회원가입
export const useUserSignup = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string, displayName: string, region: string }) => {
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











