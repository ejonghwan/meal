"use client"

import React from 'react'
// test
import { useUserStore } from '@/src/store/front/user'

const Home = () => {


	// zus test
	const { arr, removeArr, addArr } = useUserStore();

	console.log(arr, removeArr, addArr)

	return (
		<div>하지만 다 했죠?</div>
	)
}

export default Home