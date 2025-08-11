import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";




export const onUserSignupAPI = async (user: { email: string; password: string, displayName: string, region: string }) => {

    console.log(user)

    // const res = signupEmail(user.email, user.password)
    // console.log('res??', res)

    const options: ExtendsRequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ email: user.email, password: user.password, displayName: user.displayName, darkmode: true, region: user.region }),
        // next: { tags: ['user', 'signup'] },
        cache: "no-cache",
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup/`, options)
    // if (res.ok) setAuth(true)
    const data = await res.json();
    // setAutuInfo(data)
    return data;
}


// user auth
export const onUserAuthAPI = async (user) => {
    try {
        const options: ExtendsRequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            // body: JSON.stringify({ email: user.email, uid: user.uid })
            body: JSON.stringify(user),
            cache: "no-store",
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emailAuth/`, options)
        const data = res.json();
        if (!res.ok) { throw new Error('Network response was not ok'); }
        return data;
    } catch (e) {
        console.error(e)
    }
}




// user load 
export const onUserLoadAPI = async (token: string) => {
    try {
        const options: ExtendsRequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['user', 'load'] },
            cache: "no-store",
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}




// user login
export const onUserLoginAPI = async (user) => {
    try {
        const options: ExtendsRequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ email: user.email, password: user.password }),
            next: { tags: ['user', 'login'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login/`, options)
        const parse = await res.json();
        if (parse.data) localStorage.setItem('x-acc-token', parse.data.accToken)

        if (!res.ok) {
            throw new Error(parse.message || 'Network response was not ok');
            /*
                와 ... 대박
                try catch 로 감싸서 throw를 해도 mutation isError에 잡히지않음... 계속 success가 뜸 
                이유가 try catch에서 감싸서 catch 에러로 내보냈기 떄문. 
                !res.ok로 에러던져줘야 mutation이 에러 잡을 수 있음...

                > 근데 챗선생님이 감싸는게 좋다네 
            */
        }
        return parse;
    } catch (error) {
        console.error("Login Error:", error);
        throw error; // ✅ 에러도 명확히 throw 해야 mutation.isError에 잡힘
    }
}


export const onUserDeleteAPI = async (authInfo: any) => {
    try {
        // 
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(authInfo),
            cache: "no-store",
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup/`, options)
        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e)
    }
}




// export const onUserDeleteAPI = async (authInfo: any) => {
//     try {
//         // 
//         const options: ExtendsRequestInit = {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json", },
//             body: JSON.stringify(authInfo),
//             cache: "no-store",
//         }
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup/`, options)
//         const data = await res.json();

//         return data;
//     } catch (e) {
//         console.error(e)
//     }
// }






// const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     try {
//         e.preventDefault();
//         // console.log(user)

//         // const res = signupEmail(user.email, user.password)
//         // console.log('res??', res)

//         const options = {
//             method: "POST",
//             headers: { "Content-Type": "application/json", },
//             body: JSON.stringify({ email: user.email, password: user.password })
//         }

//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login/`, options)
//         const data = await res.json();
//         // setUserInfo(data)
//         setUserLogin(data)
//     } catch (e) {
//         console.error(e)
//     }
// }


//  user logout
export const onUserOutAPI = async () => {

}









// test
export const getPosts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json();

    return data;
};
export const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json();

    return data;
};
export const fetchUserById = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json();

    return data;
};
