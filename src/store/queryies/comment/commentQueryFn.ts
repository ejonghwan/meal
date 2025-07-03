import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";
import { CommentData, EditCommentData, DeleteCommentData } from '@/src/types/data/comment'





// 댓글 리스트 로드
export const onLoadCommentListAPI = async (restaurantId, page) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['comment', 'listAll'] },
            cache: "no-store",
        }

        console.log('page', restaurantId, page)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${restaurantId}/${page}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();
    } catch (e) {
        console.error('fetch error: ', e)
    }
}

// 특정 댓글 로드
export const onLoadCommentDetailAPI = async (commentId: string) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['comment', 'detail'] },
            cache: "no-store",
        }

        if (!commentId) throw new Error('Network response was not ok');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


// 댓글 생성
export const onCreateCommentAPI = async (payload: CommentData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, content, rating, isEdit, restaurantId, parentCommentId } = payload;

        // 토큰 컴포넌트말고 여기서 보내서 테스트해보기

        const options: ExtendsRequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, content, rating, isEdit, restaurantId, parentCommentId }),
            next: { tags: ['comment', 'create'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`, options)
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




// 댓글 수정
export const onEditCommentAPI = async (payload: EditCommentData) => {
    try {
        const { userId, commentId, content, rating, isEdit, token } = payload;

        const options: ExtendsRequestInit = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content, rating, isEdit }),
            next: { tags: ['comment', 'edit'] },
            cache: "no-store",
            credentials: 'include'
        }
        // /api/comment/:commentId
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`, options)
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



// 댓글 삭제
export const onDeleteCommentAPI = async (payload: DeleteCommentData) => {
    try {
        const { commentId, token } = payload;
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${token}`,
                // "Authorization": `Bearer ${token}`,
            },
            next: { tags: ['comment', 'delete'] },
            cache: "no-store",
            credentials: 'include'
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${commentId}`, options)
        const parse = await res.json();

        return parse;
    } catch (e) {
        console.error(e)
    }
}



