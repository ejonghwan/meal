import { useUserStore } from "@/src/store/front/user"


// user auth
export const onUserAuthAPI = async (user) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            // body: JSON.stringify({ email: user.email, uid: user.uid })
            body: JSON.stringify(user)
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/auth/`, options)
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
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `${token}`,
            },
            // credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)
        // console.log('쿼리 펑션 안쪽 api fn 확인하자아아아아', res)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}




// user login
export const onUserLoginAPI = async (user) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ email: user.email, password: user.password })
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login/`, options)
        const data = res.json();
        if (!res.ok) { throw new Error('Network response was not ok'); }
        return data;
    } catch (e) {
        console.error(e)
    }
}

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
