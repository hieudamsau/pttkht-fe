import React, {forwardRef,useImperativeHandle, useState} from 'react';
import {useForm} from "react-hook-form";
import { Modal} from "antd";
import {useNavigate} from "react-router-dom";
import FormInput from "./FormInput";
import StudentApi from "../api/StudentApi";
import {toast} from "react-toastify";

const ModalChangePass = forwardRef((props, ref) => {
	const navigate = useNavigate()
	const [show, setShow] = useState(false);
	const {control, reset, handleSubmit} = useForm()

	const cancel = () => {
		setShow(false)
	}
	useImperativeHandle(ref, () => ({
		open: () => setShow(true),
		close: () => {
			setShow(false)
		}
	}));

	const onsubmit = (data) => {
		StudentApi.changePassword(data).then(res => {
			if(res.data.status === 200){
				reset()
				cancel()
				toast.success("Đổi mật khẩu thành công")
			}else{
				toast.error("Đổi mật khẩu thất bại")
			}
		})
	}
	return (
		<Modal
			footer={null}
			className={"detail"}
			title={"Đổi mật khẩu"}
			open={show}
			width={700}
			onCancel={() => cancel()}
		>
			<form>
				<div style={{padding:'10px 30px'}}>
					<FormInput
						control={control}
						label={"Mật khẩu cũ"}
						name={"password"}
					/>
					<FormInput
						control={control}
						label={"Mật khẩu mới"}
						name={"new_password"}
					/>
					<div>
						<span
							style={{
								padding:'10px 20px',
								background:"#1aab70",
								color:"#fff",
								borderRadius:12,
								cursor:"pointer"
							}}
							onClick={handleSubmit(onsubmit)}
						>Xác nhận</span>
					</div>
				</div>
			</form>
		</Modal>
	);
});

export default ModalChangePass;