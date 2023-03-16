import {Button, Form, Input, InputNumber, Select} from 'antd';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import StudentApi from './api/StudentApi';
import FormInput from './component/FormInput';
import MainContainer from "./layout/MainContainer";
import {toast} from "react-toastify";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};
/* eslint-enable no-template-curly-in-string */
const listGender = [
	{
		value: 1,
		name: 'nam'
	},
	{
		value: 2,
		name: 'nữ'
	}
]

const listRole = [
	{
		value: 2,
		name: 'Giáo viên'
	},
	{
		value: 3,
		name: 'Sinh viên'
	}
]

const DeatailUser = () => {
	const {slug} = useParams()
	console.log(slug)
	const {id} = useParams()
	const navigate = useNavigate()
	const [userDeail, setUserDetail] = useState()
	const {control, reset, handleSubmit} = useForm()
	const {Option} = Select
	const [gender, setGender] = useState(2)
	const [role, setRole] = useState(1)
	const onSelectGender = (value) => {
		setGender(value)
	}
	const onSelectRole = (value) => {
		setRole(value)
	}
	console.log('gender', gender);
	useEffect(() => {
		if (id) {
			const getUserById = async () => {
				try {
					const {data} = await StudentApi.getById(id)
					setUserDetail(data.data)

					reset(
						{
							full_name: data?.data?.full_name,
							email: data?.data?.email,
							phone: data?.data?.phone,
							address: data?.data?.address,
							gender: data?.data?.gender,
							role: data?.data?.role,
						}
					)
				} catch (error) {
					console.log(error);
				}
			}
			getUserById()
		}

	}, [id])
	console.log(typeof (userDeail?.full_name));
	const onFinish = (values) => {
		values.role = role
		values.gender = gender
		if (id) {
			StudentApi.editUser(id,values).then(res =>{
				if(res.data.status === 200){
					navigate("/teacher")
					toast.success("Cập nhật thông tin thành công")
				}
			})
		}else {
			StudentApi.addUser(values).then(res =>{
				if(res.data.status === 200){
					navigate("/teacher")
					toast.success("Thêm giáo viên thành công")
				}else {
					toast.error("Thêm giáo viên thất bại")
				}
			})
		}
	};
	return (
		<MainContainer>
			<div>
				<Form
					{...layout}
					name="nest-messages"
					onFinish={handleSubmit(onFinish)}
					style={{
						maxWidth: 600,
					}}
					validateMessages={validateMessages}
				>

					<FormInput
						label={"Họ và tên"}
						control={control}
						name={'full_name'}
					/>
					<FormInput
						label={"Email"}
						control={control}
						name={'email'}
					/>
					{!id &&
						<FormInput
							label={"Password"}
							control={control}
							name={'password'}
						/>
					}
					<FormInput
						label={"Địa chi"}
						control={control}
						name={'address'}
					/>
					<FormInput
						label={"Số điện thoại"}
						control={control}
						type={"number"}
						name={'phone'}
					/>
					<div style={{display: 'flex', width: '100%'}}>
						<span style={{width: '100%', fontWeight: '700'}}>Quyền :</span>
						<Select
							bordered={false}
							onChange={onSelectRole}
							name="role"
							defaultValue={2}
							style={{width: '100%'}}
						>
							{listRole?.map((it, index) => (
								<Option style={{width: '100%'}} value={it.value} key={index}>
									{it?.name}
								</Option>
							))}
						</Select>

					</div>
					<div style={{display: 'flex', width: '100%'}}>
						<span style={{width: '100%', fontWeight: '700'}}>Giới tính :</span>
						<Select
							bordered={false}
							onChange={onSelectGender}
							name="gender"
							defaultValue={1}
							style={{width: '100%'}}
						>
							{listGender?.map((it, index) => (
								<Option style={{width: '100%'}} value={it.value} key={index}>
									{it?.name}
								</Option>
							))}
						</Select>

					</div>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form>
			</div>
		</MainContainer>
	)
}

export default DeatailUser