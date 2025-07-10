import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";
import { CommentData, EditCommentData, DeleteCommentData, CommentLikeData } from '@/src/types/data/comment'





/*
    @ path    GET /api/comment/:restaurantId/:limit
    @ doc     댓글 로드
    @ access  public
*/
export const onLoadCommentListAPI = async (restaurantId: string, limit: number, userId: string, cursor?: string, cursorId?: string) => {
    try {

        const savedToken = localStorage.getItem('x-acc-token');
        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/${restaurantId}/${limit}`);

        if (cursor) url.searchParams.set('cursor', cursor);
        if (cursorId) url.searchParams.set('cursorId', cursorId);


        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-user-uid": userId || null,
                "x-acc-token": `Bearer ${savedToken ? savedToken : ''}`,
            },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['comment', 'listAll'] },
            cache: "no-store",
        });

        if (!res.ok) throw new Error('Network error');
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


/*
    @ path    GET /api/comment/:commentId
    @ doc     특정 댓글 로드
    @ access  public
*/
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


/*
    @ path    POST /api/comment
    @ doc     댓글 생성
    @ access  public
*/
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




/*
    @ path    PUT /api/comment/:commentId
    @ doc     댓글 수정
    @ access  public
*/
export const onEditCommentAPI = async (payload: EditCommentData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { commentId, content, rating, isEdit, restaurantId, prevRating } = payload;

        const options: ExtendsRequestInit = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content, rating, isEdit, restaurantId, prevRating }),
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




/*
    @ path    PATCH  /api/comment/:commentId
    @ doc     좋아요 토글
    @ access  public
*/
export const onLikeCommentAPI = async (data: CommentLikeData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, commentId } = data;
        const options: ExtendsRequestInit = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
            next: { tags: ['comment', 'like'] },
            cache: "no-store",
            credentials: 'include'
        }

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




/*
    @ path    DELETE /api/comment/:commentId
    @ doc     댓글 삭제
    @ access  public
*/
export const onDeleteCommentAPI = async (payload: DeleteCommentData) => {
    try {
        console.log('payload?', payload)
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, rating, commentId, restaurantId } = payload;
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ restaurantId, rating, userId }),
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



