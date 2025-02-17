import { useMutation, useQuery } from '@tanstack/react-query'
import { userKeys } from '@/src/store/queryies/user/userKeys'
import { fetchUsers, fetchUserById, onUserLoadAPI, onUserLoginAPI, onUserAuthAPI } from '@/src/store/queryies/user/userQueryFn'


interface User {
    email: string;
    password: string;
}


// load 는 쿼리로 보낼까 말까. 지금은 그냥 화면에서 바로 api 함수 실행. 아래꺼 안씀
export const useUserLoad = (token: string) => {
    // if (!token) return;
    return useQuery({
        queryKey: userKeys.load(),
        queryFn: () => onUserLoadAPI(token),
        staleTime: 60 * 1000,
        gcTime: 300 * 1000
    })
}


export const useUserSignupAuth = () => {
    return useMutation({
        mutationFn: (authInfo) => {
            return onUserAuthAPI(authInfo)
        },
    })
}

export const useUserLogin = () => {
    // if (!token) return;
    return useMutation({
        mutationFn: (user: User) => {
            return onUserLoginAPI(user)
        },
    })
}













// test 
export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.list(),
        queryFn: fetchUsers,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
}


export const useUser = (id: string) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => fetchUserById(id),
        staleTime: 15000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
}




// export const useUser = (id: string) => {
//     return useQuery(userKeys.detail(), () => fetchUserById(id));
// }