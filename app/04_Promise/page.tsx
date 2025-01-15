"use client"

import React, { useEffect } from 'react'



const PromisePage = () => {

    const fetchAPI = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data = await res.json();
        // console.log('data?', res, data)   // res는 네트웍정보, data는 [데이터 배열]
        return data;
    }

    useEffect(() => {
        const a = fetchAPI();
        console.log('aa', a) // Promise{<pending>}
        console.log('실행순서1')
        console.log('실행순서2')
        a.then(data => console.log('then?', data)).then(() => { console.log('finally') })
        console.log('실행순서3')

        // 실행순서 1 2 3  data  finally  //당연하게 콜스택이 비었을 때 프로미스가 실행됨
    }, [])





    /*
        #########  Promise가 나온 이유는 콜백지옥을 해결하기 위해 나온것도 있지만 
        #########  중요한건 왜 콜백지옥이 생기느냐임.
        #########  프로미스는 결과를 가지고 있는 상자 

        특징
        1. Promise를 보낼 때 다음할일을 같이 적어줘야함 fetch('https~', (data) => { '다음할일' }) 
        2. 코드의 순서가 순서대로 적용되지 않음 (나중할일 => 다음할일 순으로 실행됨) 
            fetch('https~', (data) => { '다음할일' }) 
            console.log('나중에 할일')

        3. p는 어떠한 결과값을 담고있는 상자. 나중에 까볼수있음
            const p = fetch(http://~, (data) => { console.log('다음할일 0') })
            console.log('다음할일 1')
            console.log('다음할일 2')
            p.then( (data) => {} ) //필요한 순간에 까봄

    */



    /*
        #########  async / await 

        1. 어싱크어웨잇은 promise반환 하는 함수 일때 사용
        2. setTimeout과 같이 사용하려면.. 타임아웃함수는 Promise를 반환하지 않기 떄문에 async를 못쓰고 Promise로 감싸줘야함 
        
        ex0).
        const setTiPro = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('3초뒤')
                resolve()
            }, 3000)
        })


        ex1). 함수로 감싸주느게 좋음
        const setTiPro = (cb, ms) => {
            return new Promise((resolve, reject) => {
            setTimeout(() => {
                cb();
                resolve()
            }, ms)
        }
        setTiPro(() => { console.log('3초뒤') }, 3000)
        
        
        ex2). 
        const delay = ms => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, ms)
            })
        }

        await delay(3000)
        console.log('3초뒤')




        ex3) async에 await이 없는 경우...이렇게 많이 사용함  
        await은 Promise함수 앞에 붙이며, 해당 Promise가 resolve될떄까지 기다려주는 역할인데 
        return할 때 Promise 함수를 리턴한다면 await을 함수 실행때 사용 가능  

        예시) 
        const delay = ms => new Promise((res, rej) => setTimeout(res, ms))
        const main = async() => await delay(1000) //여기에 await을 실행할 때 사용 
        await main();
        
        예시2) async함수는 Promse가 아닌걸 return 하더라도 await을 붙여줘야 리턴해줌 
        const a = async() => 'abc' 
        a() //아무값도 리턴안함 
        await a() //'abc'


        예시3) 하지만 main()에서 try catch하고 싶을 때는 return에 await을 붙여줘야함
        const main = async() => {
            try {
                return await delay(1000) 
            } catch(e) {
                console.error(e)
            }
        }



        ex4) await에 들어갈 수 있는 thenable
        
        then이 들어있는 객체를 await하는 경우 fulfilled에 있는 값이 리턴됨 


        예시코드1) 
        await { then(fulfilled, rejected) { fulfilled(123) } } //123
        이런 then안에 fulfilled 콜백함수를 가지고 있는 애들을 thenable이라고 하는데 Promise도 thenable임
        Promise안에도 then 함수가 들어있음.

        

        예시코드2)
        어떤 값이 thenable인지 확인하려면 
        const obj = Promise.resolve('ok');
        obj instanceof Promse// true 로 확인할 수 있다 

        하지만! Promise는 thenable이지만 thenable은 Promise가 아니기 떄문에 위처럼 찾을 수 없음
        그래서 아래처럼 몇가지 더 찾아줌
        thenable instanceof Object && 'then' in thenable && thenable.then === 'function'


        결론.
        Promise는 thenable의 부분집합. 
        async/await에서 await는 thenable의 then을 호출한다! 

       
    */



    /*
        
        #########  Promise.all과 async/await 차이점 

        ex1) Promise.all([ delay(100), delay(200), delay(300) ]) //총 0.3초 기다림.. 동시에 실행
        ex2) await delay(); await delay(); await delay(); //총 0.6초 기다림..순서대로 실행되기 떄문
        
    */



      /*
        
        #########  Promise.allSettled

        Promise.all은 중간에 하나 실패하면 나머지 결과도 알 수 없음 
        ex1) 
        const a = Promise.resolve('a');
        const b = Promise.reject('b');   //얘가 실패하면 a, c도 알 수 없음.
        const c = Promise.resolve('c');
        await Promise.all([a, b, c])  //uncaught b

        이럴때! 쓰는게   Promise.allSettled

        위 코드를  Promise.allSettled으로 변경해주면 []에 각각의 결과를 {}으로 담아서 리턴해줌
        각각 데이터에 아래처럼 나옴
        {status: 'fulfilled', reason: 성공데이터}
        or
        {status: 'rejected', reason: 에러내용}


        하지만! all이 allsettled보다 빠름
        상황에 맞게 쓰자
        
        
    */  


    /*
        
        #########  await과 then을 같이 쓰면 ? 
        
        1. await은 Promise가 아니어도 그냥 리턴을 해줌 
            await '123' //'123'
        
        2. 만약 Promise라면 resolve된 다음에 반환을 함 
            await Promse.resolve('123') //'123'    
        
        3. 같이 쓰면 ? then까지 모두 기다린 다음 await을 시킴. 
            await Promise.resolve('123').then(() => '234')

            이 성질을 이용해서 error가 있는 Promise를 try catch로 잡는게 아니라 catch를 바로 사용가능
            await Promise.reject('error happened').catch(console.log)
    */  



    /*
        
        #########  Promise.race는 가장 먼저 끝나는 애를 리턴해줌.
        #########  다만 다른실행값들도 실행은 되는데 결과만 못받는걸 주의해야함. 
        
        ex1)
        Promise.race([ Promise.reject('a'), Promise.resolve('b') ]); //Promise{<rejected>: 'a'} 실패하더라도 가장 먼저 끝나는 애를 리턴
        
        ex2) 활용팁. 
        아래처럼 fetch가 5초보다 일찍 끝나면 실행 후 결과값을 받아가고, 아니라면 실행은 하되 결과는 못받고 시간초과 에러가 뜨게 만들 수 있음.
        Promise.race([
            fetch('api~'),
            new Promise((res, rej) => setTimeout(() => rej(new Error("시간초과"))))
        ]) 

    */ 
   
        

    /*
        
        #########  Promise.any는 가장 먼저 성공한 애만 리턴해줌
        #########  다만 다른실행값들도 실행은 되는데 결과만 못받는걸 주의해야함. 
        #########  any는 다수 중 하나라도 성공할 때 까지 기다려주기 떄문에 무조건 결과값을 받을 수 있음 

        모두 reject되면? AggregateError: All promises were jectected 라는 에러가 뜸
        
    */  




  return (
    <div>PromisePage</div>
  )
}

export default PromisePage