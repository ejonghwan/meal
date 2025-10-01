import { QueryFunction } from "@tanstack/query-core";
import { ExtendsRequestInit } from '@/src/types/request/index';
import { useUserStore } from "@/src/store/front/user";
import { RecommentData, EditRecommentData, DeleteRecommentData, LikeRecommentData } from '@/src/types/data/recomment'





/*
    @ path    GET /api/recomment/:restaurantId/:limit
    @ doc     댓글 로드
    @ access  public
*/
export const onLoadRecommentListAPI = async (parentCommentId: string, limit: number, userId: string, cursor?: string, cursorId?: string) => {
    try {

        const savedToken = localStorage.getItem('x-acc-token');
        const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment/${parentCommentId}/${limit}`);

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
            next: { tags: ['recomment', 'listAll'] },
            cache: "no-store",
        });

        if (!res.ok) throw new Error('Network error');
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


/*
    @ path    GET /api/recomment/:recommentId
    @ doc     특정 댓글 로드
    @ access  public
*/
export const onLoadRecommentDetailAPI = async (recommentId: string) => {
    try {
        const options: ExtendsRequestInit = {
            method: "GET",
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
            next: { tags: ['recomment', 'detail'] },
            cache: "no-store",
        }

        if (!recommentId) throw new Error('Network response was not ok');
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment/${recommentId}`, options)

        if (!res.ok) { throw new Error('Network response was not ok'); }
        return res.json();

    } catch (e) {
        console.error('fetch error: ', e)
    }
}


/*
    @ path    POST /api/recomment
    @ doc     댓글 생성
    @ access  public
*/
export const onCreateRecommentAPI = async (payload: RecommentData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, content, restaurantId, parentCommentId, parentReommentId, targetDisplayName } = payload;


        console.log('query fnb ?', parentReommentId, targetDisplayName)
        // 토큰 컴포넌트말고 여기서 보내서 테스트해보기

        const options: ExtendsRequestInit = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, content, restaurantId, parentCommentId, parentReommentId, targetDisplayName }),
            next: { tags: ['recomment', 'create'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment`, options)
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
    @ path    PUT /api/recomment/:recommentId
    @ doc     댓글 수정
    @ access  public
*/
export const onEditRecommentAPI = async (payload: EditRecommentData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { recommentId, content, restaurantId } = payload;

        const options: ExtendsRequestInit = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content, restaurantId }),
            next: { tags: ['recomment', 'edit'] },
            cache: "no-store",
            credentials: 'include'
        }
        // /api/comment/:commentId
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment/${recommentId}`, options)
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
    @ path    PATCH  /api/recomment/:recommentId
    @ doc     좋아요 토글
    @ access  public
*/
export const onLikeRecommentAPI = async (data: LikeRecommentData) => {
    try {
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, recommentId } = data;
        const options: ExtendsRequestInit = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
            next: { tags: ['recomment', 'like'] },
            cache: "no-store",
            credentials: 'include'
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment/${recommentId}`, options)
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
    @ path    DELETE /api/recomment/:recommentId
    @ doc     대댓글 삭제
    @ access  public
*/
export const onDeleteRecommentAPI = async (payload: DeleteRecommentData) => {
    try {
        console.log('payload?', payload)
        const savedToken = localStorage.getItem('x-acc-token');
        const { userId, recommentId, restaurantId, parentCommentId } = payload;
        const options: ExtendsRequestInit = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-acc-token": `Bearer ${savedToken}`,
                // "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ restaurantId, userId, parentCommentId }),
            next: { tags: ['recomment', 'delete'] },
            cache: "no-store",
            credentials: 'include'
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recomment/${recommentId}`, options)
        const parse = await res.json();

        return parse;
    } catch (e) {
        console.error(e)
    }
}



