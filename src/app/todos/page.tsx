

import { title } from "@/src/components/primitives";
import TodosTable from '@/src/components/todos/TodosTable';

//test 
import { getAllTodo, addTodo } from "@/src/data/firestore";

/*
@ path    GET /api/todos
@ doc     모든 할일 목록 가져오기
@ access  public
*/
// export const GET = async (req: NextRequest) => {

//     const fetchedTodos = await getAllTodo();
//     const res = {
//         state: 'SUCCES',
//         message: '성공',
//         data: fetchedTodos,
//     }
//     return NextResponse.json(res, { status: 201 })
// }





const getTodos = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/todos/`)

	if (!res.ok) console.error('error??')
	return res.json();
}





export default async function TodosPage() {


	// test
	const fetchedTodos = await getAllTodo();
	console.log('???', fetchedTodos)



	// 넥스트 퍼블릭 안붙이면 클라 컴포에서 읽을 수 없음.
	// console.log('server compo?????????????', process.env.BASE_URL)
	// console.log('data???', `${process.env.NEXT_PUBLIC_BASE_URL}/api/todos/`)

	const res = await getTodos();
	// console.log('res???', res)
	return (
		<div>

			<div>
				test
				{fetchedTodos.map((item, idx) => {
					return (
						<div key={idx}>{item.title}</div>
					)
				})}
			</div>


			<h1 className={title()}>todos Page</h1>
			<TodosTable todos={res.data ?? []} />

			<br />
			<br />
			<br />
			{/* <p>{process.env.TEST}</p> */}
		</div>
	);
}
