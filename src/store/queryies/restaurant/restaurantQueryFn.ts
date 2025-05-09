import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";
import { restaurantData } from '@/src/types/reducer/restaurant'





// restaurant
// list all load
export const onRestaurantListAllAPI = async () => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['restaurant', 'listAll'] },
            cache: "no-store",
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}

// detail load
export const onRestaurantListAPI = async (restaurantId: string) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: {'Content-Type': 'application/json',},
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['restaurant', 'detail'] },
            cache: "no-store",
        }

        if(!restaurantId) throw new Error('Network response was not ok');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${restaurantId}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


// edit
export const onCreateRestaurantAPI = async (data: restaurantData) => {
    try {
        const { title, content, rating, address, category, isEdit } = data

        const options: ExtendsRequestInit = {
            method: "PUT",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, content, rating, address, category, isEdit }),
            next: { tags: ['restaurant', 'edit'] },
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





export const onEditRestaurantAPI = async (data: restaurantData) => {
    try {
        const { title, content, rating, address, category, isEdit, restaurantId } = data

        const options: ExtendsRequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ title, content, rating, address, category, isEdit, }),
            next: { tags: ['restaurant', 'create'] },
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



// delete
export const onDeleteRestaurantAPI = async (restaurantId: string) => {
    try {
        // 
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: { "Content-Type": "application/json", },
            next: { tags: ['restaurant', 'delete'] },
            cache: "no-store",
            credentials: 'include'
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restaurant/${restaurantId}`, options)
        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e)
    }
}



