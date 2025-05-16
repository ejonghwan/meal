

import React from 'react'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import RestaurantCreateForm from '@/src/components/restaurant/restaurant-create-form';


const RestaurantPage = () => {

	/*
		가게명
		평 간단 
		카테고리 
		별점 
		주소 
		지도? 
		이미지?

	*/

	return (
		<ContentWrap>
			<Section>
				<RestaurantCreateForm />
			</Section>


		</ContentWrap>
	)
}

export default RestaurantPage

