import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";
import { RestaurantData } from '@/src/types/data/restaurant'




// list load
export const onLoadRestaurantListAPI = async (page: number, categoryName: string, cursor?: string, cursorId?: string) => {
    const encodedCategory = encodeURIComponent(categoryName);
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${page}/${encodedCategory}`);
    if (cursor) url.searchParams.set('cursor', cursor);
    if (cursorId) url.searchParams.set('cursorId', cursorId);

    const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        next: { tags: ['restaurant', 'listAll'] },
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Network error');
    return res.json();
};

// export const onLoadRestaurantListAPI = async ({ page, categoryName, cursor }: {
//     page: number;
//     cursor: string | null;
//     categoryName: string;
// }): Promise<RestaurantListResponse> => {
//     try {
//         const options: ExtendsRequestInit = {
//             method: "GET",
//             headers: { 'Content-Type': 'application/json', },
//             credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
//             next: { tags: ['restaurant', 'listAll'] },
//             cache: "no-store",
//         }

//         const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant`);
//         if (cursor) url.searchParams.set("cursor", cursor);

//         const enCodeCategoryName = encodeURIComponent(categoryName) //encode

//         // console.log('page', page)
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${page}/${enCodeCategoryName}?cursor=${cursor ?? ''}`, options)

//         if (!res.ok) { throw new Error('Network response was not ok'); }
//         return res.json();

//     } catch (e) {
//         console.error('fetch error: ', e)
//     }
// }


// restaurant
// category list load
export const onLoadRestaurantCategoryListAPI = async (page, categoryName) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['restaurant', 'listAll'] },
            cache: "no-store",
        }


        console.log('page', page)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${categoryName}/${page}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}



// detail load
export const onLoadRestaurantDetailAPI = async (restaurantId: string) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['restaurant', 'detail'] },
            cache: "no-store",
        }

        if (!restaurantId) throw new Error('Network response was not ok');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${restaurantId}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


// 글 생성
export const onCreateRestaurantAPI = async (data: RestaurantData) => {
    try {
        const { userId, title, content, rating, category, isEdit, token, mapInfo } = data;

        const options: ExtendsRequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, title, content, rating, category, isEdit, mapInfo }),
            next: { tags: ['restaurant', 'create'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant`, options)
        const parse = await res.json();

        if (!res.ok) {
            throw new Error(parse.message || 'Network response was not ok');

        }
        return parse;
    } catch (error) {
        console.error("Login Error:", error);
        throw error; // ✅ 에러도 명확히 throw 해야 mutation.isError에 잡힘
    }
}




// 글 수정
export const onEditRestaurantAPI = async (data: RestaurantData) => {
    try {
        const { userId, restaurantId, title, content, rating, category, isEdit, token, mapInfo } = data;

        const options: ExtendsRequestInit = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content, rating, category, isEdit, mapInfo }),
            next: { tags: ['restaurant', 'edit'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${restaurantId}`, options)
        const parse = await res.json();

        if (!res.ok) {
            throw new Error(parse.message || 'Network response was not ok');
        }
        return parse;

    } catch (error) {
        console.error("Login Error:", error);
        throw error; // ✅ 에러도 명확히 throw 해야 mutation.isError에 잡힘
    }
}



// 글 삭제
export const onDeleteRestaurantAPI = async (data: { restaurantId: string, token: string }) => {
    try {
        const { restaurantId, token } = data;
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            next: { tags: ['restaurant', 'delete'] },
            cache: "no-store",
            credentials: 'include'
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${restaurantId}`, options)
        const parse = await res.json();

        return parse;
    } catch (e) {
        console.error(e)
    }
}



