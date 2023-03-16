import {Button, Form, Input, InputNumber, Select} from 'antd';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';
import FormInput from './component/FormInput';
import MainContainer from "./layout/MainContainer";
import {toast} from "react-toastify";
import MarkApi from './api/MarkApi';

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


const AddEditMark = () => {

	const {ma_sv} = useParams()
	const navigate = useNavigate()
	const [userDeail, setUserDetail] = useState()
	const {control, reset, handleSubmit} = useForm()
	useEffect(() => {
		if (ma_sv) {
			const getUserById = async () => {
				try {
					const {data} = await MarkApi.getMark(ma_sv)
					setUserDetail(data.data)
                    console.log("dât",data.data[0]);
					reset(
						{
							full_name: data?.data[0]?.user?.full_name,
							ma_sv: data?.data[0]?.ma_sv,
							toan_cao_cap: data?.data[0]?.toan_cao_cap,
							triet_hoc: data?.data[0]?.triet_hoc,
							pttkht: data?.data[0]?.pttkht,

						}
					)
				} catch (error) {
					console.log(error);
				}
			}
			getUserById()
		}

	}, [ma_sv])
	const onFinish = (values) => {
		if (ma_sv) {
			MarkApi.editMark(ma_sv,values).then(res =>{
				if(res.data.status === 200){
					navigate(-1)
					toast.success("Cập nhật điểm thành công")
				}
			})
		}else {
			MarkApi.addMark(values).then(res =>{
				if(res.data.status === 200){
					navigate(-1)
					toast.success("Thêm điểm thành công")
				}else {
					toast.error("Thêm điểm thất bại")
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

					{/* <FormInput
						label={"Họ và tên"}
						control={control}
						name={'full_name'}
					/>
					<FormInput
						label={"Mã SV"}
						control={control}
						name={'ma_sv'}
					/> */}
				
						<FormInput
							label={"Toán cao cấp"}
							control={control}
                            type={"number"}
							name={'toan_cao_cap'}
						/>
					
					<FormInput
						label={"Triết học"}
						control={control}
                        type={"number"}
						name={'triet_hoc'}
					/>
					<FormInput
						label={"Phân tích thiết kế hệ thống"}
						control={control}
						type={"number"}
						name={'pttkht'}
					/>

					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form>
			</div>
		</MainContainer>
	)
}

export default AddEditMark