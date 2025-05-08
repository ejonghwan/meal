

import React from 'react'
import ContentWrap from '@/src/components/common/content-wrap'
import Section from '@/src/components/common/content-section'
import RestaurantTable from '@/src/components/restaurant/restaurant-table';

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
				<RestaurantTable todos={[{ id: "a", is_done: false, title: "a title", created_at: "24" }]} />
			</Section>


		</ContentWrap>
	)
}

export default RestaurantPage