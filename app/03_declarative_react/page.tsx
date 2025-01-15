import React from 'react'

const page = () => {
    return (
        <div>page</div>
    )
}

export default page


// import React from 'react'
// import { useUsers } from './hooks/useUsers' 
// import userForm from './components/UserFrom' 
// import UserList from './components/UserList' 
// import ErrorBoundary from './compontnts/ErrorBoundary' 



// // 페이지에서는 선언적인 부분만 즉 what만 보여주면 됨 
// const page = () => {
//     const { users, isLoading, error, addUser, deleteUser } = useUsers();

// /*
//     명령형 프로그래밍
//     1. 유저를 가져오는 로직
//     2. 유저를 추가하는 로직 
//     3. 유저를 삭제하는 로직
//     4. 에러가 나는 로직
//     5. 로딩중을 표시하는 로직
//     6. 그 후에 유저를 상태에 담아 표시하는 로직

//     이러한 로직들이 순서로 쭉 나열되어 있음
//     이걸 이 페이지에서 명령형으로 개선

// */


// /*

//     선언적 프로그래밍의 핵심 (리액트버전)  -  how가 아닌 what
//     1. 상태관리 로직을 커스텀 훅으로 분리 
//     2. 비동기 작업을 선언적으로 처리 
//     3. 컴포넌트를 더 작은 단위로 분할 
//     4. 단일 책임 원칙


//     <ErrorBoundary> => 난 에러처리 할거야. how는 컴포넌트 안에 들어가봐야 알 수 있다 
//     이 부분들이 컴포넌트를 나누는 기준!! 

//     쪼개는 기준은 "책임(목적)"
//     ErrorBoundary는 에러를 처리하는 목적이기 떄문에 하나의 컴포넌트로 묶은 것
// */

//   return (
//     <div>
//         <ErrorBoundary> 
//             <div>
//                 <h1>User Management</h1>
//                 <UserForm onSubmit={addUser} />
//                 <UserList 
//                     users={users}
//                     onDeleteUser={deleteUser}
//                     isLoading={isLoading}
//                     error={error}
//                 />
//             </div>
//         </ErrorBoundary>

//     </div>
//   )
// }

// export default page






// // useUser 안에는 ? 

// import { useState, useCallback } from 'react'
// import { fetchUsers, addUserApi, deleteUserApi } from '../api/userApi'


// // 목적이 중요 
// const useUsers = () => {
//     const [users, setUsers] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null)


//     const loadUsers = useCallback(async() => {
//         setIsLoading(true);
//         setError(null)
//         try {
//             const data = await fetchUsers();
//             setUsers(data)
//         } catch (err) {
//             setError('error')
//         } finally {
//             setIsLoading(false)
//         }
//     }, [])

//     const addUser = useCallback(async (name) => {
//         if(!name.trim()) return;
//         setIsLoading(true)
//         setError(null)

//         try {
//             const newUser = await addUserApi({ name })
//             setUsers(prevUsers => [...prevUsers, newUser])
//         } catch(err) {
//             setError('error')
//         } finally {
//             setIsLoading(false)
//         }

//     }, [])


//     const deleteUser = useCallback(async (userId) => {
//         setIsLoading(true)
//         setError(null)

//         try {
//             await deleteUserApi(userId)
//             setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
//         } catch(err) {
//             setError('error')
//         } finally {
//             setIsLoading(false)
//         }
//     }, [])


//     return { users, isLoading, error, addUser, deleteUser, loadUsers }

// }



// // ErrorBoudnery 내부는 how. 선언할 땐 what 
// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { hasError: false }
//     }

//     // hasError의 상태를 변경해줌
//     static getDerivedStateFromError(error) {
//         return { hasError: true }
//     }

//     render() {
//         if(this.state.hasError) {
//             return <h1>something went wrong.</h1>
//         }
//         return this.props.children
//     }
// }



// // userForm
// const UserForm = ({ onSubmit }) => {
//     const [name, setName] = useState('')

//     const handleSubmit = e => {
//         e.preventDefault();
//         onSubmit(name)
//         setName('')
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input 
//                 type="text"
//                 value={name}
//                 onChange={e => setName(e.target.value)}
//                 placeholder='enter new user name'
//              />
//              <button type="submit">ADd user</button>
//         </form>
//     )
// }




// const userList = ({ users, onDeleteUser, isLoading, error }) => {
//     if(isLoading) return <div>Loading...</div>
//     if(error) return <div>{error}</div>

//     return (
//         <ul>
//             {users.map(user => {
//                 return (
//                     <li key={user.id}>
//                         {user.name}
//                         <button onClick={() => onDeleteUser(user.id)}>Delete user</button>
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// }