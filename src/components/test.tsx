"use client"

import React, { useEffect, useState, useRef } from 'react'
import parse, { domToReact } from 'html-react-parser'


import Test2 from './test2'



const componentMap = {
  Test2: Test2,
  // 필요하면 다른 컴포넌트 추가
};


const Test = ({ data }) => {
    
  const [dd, setDd] = useState([])
  const [tit, setTit] = useState('')
  const testRef = useRef(null);
  const [dataCompo, setDataCompo] = useState();

  const dataStr = '동적인 데이터'


  useEffect(() => {
    console.log('data??', data)


    setDataCompo(data.data.component) // josn 컴포넌트로

    // 컴포넌트 매핑해서 저장
    if (data.data.component && componentMap[data.data.component]) {
      setDataCompo(() => componentMap[data.data.component]);
    }


    setTit(data.data.content)
  
     const el = testRef.current.querySelector('.tit');
      if (el) {
        el.innerHTML = dataStr;
      }
  }, [tit])

  

    // console.log('win out?', window )
    // useEffect(() => {
    //     console.log('win in?', window )
    // }, [])
    
    const handleLcick = () => {
      setDd(prev => [...prev, 'dd'])
      console.log('dd?', dd)
    }

    const handleSubmit = () => {
      console.log(dd)
    }


    const DynamicComponent = dataCompo;


    // lib 이용해서 렌더링 
    // const parsedComponent = parse(tit, {
    //   replace: (domNode) => {
    //     if (domNode.name === 'Test2') {
    //       // 컴포넌트 이름과 속성을 이용하여 새로운 컴포넌트 생성
    //       return <div>{domNode}</div>
    //     }
    //   },
    // });

      const parsedComponent = parse(tit, {
        replace: (domNode) => {
          // 커스텀 마커 방식
          if (
            domNode.name === "component" &&
            domNode.attribs &&
            domNode.attribs.is
          ) {
            const Comp = componentMap[domNode.attribs.is];
            if (Comp) {
              return <Comp />;
            }
          }
        },
      });

  return (
    <div>
      <div style={{ border: "1px solid blue" }} className='border border-1 border-[#ddd]' dangerouslySetInnerHTML={{ __html: tit }} ref={testRef}></div>
      <div style={{ border: "1px solid red" }}>{DynamicComponent && <DynamicComponent />}</div>

      <br /><br /><hr />
      <div>파서?</div> 
      {/* {parse(tit)} */}
      {parsedComponent}



      <br /><br /><hr />

      <button type='button' onClick={handleSubmit}>suyb</button>
      <button type='button' onClick={handleLcick}>zz</button>


      <br /><br /><hr />


      <div>
        이건 그냥 호출
      <Test2 />
      </div>
    </div>
  )
}

export default Test