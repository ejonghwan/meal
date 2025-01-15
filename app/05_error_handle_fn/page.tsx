"use client"

import React, { useEffect } from 'react'

const FnPage = () => {

    // 유인동님 비동기 에러핸들링과 함수형 프로그래밍

    const log = console.log;
    const imgs = [
        { name: '이미지1', url: 'https://picsum.photos/seed/picsum/200/300'  },
        { name: '이미지1', url: 'https://picsum.photos/200/300?grayscale'  },
        // { name: '이미지1', url: 'https://picsasd'  },
        { name: '이미지1', url: 'https://picsum.photos/200/300/?blur'  },
        { name: '이미지1', url: 'https://picsum.photos/id/870/200/300?grayscale&blur=2'  },
    ]

    const imgs2 = [
        { name: '이미지1', url: 'https://picsum.photos/seed/picsum/200/300'  },
        // { name: '이미지1', url: 'https://picsum.photos/200/300?grayscale'  },
        { name: '이미지1', url: 'https://picsum.photos/200/300/?blur'  },
        { name: '이미지1', url: 'https://picsasd'  },
        { name: '이미지1', url: 'https://picsum.photos/id/870/200/300?grayscale&blur=2'  },
    ]


    // 꼭 마스터하자 


    // #######################   step 1   #########################
    // const f1 = () => {
    //     imgs
    //         .map(({url}) => {
    //             let img = new Image();
    //             img.src= url; 
    //             return img
    //         })
    //         .map(img => img.height)
    //         .forEach(a => log(a))
    // }
    // height는 로드 전이기 떄문에 구할 수 없음. 







    // #######################   step 2   #########################
    // const loadImg = (url) => {
    //     let img = new Image();
    //     img.src = url

    //     log('h ?', img.height)
    //     img.onload = () => { 
    //         //로드 후에 height를 구해야 구해짐. 이 시점을 Promise로 비동기시점을 만듦
    //         log('h?2', img.height)
    //     }
    //     return img;
        
    // }

    // 이떄 프로미스를 이용해서 시점을 조절함
    // const loadImg = (url) => new Promise((resolve) => {
    //     let img = new Image();
    //     img.src = url
    //     img.onload = () => { 
    //         resolve(img.height)
    //     }
    //     return img;
    // })

    // loadImg(imgs[0].url).then( img => log('300?', img));






    // #######################   step 3   #########################
    // const f1 = async () => {
    //     const total = await imgs
    //         .map(async ({url}) => {
    //             const img = await loadImg(url)
    //             // log(img)
    //             return img
    //         })
    //         // .map(img => log(img)) //Promise라서 안풀림
    //         // .forEach(async a => {
    //         //     const bb = await a
    //         //     log('z? ', bb) //이건 됨
    //         // })
    //         .reduce(async (total, height) => await total + await height, 0)
            
    //         log(total)
    // }
    // f1();

    // 여기까지는 어케어케 됐는데 좋은 코드는 아님 
    // 왜냐면 이미지 중간에 하나라도 에러가 나면 전부다 멈추기 떄문 



    // #######################   step 4   #########################
    // 에러핸들링하기 
    // 에러라는 것은 발생이 되어야 잡을 수 있다. 지금은 에러가 발생이 안되는 상황.
    // const loadImg = (url) => new Promise((resolve, reject) => {
    //     let img = new Image();
    //     img.src = url
    //     img.onload = () => { 
    //         resolve(img.height)
    //     }
    //     // 의도적으로 에러를 발생시켜 reject로 내보냄
    //     img.onerror = (e) => {
    //         reject(e)
    //     }

    //     return img;
    // })



    // const f1 = async () => {
    //     try {
    //         const total = await imgs
    //         .map(async ({url}) => {
    //             try {
    //                 const img = await loadImg(url)
    //                 // log(img)
    //                 return img
    //             } catch (e) {
    //                 console.error(e)
    //                 throw e;
    //             }
    //         })
    //         // .map(img => log(img)) //Promise라서 안풀림
    //         // .forEach(async a => {
    //         //     const bb = await a
    //         //     log('z? ', bb) //이건 됨
    //         // })
    //         .reduce(async (total, height) => await total + await height, 0)
            
    //         log(total)
    //     } catch(e) {
    //         // 에러를 캐치해 NAN이 뜨는것을 0으로 만듦.
    //         // throw 전에는 NAN
    //         log(0)
    //     }
    // }
    // f1();




    // 중요!!!!!!! 
    // 아직도 문제가 심각함. loadimg 함수가 중간에 에러가 났음에도 끝까지 모두 실행해버림. 
    // 이게 post거나 insert update문이라면 문제가 심각해짐.
    // 개발자는 에러핸들링을 했지만 버그가 있는 코드. 아예 실행안되는 것보다 더 심각한 코드가 되어버림



    






    // #######################             #########################
    // #######################   해결방법   #########################
    // #######################              #########################

    //  const loadImg = (url) => new Promise((resolve, reject) => {
    //     let img = new Image();
    //     img.src = url

    //     console.log(url)
    //     img.onload = () => { 
    //         resolve(img)
    //     }
    //     // 의도적으로 에러를 발생시켜 reject로 내보냄
    //     img.onerror = (e) => {
    //         reject(e)
    //     }

    //     return img;
    // })

    // function* _map(fn, iter) {
    //     for(const a of iter) {
    //         // 아래 문제는 처음 문제였던 코드들과 마찬가지로 Promise와 undefined를 내보낸다 
    //         // 이런 문제를 해결하기 위해 동기적인 상황과 비동기적인 상황에 따라 합성함수를 변경한다 
    //         // yield fn(a)

    //         // a가 Promise라면 then에 함수를 넘겨주고, 아니라면 fn(a)를 넘겨주면 비동기는 then으로, 동기는 콜백 인자로 넘겨주게 된다 
    //         yield a instanceof Promise ? a.then(fn) : fn(a)

    //     }
    // }

    // #######################       개선코드 1      #########################
    // async function f2() {
    //     let acc = 0;
    //     // _map(({ url }) => log(url), imgs).next()
    //     // for await (const a of _map(({ url }) => loadImg(url), imgs)) { log(a) } //여전히 Promise 반환
    //     for await (const a of _map(img => img.height, _map(({ url }) => loadImg(url), imgs))) { // 이미지도 언디파인드. 동일
    //         // log('??', a)
    //         acc = acc + a;
    //     }

    //     log('acc?', acc)
    // }
    // f2();

    /* 이것도 아직은 좋은 소스가 아님. */
    
    
    // 위 f2함수의 일들이 리듀스
    // async function _reduceAsync(fn, acc, iter) {
    //     for await (const a of iter) { 
    //         acc = fn(acc, a)
    //     }
    //     return acc;
    // }
    // #######################       개선코드 1      #########################




    // #######################       개선코드 2      #########################

    // ## code 1
    // async function f2() {
    //     log(
    //         await _reduceAsync((a, b) => a + b, 0,
    //         _map(img => img.height, 
    //             _map(({ url }) => loadImg(url), imgs2)))
    //         )
    // }
    // f2();


    // ## code 2
    // 위 코드 에러핸들링.
    // async function f2() {
    //    try {
    //     log(
    //         await _reduceAsync((a, b) => a + b, 0,
    //         _map(img => img.height, 
    //             _map(({ url }) => loadImg(url), imgs2)))
    //         )
    //    } catch(e) {
    //     // 배열 4개중 3번째 이미지가 로드가 안될 시 2개만 로드하고 캐치 구문 실행. 
    //     // 에러 핸들링이 가능해짐.
    //     log('서버에 에러 전달')
    //     log(0)
    //    }
    // }
    // f2();


    // ## code 3
    // 위 코드에서 log()는 부수효과이므로 return 하여 부수효과가 없는 코드로 변경 
    // async function f2() {
    //     try {
    //      return await _reduceAsync((a, b) => a + b, 0,
    //          _map(img => img.height, 
    //              _map(({ url }) => loadImg(url), imgs2)))
        
    //     } catch(e) {
    //      // 배열 4개중 3번째 이미지가 로드가 안될 시 2개만 로드하고 캐치 구문 실행. 
    //      // 에러 핸들링이 가능해짐.
    //      log('서버에 에러 전달')
    //      return 0
    //     }
    //  }
    //  f2().then(log);

    // ## 결론
    // 외부 세상의 영향을 주는 것들을 개발자가 정확하게 제어할 수 있게됨.
    // 여기까지도 괜찮지만 에러 핸들링을 내부에서만 할 수 있음.
    /* 이 코드를 저렇게만 쓰도록 제약하는 코드  */

    // #######################       개선코드 2      #########################




    // 더 좋은 코드는 에러핸들링을 내부에서 하지않고 실행하는 쪽에서 하는게 좋음. 
    // 즉 사용하는 쪽에서 에러를 컨트롤 하게끔 하는게 좋다는 말 

    // #######################       개선코드 3      #########################
    /*
        ## 좋은 코드로 가기 위한 길 
        1. 인자 추가
        2. async await 삭제
        3. 즉시 리턴하기 때문에 함수표현식으로 변경했기 때문에 에러 여지가 없다. (이건 왜 ?)
           - 이 말은 인자로 들어간 imgs가 에러가 없는 값이라면 다른 부분에서는 절대 에러가 날 수 없는 코드.
           - 인자에 들어가는 값이 잘못되었을 때 에러가 나는 것. 
           - 인자가 잘못들어갈 것을 대비하여 앞쪽에서 if(){}로 타입검사 혹은 에러 검사를 하는 것도 그닥 좋은 코드는 아님.
             왜냐면 어떤 개발자는 imgs가 절대 에러가 없을 수 있고 어떤 개발자는 에러가 있게 만들 수도 있기 떄문.
             그런걸 함수 안에서 에러 핸들링한다고 try catch를 박는 건 딱 하나의 기능만을 위한 함수가 되어가기 떄문.
             때문에 함수 안에서는 에러를 잘 터트릴 수 있게 만들어두고 실행하는 쪽에서 그걸 핸들링 할 수 있게 제공

        4. 아래 코드는 지연적으로 작동되는 소스임. (함프 장점 중 하나..)
    */

    // const f2 = (imgs) => 
    //     _reduceAsync((a, b) => a + b, 0,
    //         _map(img => img.height, 
    //             _map(({ url }) => loadImg(url), imgs)))
     
    //  f2(imgs).then(log);
    //  f2(imgs2).catch(_ => 0).then(log);


     // #######################       개선코드 3      #########################




    // #######################       총 정리      #########################

    const loadImg = (url) => new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url

        console.log(url)
        img.onload = () => { resolve(img) }
        img.onerror = (e) => { reject(e) }

        return img;
    })

    function* _map(fn, iter) {
        for(const a of iter) {
            yield a instanceof Promise ? a.then(fn) : fn(a)

        }
    }

    async function _reduceAsync(fn, acc, iter) {
        for await (const a of iter) { 
            acc = fn(acc, a)
        }
        return acc;
    }
    
    const f2 = (imgs) => 
        _reduceAsync((a, b) => a + b, 0,
            _map(img => img.height, _map(({ url }) => loadImg(url), imgs)))
     
    //  f2(imgs).then(log);
    //  f2(imgs2).catch(_ => 0).then(log);
    
    // #######################       총 정리      #########################



    /*
        # 정리 

        - 재귀를 잘 다루자!

        - Promise, async/await, try/catch를 정확히 다르는 것이 중요. 


        - 제너레이터/이터레이터/이터러블을 잘 응용하면 
          코드의 표현력을 더할 뿐 아니라 에러 핸들링도 더 잘할 수 있음. 


        - 순수 함수에서는 에러가 발생되도록 그냥 두는 것이 더 좋음. 

        
        - 에러 핸들링 코드는 부수효과를 일으킬 코드 주변에 작성하는 것이 좋음. 
            ex)  f2(imgs).then(log);
            log를 찍는다거나 insert문을 날린다거나 하는 실행하는 쪽에서 에러 핸들링 하는게 좋다는 말.
        


        - 불필요하게 에러 핸들링을 미리 해두는 것은 에러를 숨길 뿐. 


        - 차라리 에러를 발생시키는게 낫다. 
          sentry.io 같은 서비스를 이용하여 발생되는 모든 에러를 볼 수 있도록 하는 것이 
          고객과 회사를 위하는 더 좋은 해법이다.


          

        질문타임 
        await에 에러를 reject하고 throw하는 코드까지 다 있음.


        순수함수와 부수효과 함수 나누는 기준? 인동님 개인적인 기준
        nodejs 기준이라면 
        api 등록하는 쪽에서는 try catch 하고 
        거기서 사용하는 함수들은 모두 순수함수이길 기대한다고함

    */

    

        

        const _loadImg = (url) => new Promise((resolve, reject) => {

            const img = new Image();
            img.src = url; 
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e)
            return img
        }) 

        
        _loadImg(imgs[0].url).then(img => log('??', img))

        const arr2 = ['a', 'b', 'c', 'aa', 'bb', 'cc', 'dd']

        function* ___map(fn, iter) {
            for(const a of iter) {
                yield a
            }
        }

        function* ___filter(fn, iter) {
            const newArr = [];
            for(const a of iter) {
                console.log('필터 안쪽. 몇번도는지?', a)
                if( fn(a) ) { yield a; return; }
            }
            return newArr
        }

        function run(fn, iter) {
            const newArr = []
            for(const a of iter) {
                newArr.push( fn(a) )
            }
            return newArr
        }

        function ___reduce(fn, acc, iter) {
            for(const a of iter) {
                acc = fn(acc, a)
            }
            return acc;
        }

        // const aa = arr2.filter((item) => item !== 'a')
        // console.log(aa)


        // 그냥 반복함수해서 뱉는 함수
        const r = run(
            a => { log('run?', a); return a }, 
            ___map(a => { log('map?', a); return a }, 
                ___filter(a => a === 'c', arr2)) , 
            
        )
        console.log('r?', r)

        ___map((a) => log(a), arr2)



        const rr = arr2.filter(a => { log('일반 필터 안 몇번도는지?', a); return a === 'c' }).map(a => a)
        console.log('rr?', rr)



        // reduce
        // const arr3 = [1, 1, 1]
        // const re = ___reduce(
        //     (a, b) => a + b,
        //     0, 
        //     ___map(a => a, arr3)
        // )

        // console.log('re?', re)

        
        




        // // promise 복습 
        // const testfn = () => new Promise((resolve, reject) => {
        //     const img = new Image();
        //     img.src = imgs[0].url
            
        //     img.onload = () => resolve(img)

        //     return img;
        // })



        // // testfn().then((img: HTMLImageElement) => log('i?', img.height))


        // const arr = [1,2,3,4]

        // function* __map(fn, iter) {
        //     for(const a of iter) {
        //         console.log('map a?', a)
        //         yield fn(a)
        //     }
        // }

        // function run(iter) {
        //     const newArr = []
        //     for(const a of iter) {
        //         log('inner a?', a)
        //        newArr.push(a)
        //     }
        //     return newArr;
        // }

        // const ho = run(
        //     __map(a => {
        //         log('outer a ?', a); 
        //         return a
        //     }, arr)
        // )
        // log('ho?', ho)


        // 이터 함수들을 비동기로 실행해주는 함수
        // const __reduceAsync = async (fn, acc, iter) => {
        //     for await (const a of iter) {
        //         acc = fn(acc, a)
        //     }
        //     return acc;
        // }

        // const f3 = () => 
        //     __reduceAsync((a, b) => a + b, 0, __map((img) => loadImg(img.url), imgs)).then(log)
        
        // f3();
        
        // 10
        // const abc = _reduceAsync(
        //     (a, b) => a + b, 
        //     0,
        //     __map(a => a, arr)
        // )
        
        


        interface User {
            name: string;
            age: number
        }

        interface User2 {
            age:number 
        }

        const user1: User = { name: 'j', age: 3 }
        const user2: User2 = { age: 3 }
        
        // const getUserName = <T, >(user: T): string => {
        //     return user.name; //name에 빨간줄... T안에 name이 없을수도 있다는 에러 
        // }
        const getUserName = <T extends { name: string } >(user: T): string => {
            return user.name; //extends 해줘야 선언문 user2에 에러가 뜸
        }

        

        getUserName(user1)
        // getUserName(user2)


        // typeof??

        const typeFn = (a: number, b: number): number => {
            return a + b
        }
        type A = ReturnType<typeof typeFn>
        type B = Parameters<typeof typeFn>


        






  return (
    <div>


        

    </div>
  )
}

export default FnPage