import { title } from "@/components/primitives";
import TodosTable from '@/components/todos/TodosTable';



const getTodos = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/todos/`)
	
	if(!res.ok) console.error('error??')
	return res.json();
}



export default async function TodosPage() {

	
	
	// 넥스트 퍼블릭 안붙이면 클라 컴포에서 읽을 수 없음.
	// console.log('server compo?????????????', process.env.BASE_URL)
	// console.log('data???', `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`)

	const res = await getTodos();
	// console.log('res???', res)
	return (
		<div>
			<h1 className={title()}>todos Page</h1>
			<TodosTable todos={res.data ?? []}/>

			<br />
			<br />
			<br />
			{/* <p>{process.env.TEST}</p> */}
		</div>
	);
}
