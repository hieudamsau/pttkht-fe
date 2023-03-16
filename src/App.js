import {Routes as ListRote, BrowserRouter, Route, Navigate} from "react-router-dom"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeatailUser from "./DeatailUser";
import ListTeacher from "./page/ListTeacher";
import ListUsers from "./page/ListUsers";
import Login from "./Login";
import MarkDetail from "./MarkDetail";

function App() {
	return (
		<div>
			<BrowserRouter>
				<ToastContainer/>
				<ListRote>
					<Route exact path='/teacher' element={<RequireAuth><ListTeacher/></RequireAuth>}/>
					<Route exact path='/marks/:ma_sv' element={<RequireAuth><MarkDetail/></RequireAuth>}/>
					<Route exact path='/user/:id' element={<RequireAuth><DeatailUser/></RequireAuth>}/>
					<Route exact path='/user/' element={<RequireAuth><DeatailUser/></RequireAuth>}/>
					<Route exact path='/students' element={<RequireAuth><ListUsers/></RequireAuth>}/>
					<Route exact path='/login' element={<Login/>}/>
				</ListRote>
			</BrowserRouter>
		</div>
	);
}

function RequireAuth({children}) {
	const user = JSON.parse(localStorage.getItem('user'))
	if (user?.email === undefined) {
		return <Navigate to={'/login'}/>
	}
	return children
}

export default App;
