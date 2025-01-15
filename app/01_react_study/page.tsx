"use client"

import React, { useEffect, useState } from 'react'

const StudyPage = () => {

    
    /*
        1. js 엔진이 세번을 훑으며 함수선언을 수집, 변수 초기화, 환경을 구성 (이때 함수간의 스코프 객체 생성)
        2. 위에서 아래로 소스를 읽으며 함수를 만나면 콜스택에 담고 마지막부터 실행됨 
        3. 비동기 기능들은 큐에 담아두고 콜스택이 비었을 때 이벤트 루프가 콜스택에 밀어넣어 실행함
        
        ## 리액트 함수형의 구현방식
        1. 상태값으리 변화가 가상돔에서 react가 감지하면 재렌더링을 함 
        2. 때문에 컴포넌트 함수 안에 있는 모든 변수와 함수 등은 초기화함 
        3. 2번의 특성 때문ㅇ ㅔ컴포함수 안에서는 변수와 함수들은 호출되면서 모두 초기화됨
            (재렌더링은 useState의 상태값이 변경되거나 초기 진입 시 발생)
            (컴포를 잘 분리하면서 메모이제이션을 잘 해야하는 이유)
    */



    // ############################################################################# 
    // ############################################################################# useState 주의점
    // ############################################################################# 

    // 초기값을 함수로 바로 넘겨버리면 렌더링이 될때마다 계속 실행 
    // const [user, setUser] = useState(hardWork())
    // const [user, setUser] = useState(() => hardWord()) // 헤비한 작업을 default로 넣을 땐 함수로 넘겨줘야함    
    
    /* 
    const [input, setInput] = useState('');
    const handleInputChange = e => setInput(e.target.value)
    useEffect(() => console.log('use state render'))
    //setUser(prev => prev + 1)
    //setUser(user + 1)

    const [test, setTest] = useState(0);
    const [test2, setTest2] = useState(0);
    */

    // test1
    // const handleTestClick = e => {
        /*
            1. 리액트는 효율적 렌더링을 위해 비동기적 작동(일괄처리). 인자로 값을 넘겨주면 세번을 실행했어도 1번만 실행됨
            setTest(test + 1) // B(결과값) = A(이전값) + 1
            setTest(test + 1) // B(결과값) = A(이전값) + 1
            setTest(test + 1) // B(결과값) = A(이전값) + 1
            결론 : 결과값에 이전값이 계속 같은 값으로 담김
        */

        /*
            2. 그래서 함수 형태로 전달해줘야함
            setTest(prev => prev + 1)
            1-1 C(결과값) = B(이전값) + 1 => 1
            1-2 C를 B에 저장

            setTest(prev => prev + 1)
            2-1 C = B + 1 => 2
            2-2 C를 B에 저장 

            setTest(prev => prev + 1)
            3-1 C = B + 1 => 3
            3-2 C를 B에 저장
            
        */
    //}


    // test2. 동기적으로 업데이트 되던 state 값을 중간에 가져올 수 있는지 ? 
    /*
    const handleTestClick_2 = e => {
        setTest(prev => prev + 1)
        setTest(prev => prev + 1)
        setTest2(test + 1)
        
            결과 : 가져올 수 없다 
            2번 버튼을 누르면 setTest함수가 두번 실행된 값 2와 + 1된 값인 3이 나와야하지만 결과는 1임. 
        
    }
    */

    // test3. 그리고 위처럼 여러번 함수를 실행해도 각각 리렌더링이 일어나는게 아닌, 콜스택에 담아두고 실행 후 한번에 리랜더링을 함.
    
    


    // ############################################################################# 
    // ############################################################################# useEffect
    // ############################################################################# 

    // useEffect(() => {}). 상태가 변경되면 함수자체가 리렌더링. 매번 실행
    // useEffect(() => {}, []). 마운트 될 때 한번만 실행
    // useEffect(() => {}, [a]). 마운트 될 때 한번, a가 변경될떄만 실행




     // ############################################################################# 
    // ############################################################################# useRef
    // ############################################################################# 

    /*
        1. 그냥 변수 -> 렌더링할떄마다 초기화
        2. useState -> 렌더링에 영향 
        3. useRef -> 렌더링에 영향을 받지않음. app이 실행될때와 끝날때만 초기화. 그 밖엔 계속 유지함. 
    */




    // ############################################################################# 
    // ############################################################################# useMemo
    // ############################################################################# 

    
    // 주의. 꼭필요한것만 메모리에 저장하는 게 좋음.
    // 같이 렌더링이 발생해서 리셋되는 참조 형 데이터라면 자주 변경되지 않는 값들은 메모이제이션 해두는 게 좋을듯?
    // 사용방법. useMemo(0 => '계산할 함수, ['value 의존성이 변경될 때만 실 행 ])
    /*
        react함수는 상태가 변경되면 함수를 다시 실행 (재렌더링)하기 때문에 그 안에 있 는 함수들 변수를 모두 초기화 함.
        때문에 컴포넌트 안에는 함수를 최대 한 안넣는게 좋음.

        그리고 계산 함수 실행이 2개 있다면 2 개가 모두 실행되기 때문에 무거운 작업은 메모이제이션 해두는 게 좋음.

        ex1) 하드계산 / 이지계산이 있다면 이지계산을 눌러도 하드계산을 다시 해버림.
        ex2) 원시형은 useEffect로 가능하지 만 참조형은 useEffect로 잡아내지 못함.

        이럴 때 useMemo 써야함.

        const name = 'jong'
        useEftect(() => {}, [name]) 원시형이면 변경을 알아챔. 정상작동

        const name={namekey:"jong"};
        useEttect(() => {}, [name]) 
        하지만 참조형이면 알아채지 못해서 name이 변경되지 않아도 계속 실행됨


        const [hardN, setHardN] = useState(5)
        const [easyN, setEasyN] = useState(1)

        1/ 아래 함수들은 TestHooks 밖에 있는 게 좋음

        const hardCalc = (n) => {
            console.log('복잡한 계산)
            for(let i = 0; i < 999999999; i++)
            return n
        ｝

        const easyCalc = (n) => {
            console.log('쉬운 계산')
            return n
        }
        const hardSum = hardCalc(hardN);
        const hardSum = useMemo (0) => hardCalc(hardN), [hardN])
        const easySum = easyCalc(easyN);

        위 경우는 많이 없지만 아래 같은 경우 는 많음
        const [ changeN, setChangeN] = useState(0)
        const [isHoho, set|sHoho ] = useState(false)

        I const str = isHoho ? '종환' : '이 님'// 원시형
        I const str = tinner: IsHoho ? 송 환' : '아님'}// 참조형

        const str = useMemo (0) => { inner:isHono ? '종환 : '아님' }), [isHohol)
        메모이제이션
        useEffect(0) =>{
            console.log(????????? useEffect호출')
        //}, [str.inner]) 이렇게는 되네 
          }, [str]) / 넘버 바꿀 때도 이게 계속 호 출됨. 참조객체라

    */



    // ############################################################################# 
    // ############################################################################# useCallback
    // #############################################################################      


    /*
          use : useCallback(메모이제이션할 함수, [])

          # 문제 1
          const calcFn = n => { return n + 3 }
          위 함수는 재렌더링될때마다 계속 calcFn에 담기면서 초기화됨 
 
          # 해결 1
          useCallback(n => {return n + 3}, [state]) 이렇게 감싸주면 state가 변경되기 전까지는 
          다른 state가 변경되어도 초기화하지 않음.

          
          # 문제 2
          const [calcNum, setCalcNum] = useState(0)
          const handleOutputNumber = () => { console.log('calc fn?', calcNum) }
          위 함수는 버튼을 누를때마다 calcNum을 올리는 함수인데 useEffect가 실행될 때마다 계속 초기화를 거치며 함수가 실행됨

          그렇다고 아래처럼 useCallback만 감싸준다면 초기값인 0만 찍힘. 
          // const handleOutputNumber = useCallback(() => { console.log('calc fn?', calcNum)}, [])

          # 해결 2 
          const handleOutputNumber = useCallback(() => { console.log('calc fn?', calcNum)}, [calcNum])
          위처럼 의존성 배열에 넣어줘야함. 

          
          useEffect(() => {
            console.log('useEffect 실행') // 이건 함수가 변경되지 않는 한 실행되면 안됨 
            // 함수가 들어있는 변수값에 값이 변경되지도 않았는데(육안상, 사실은 변경되고 있음) 계속 콘솔이 찍힘 
            // 이유는 handleOutputNumber 라는 변수 안에 함수의 주소값이 계속 다르게 들어가서 리액트가 다른 값 이라고 인식하기 떄문!! 
            // 컴포넌트가 다시 호출(리렌더링) 되더라도 값을 다시 담지 않게 하기 위해 사용 
          }, [handleOutputNumber]) //이 변수가 변경되는지 감지 

          // 살짝 헷갈림
          // useMemo는 리턴값 혹은 변수에 대한 메모이제이션 
          // useCallback은 리턴값 / 컴포넌트에 관련된 값을 메모이제이션?? 
          

    */



    // ############################################################################# 
    // ############################################################################# Context API, useContext
    // ############################################################################# 
   
    /*
        const { isDark, setIsDark } = useContext(userContext);
        const handleDarkClick = e => setIsDark(!isDark);


        # 기본 사용방법
        import React, { createContext } from "react";
        import Children from "./Children";

        // AppContext 객체를 생성한다.
        export const AppContext = createContext();

        const App = () => {
        const user = {
            name: "김채원",
            job: "가수"
        };

        return (
            <>
                <AppContext.Provider value={user}>
                    <div>
                    <Children />
                    </div>
                </AppContext.Provider>
            </>
            );
        };

        export default App;


        // -------------------------------------------
        
        # 응용 1. context + useReducer 
        import { createContext, useReducer } from 'react';
        import UserReducer, { UserIntialState } from '../reducers/UserReducer.js';


        // 1. 컨텍스트 만들기
        export const UserContext = createContext(null);

        // 2. 공급자 함수(hoc)
        export const UserProvider = ({children}) => {
            // 3. reducer 연결 useReducer가 (state, dispatch) 리턴해줌 
            const [ state, dispatch ] = useReducer(UserReducer, UserIntialState);

            return (
                // 4. 만든 컨텍스트 provider에 넣기
                <UserContext.Provider value={{ state, dispatch }}>
                    {children}
                </UserContext.Provider>
            );
        };
        
        # 프로바이더 
        import { UserProvider } from './context/UserContext';
         <UserProvider>
            <App />
         </UserProvider>

         # 사용
         const { state, dispatch } = useContext(UserContext);


        // -------------------------------------------------


        # 응용 2. custom context 
        import { createContext, useContext, useState } from 'react';

        export const GlobalContext = createContext();

        export function GlobalProvider({ children }) {
            const [menuOpen, setMenuOpen] = useState(false);
            return <GlobalContext.Provider value={{ menuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
        }

        export function useGlobalState() {
            const globalContext = useContext(GlobalContext);
            if (!globalContext) throw new Error('useGlbalData hook은 GlobalProvider컴포넌트 안에서만 호출가능');
            return globalContext;
        };


        # 프로바이더 
        import { GlobalProvider } from './context/UiContext';
        <GlobalProvider>
            <App />
        </GlobalProvider>

        # 사용 
        const { menuOpen, setMenuOpen } = useGlobalState();

    */



    // ############################################################################# 
    // ############################################################################# useReducer
    // #############################################################################     

    /*
        useReducer는 뎁스가 복잡한 객체에 사용적합함 
        1. view에서 dispatch(요구)하며 action(요구내용)을 보냄
        2. reducer에서 state를 update함 
        

        # 리듀서 파일 
        const initailState = { name: 'jonghwan };
        const reducer = (state = initailState, action) => {
            switch(action.type) {
                case "NAME_CHANGE" : 
                    return {
                        ...state,
                        name: action.payload
                    }
                    
                default { ...state }
            }
        } 

        # 컴포넌트에서 사용
        const [state, dispatch] = useReducer(reducer, initailState);

        # 액션 보내기
        const handleReducerTest = () => {
            dispatch({ type: "NAME_CHANGE", payload: "lee" })
        }

    */





    // ############################################################################# 
    // ############################################################################# JSX event 
    // #############################################################################  


    /*
       1. react 이벤트 객체는 무조건 맨 뒤 인자로 고정
       const nRef = useRef(0);
       const clo = ho1 => ho2 => ho3 => { console.log(ho1, ho2, ho3) } 
       <div onClick={clo('a')('b')}></div>

       // ho1이 'a'
       // ho2이 'b'
       // ho3이 이벤트객체

       2. 클로저 사용해보기
       const cloFc = useCallback((ho1) => {
        let kaka = 0;
        console.log(kaka)
        return (ho2) => {
            kaka++
            console.log('kaka', ho1, ho2)
            return kaka
        }
       }, [])

       const zzz = cloFc('ho1111');


       const [bbc, setBbc] = useState(33);
       const handleBBC = () => {
        setBbc(prev => prev + 1)
       }


         
    */



    // ############################################################################# 
    // ############################################################################# React.memo
    // ############################################################################# 


    /*
    
        # 리액트는 부모 컴포넌트가 렌더링되면 거기서 호출된 자식컴포도 모두 렌더링 다시 함 
        # memo는 hoc방식. 컴포넌트를 인자로 받아 가공 후 새로운 컴포넌트로 반환. 
        # prop check를 통해서 prop가 변경되었을 때만 리렌더링하기 때문에 조심. 즉 prop가 자주 변경되지 않으면 감싸는게 좋음 
        # 주의점은 useState, useReducer, usContext로 변경된다면 여전히 리렌더링함 
       
        # 사용? 
        1. 컴포넌트가 같은 props로 자주 렌더링될 때 
        2. 컴포넌트가 렌더링될떄마다 복잡한 계산을 할 때 

        # 만약 이 컴포넌트에서 차일드 컴포넌트를 호출하고 있는데 이 안에서 api호출 후 계산하는 식이 있다면 ? 
          이 컴포넌트에서 상태가 변경되어 리렌더링 될 때마다 차일드 컴포넌트도 계속해서 렌더링 됨. 
          이 차일드 컴포를 props 변경시에만 렌더링되게 하는게 중요. 

        

    */


    // ############################################################################# 
    // ############################################################################# React.memo + useMemo
    // ############################################################################# 


    /*
       # prop check하는 memo에서도 참조형은 리렌더링을 하기 떄문에, 참조형은 useMemo로 감싸주는 것이 좋다
       
       ## 사용방법 
       1. 부모에서 props를 변경하지 않는 한 memo로 감싼 컴포넌트는 리렌더를 하지않음. 
       2. 하지만 참조형으로 전달한다면 계속 리렌더링이 일어남. 
       3. 부모에선 const name = { first: 'ho', last: 'haha' } 이런 참조형은 부모컴포가 리렌더링을 할때마다 초기화를 하기 때문에 name이라는 변수에 계속해서 다른 주소값이 담김. 
       
       ## 문제와 해결
       # 문제 1
       자식을 memo로 감싸고 name을 props으로 내려줬는데, name이 변경되지도 않았는데 자식컴포가 계속 리렌더링됨
       
       # 해결 1
       부모에 있는 name을 useMemo로 감싸주자 
       const useMemo(() => {
        return { first: 'ho', last: 'haha' }
       }, [])


       # 문제 2
       함수도 마찬가지로 참조형이기 때문에 prop으로 넘겨줬을 때 분명 변경되지 않았는데, 또 memo로 감싸주었는데도 리렌더링이 된다. 
       예를 들어 const handleClick = () => {}; 이런 함수를 prop으로 넘겨주면서 자식을 memo로 감싸줘도 리렌더링이 일어난다는 의미이다. 

       # 해결 2
       const handleClick = useCallback(() => {}, []) 
       useCallback으로 변경하면 해결된다

       memo는 컴포넌트를, props 체크 후 변경 시 리렌더링 
       useMemo는 어떤 값을 메모이제이션. 
       useCallback은 어떤 함수를 메모이제이션 
    */


       const [n, setN] = useState(3)
       const handleNumber = a => b => c => {
        console.log(a, b, c)
       }

    return (
        <div>
            <section>
                <h1>event test</h1>
                {n}
                {/* case 1 : 이건 그냥  실행한거임. log : aaa bbb ccc */}
                {/* <button type='button' onClick={handleNumber('aaa')('bbb')('ccc')}>nnn</button> */}


                {/* case 2 : 이벤트 걸린거. log : aaa bbb event */}
                {/* <button type='button' onClick={handleNumber('aaa')('bbb')}>nnn</button> */}


                {/* case 3 : 실행안된거. log : 안나옴  */}
                {/* 이건 당연히 실행이 안됨. 두번쨰까지 밖에 없기떄문에. */}
                {/* <button type='button' onClick={() => handleNumber('aaa')('bbb')}>nnn</button> */}


                {/* case 4 : 이벤트 걸린거. log : 클릭시 aaa bbb ccc  */}
                {/* 콜백함수로 넘기는건 클릭 시 콜백함수를 실행하라는 뜻이니 그대로 실행되는게 맞음. */}
                {/* <button type='button' onClick={() => handleNumber('aaa')('bbb')('ccc')}>nnn</button> */}
            </section>
            
        </div>
    )
}

export default StudyPage