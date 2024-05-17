import React from "react";
import Button from "../shared/Button/Button";
import CustomModal from "../CustomModal";
import {Form, Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {addQuestionFetch, clearAddQuestionInfo} from "../../redux/toolkit/addQuestionSlice";
import { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const {addQuestionInfo, addQuestionError, addQuestionProgress} = useSelector((state) => state.addQuestionSlice);

	const onFinish = (values) => {
		dispatch(addQuestionFetch(values));
	};

	useEffect(() => {
		if (addQuestionProgress && !addQuestionError && !addQuestionInfo) {
			toast.loading("Adding question...", toastConfig);
		} else if (addQuestionError && !addQuestionProgress) {
			toast.error(addQuestionError.message, toastConfig);
		} else if (addQuestionInfo && !addQuestionError && !addQuestionProgress) {
			toast.success(addQuestionInfo.message, toastConfig);
			setTimeout(() => {
				form.resetFields();
				setIsModalOpen(false);
				clearAddQuestionInfo();
			}, 2000);
		}
	}, [addQuestionProgress, addQuestionError, addQuestionInfo]);

	return (
		<div>
			<div>
				<Button className={["black"]} style={{backgroundColor: "transparent", color: "#fff", height: "75vh", fontWeight: "bold", alignSelf: "center", marginLeft: "auto", marginRight: "5rem", padding: "0.5rem 1rem", fontSize: "1.2rem", border: "1px solid", width: "100%"}} onClick={() => setIsModalOpen(true)}>
					Add Question
				</Button>
				<CustomModal width={"25%"} isOpen={isModalOpen} setIsOpen={setIsModalOpen} label={"Question Add Form"}>
					<Form layout='vertical' form={form} onFinish={onFinish}>
						<div>
							<Form.Item name='level' style={{gridColumn: "3/3"}}>
								<Select placeholder='Level'>
									<Select.Option value='beginner'>Beginner</Select.Option>
									<Select.Option value='intermediate'>Intermediate</Select.Option>
									<Select.Option value='advance'>Advance</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item name='type' style={{gridColumn: "3/3"}}>
								<Select placeholder='Type'>
									<Select.Option value='algorithm'>Algorithm</Select.Option>
									<Select.Option value='test'>Test</Select.Option>
									<Select.Option value='diagram'>Diagram</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item name='topic'>
								<Input placeholder='Topic' />
							</Form.Item>
						</div>
						<Button type='primary' style={{color: "#fff", fontWeight: "bold", padding: "1rem 1rem", width: "100%", borderRadius: "1rem", backgroundColor: "#16161b", marginTop: "1rem", cursor:"pointer"}} htmlType='submit' >
							Submit
						</Button>
					</Form>
				</CustomModal>
			</div>
			<Toaster position="bottom-right" reverseOrder={false} />
		</div>
	);
};

const toastConfig = {
	style: {
		border: "1px solid #16161b",
		padding: "16px",
		color: "#16161b",
	},
	iconTheme: {
		primary: "#16161b",
		secondary: "#f5f3f3",
	},
};

export default AdminDashboard;
