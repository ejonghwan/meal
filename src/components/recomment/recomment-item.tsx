import React from 'react'
import Loader from '../loader/loader'

const RecommentItem = ({ recomment }) => {
   return (
      <div>
         <Loader />
         {recomment.content}
      </div>
   )
}

export default RecommentItem