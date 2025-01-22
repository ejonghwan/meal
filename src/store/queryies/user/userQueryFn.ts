


// user load 
export const onUserLoadAPI = async (token: string) => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-acc-token": `${token}`,
            },
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)
        console.log('쿼리 펑션 안쪽 api fn 확인하자아아아아', res)
        // const data = await res.json();
    } catch (e) {
        console.error(e)
    }
}

// user login
export const onUserLoginAPI = async () => {

}

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
