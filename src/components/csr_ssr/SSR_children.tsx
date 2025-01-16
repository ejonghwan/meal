import React from 'react'

const SSRChildren = async () => {

  const getDataApi = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: "no-cache" })
    const data = await res.json();
    return data;
    //  console.log('data??', res, data)
  }

  const dd = await getDataApi();
  console.log('ddasdasdasd?', dd)


  return (
    <div>
      <h2>SSR_children</h2>
      {dd.map((item: any, idx: number) => {
        return (
          <li key={idx}>{item.title}</li>
        )
      })}
    </div>
  )
}

export default SSRChildren