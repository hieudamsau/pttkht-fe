import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import ModalChangePass from "../component/ModalChangePass";

const {Header, Content, Footer, Sider} = Layout;

const MainContainer = ({children}) => {
	const navigate = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'))
	const {
		token: {colorBgContainer},
	} = theme.useToken();
	const clickMenu = (e) => {
		switch (e?.key) {
			case "tmp-0":
				navigate("/teacher")
				break
			case "tmp-1":
				navigate("/students")
				break
		}
	}
	const change = useRef()
	const click = (e) => {
		switch (e?.key) {
			case "change-password":
				change?.current?.open()
				break
			case "logout":
				localStorage.removeItem("accessoken")
				localStorage.removeItem("user")
				window.location.reload()
				break
		}
	}
	return (
		<Layout>
			<Header className="header">
				<div className="logo"/>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}
					  style={{justifyContent: 'end'}}
					  onClick={click}
					  items={[{
						  label: `Xin chào : ${user?.full_name}`,
						  key: 'SubMenu',
						  children: [
							  {
								  type: 'group',
								  children: [
									  {
										  label: 'Đổi mật khẩu',
										  key: 'change-password',
									  },
									  {
										  label: 'Đăng xuất',
										  key: 'logout',
									  },
								  ],
							  },
						  ],
					  }]}
				/>
			</Header>
			<Content
				style={{
					padding: '0 50px',
				}}
			>
				<Layout
					style={{
						padding: '24px 0',
						background: colorBgContainer,
					}}
				>
					<Sider

						style={{
							background: colorBgContainer,
						}}
						width={200}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							onClick={clickMenu}
							style={{
								height: '100%',
							}}
							items={
								[
									{
										label: 'Giáo viên',
										value: '/marks'
									},
									{
										label: 'Học sinh ',
										value: '/student'
									}
								]

							}
						/>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 280,
						}}
					>
						{children}
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}
			>

			</Footer>
			<ModalChangePass ref={change}/>
		</Layout>
	);
};
export default MainContainer;