export type Info = {
    name: string;
    category: string;
    address: Address; 
    menu: Menu[]
}

export type Address = {
    city: string; 
    detail: string;
    zipCode: number; 
}

export type Menu = {
    name: string;
    price: number;
    category: string;
}



/*

    ## type 에서만 사용할 수 있는 기능. 
    1. 만약 address 에서 zipCode가 필요없을 경우 
    2. export type AddressWithoutZip = Omit<Adress, 'zipCode'>
    3. 위 처럼 쓰면 빠진 타입을 선언할 수 있다



    
    ## 반대로 특정 타입만 가져오고 싶다면 ? 
    export type AddressWithoutZip = Pick<Adress, 'zipCode'>



    ## BestMenu에서 선언된 아래 소스에서 Menu안에 price만 빼고 싶다면? 

    > BestMenu 컴포넌트 상단 타입
    interface OwnProps extends Menu {
        bestMenuFn(name: string): string
    }

    > 이렇게 적으면 됨
    interface OwnProps extends Omit<Menu, 'price'> {
        bestMenuFn(name: string): string
    }

*/



/*
    제네릭
    https://www.youtube.com/watch?v=V9XLst8UEtk&t=1541s
*/

// 선언. 데이터에 뭐가 들어올지 모를떄 사용
export type ApiResponse<T> = {
    data: T[];
    totalPage: number;
    page: number;
}


// 사용
export type RestorantRespone = ApiResponse<Address>
export type MenuResponse = ApiResponse<Menu>