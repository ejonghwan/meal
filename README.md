readme
디디

 1) .env 파일 : 모든 환경에서 공통적으로 적용할 디폴트 환경변수를 정의한다. 가장 우선순위가 낮다.
 2) .env.development 파일: 개발 환경(process.env.NODE_ENV === 'development') 에서 적용된다.
 3) .env.production 파일: 배포/빌드 환경(process.env.NODE_ENV === 'production') 에서 적용된다.
 4) .env.test 파일: 테스트 환경(process.env.NODE_ENV === 'test') 에서 적용된다.
 5) .env.local 파일 : 가장 우선순위가 높다. 다른 파일들에 정의된 값들을 모두 덮어쓴다.(오버라이드)



## 실험 1 
SSR에서 데이터 받아서 CSR에 data props으로 넘기면 데이터는 CSR일지 ?? 
=> data request 자체는 SSR에서 했기 때문에 SSR로 작동


## 실험 2 
CSR에서 바로 호출한 데이터는 ? 
=> html 파일에는 호출되어 보이지 않음.. 근데 일반 택스트들은 그냥 보이는 듯 ?

## 실험 3 
### CSR 컴포넌트에서 SSR 컴포넌트 호출해보기 (no children)
=> 무한 호출되면서 아래 같은 워닝이 뜸 
경고: async/await는 아직 클라이언트 구성 요소에서는 지원되지 않으며 서버 구성 요소에서만 지원됩니다. 이 오류는 원래 서버용으로 작성된 모듈에 '클라이언트 사용'을 실수로 추가하여 발생하는 경우가 많습니다. 오류 구성요소 스택

```typescript
    <CSRChildren />  //안에서  SSRChildren 호출
```

### CSR 컴포넌트에서 SSR 컴포넌트 호출해보기 (children)
=> SSR로 잘 호출 됨 


```typescript
    <CSRChildren>
        <SSRChildren /> 
    </CSRChildren>
```




## onBlur에서 e.relatedTarget 기억하기 
다음 포커스 타겟임.

e.target //지금 찍은 타겟
e.currentTarget // 원래 타겟 (고정)
e.relatedTarget // 다음 타겟
        



## Image 컴포넌트 테스트

### 사용법
```typescript


// config
const nextConfig = {
  reactStrictMode: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // breakPoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // breakPoints
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.namu.wiki",
      },
    ],
  },
};

export default nextConfig;






// width height를 지정해주면 next.config.js에서 설정한 사이즈의 분기 최대값을 가져온다 
// 예를 들어 config의 images: [10, 30, 70, 100, 150] 이었을 시 70사이즈를 가져옴. ( 요청은 &w=70 이런식으로 ) 
// 원본이 700px의 이미지여도 고유사이즈가 70px로 받아와짐
<div style={{ position: 'relative' }}>
    <Image src={'/aab.png'} alt={'hoho'} width={50} height={50} />
</div>


// fill 옵션을 줬을 때는 가장큰 이미지를 가져와서 디바이스 크기에 따라 렌더링함. 
// 예를 들어 600이었다면 config에서 600에서 가까운 최대값을 가져와서 200x200으로 렌더링함. 
// 실제 이미지가 200짜리라면 fill을 넣든 큰 이미지를 요청(width: 1080 등)하던 원본이미지는 200 
<div style={{ width: '200px', height: '200px', position: 'relative' }}>
    <Image src={'/error.png'} alt={'hoho'} fill loading='eager'/>
</div>


// 아래 같은 경우에는 렌더링되는 사이즈는 200x200이고 이미지가 1080사이즈여도 700x700으로 다운로드함 (고유사이즈 700x700)
<div style={{ width: '200px', height: '200px', position: 'relative' }}>
    <Image src={'/error.png'} alt={'hoho'} loading='eager' fill width={700} height={700}/>
</div>



// 위와 마찬가지로 요청시엔 가장 큰 사이즈를 가져와서 디바이스 사이즈에 맞게 렌더링 시킴 
<div style={{ width: '100%', height: '500px', position: 'relative' }}>
    <Image src={'/error.png'} alt={'hoho'} fill loading='eager'/>
</div>

/*
    fill을 사용할 경우 같은 이미지를 어떤 컴포넌트 내에서 렌더링하냐에 따라 적절한 sizes를 지정해야
    렌더링할 크기보다 한참 큰 이미지를 불러오는 일이 일어나지 않음
    물론 이미지를 크기에 맞게 변환하여 내려주는 것 자체가 리소스가 드는 일이기 때문에,
    breakPoints를 과도하게 설정해주는 것이 좋지는 않음.
    대체로 필요한 경우를 제외하고, 기본값을 사용하면 될 듯
    원본 이미지가 600px이라면, 1080사이즈, 1200사이즈로 요청하더라도 원본 이미지가 내려오게 됨
*/
```