import React, {useEffect} from 'react';
import styles from './style.module.scss';
import {EyeOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Button, DatePicker, Form, Input, InputNumber, Select, Space, Tooltip,
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import questionSlice, {clearQuestionInfo, questionFetch} from "../../redux/toolkit/questionSlice.js";
import {toast, Toaster} from "react-hot-toast";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const AddInterview = () => {

    const dispatch = useDispatch();
    const questionInfo = useSelector((state) => state.questionSlice?.questionInfo);
    const [form] = Form.useForm(); // Form hook'unu kullanarak form nesnesi oluştur
    // Form değerlerinin submit edildiği fonksiyon
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    // Form değerlerinin değiştiğinde çağrılan fonksiyon
    const onValuesChange = (changedValues, allValues) => {
        console.log('Form values changed:', allValues);
    };

    const getQuestions = (name) => {
        const questionData = form.getFieldValue(['questions', name]);

        if (questionData.type && questionData.level) {
            const data = {
                question_type: questionData.type,
                question_level: questionData.level,
                question_topic: questionData.topic,
            };
            dispatch(questionFetch(data));
        }
    };

    useEffect(() => {
        console.log("questionInfo", questionInfo)
    }, [questionInfo])

    const showDetailed = () => {
        console.log("Show Detailed")
    }

    const blockChanges = (name, type) => {
        if (form.getFieldValue(['questions', name, type])) {
            toast.error('You can\'t change the configured question! \n\n First delete it and then add again!', {
                style: {
                    border: '1px solid #16161b',
                    padding: '16px',
                    color: '#16161b',
                },
                iconTheme: {
                    primary: '#16161b',
                    secondary: '#f5f3f3',
                },
            });
        }
    }

    return (<div className={styles.add__interview__container}>
        <div className={styles.add__interview__container__left__side}>
            <Form layout="vertical" form={form}
                  onFinish={onFinish}
                  onValuesChange={onValuesChange}>
                <div className={styles.add__interview__container__left__side__general__info__header}>
                    <h2>General Info</h2>
                </div>
                <div className={styles.add__interview__container__left__side__general__info}>

                    <Space style={{
                        width: "100%", display: "flex", justifyContent: "space-between",
                    }}>
                        <Form.Item label="Name" name="name">
                            <Input style={{
                                width: "30rem",
                            }}/>
                        </Form.Item>
                        <Form.Item label="Interview Time" name="interview_time">
                            <InputNumber
                                style={{
                                    width: "100%",
                                }}
                                defaultValue="30.00"
                                min="0"
                                max="120.00"
                                step="0.01"
                                stringMode
                                addonAfter="minutes"
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item label="Description" name="description">
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item label="RangePicker" name="range_picker">
                        <RangePicker style={{
                            width: "100%",
                        }}/>
                    </Form.Item>

                </div>
                <div className={styles.add__interview__container__left__side__question__info__header}>
                    <h2>Question Info</h2>
                </div>
                <div className={styles.add__interview__container__left__side__question__info}>
                    <Form.List name="questions">
                        {(fields, {add, remove}) => (<>
                            <Form.Item>
                            <Space style={{display:'grid', gridTemplateColumns:'1fr 8fr'}}>
                                <Button style={{ backgroundColor:'#16161b', color:'#f5f3f3'}}>
                                    Current : {form.getFieldsValue().questions?.length || 0}
                                </Button>
                                <Button type="dashed" onClick={() => add('', 0)} block icon={<PlusOutlined/>}>
                                    Add Question
                                </Button>
                            </Space>
                            </Form.Item>
                            {fields.map(({key, name}) => (<Space
                                key={key}
                                style={{
                                    display: 'grid',
                                    marginBottom: 8,
                                    width: "100%",
                                    gridTemplateColumns: "20% 23% 25% 25% 2% 2%",
                                }}
                                align="baseline"
                            >
                                <Form.Item name={[name, 'type']} style={{gridColumn: "1/2"}}>
                                    <Select placeholder="Type" onChange={() => getQuestions(name)}
                                            onClick={() => blockChanges(name, 'type')}
                                            disabled={!!form.getFieldValue(['questions', name, 'type'])} // Seçim yapıldıysa Select bileşenini devre dışı bırak
                                    >
                                        <Select.Option value="test">Test</Select.Option>
                                        <Select.Option value="algorithm">Algorithm</Select.Option>
                                        <Select.Option value="diagram">Diagram</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={[name, 'level']} style={{gridColumn: "2/3"}}>
                                    <Select placeholder="Level" onChange={() => getQuestions(name)}
                                            onClick={() => blockChanges(name, 'level')}
                                            disabled={!form.getFieldsValue().questions[name].type || !!form.getFieldValue(['questions', name, 'level'])
                                            }
                                    >
                                        <Select.Option value="beginner">Beginner</Select.Option>
                                        <Select.Option value="intermediate">Intermediate</Select.Option>
                                        <Select.Option value="advance">Advance</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={[name, 'topic']} style={{gridColumn: "3/4"}}>
                                    <Select placeholder="Topic" onChange={() => getQuestions(name)}
                                            onClick={() => blockChanges(name, 'topic')}
                                            disabled={!form.getFieldsValue().questions[name].level || !!form.getFieldValue(['questions', name, 'topic'])}>
                                        {questionInfo?.map((item, index) => {
                                            return <Select.Option key={index}
                                                                  value={item.topic}>{item.topic}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item name={[name, 'question']} style={{gridColumn: "5/6"}}>
                                    <Select placeholder="Question"
                                            disabled={!form.getFieldsValue().questions[name].topic}>
                                        {questionInfo?.map((item, index) => {
                                            return <Select.Option key={index}
                                                                  value={item._id}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <Tooltip title="Delete" color={"black"}>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Tooltip>
                                <Tooltip title="See Question" color={"black"}>
                                    <EyeOutlined onClick={() => showDetailed()}/>
                                </Tooltip>
                            </Space>))}

                        </>)}
                    </Form.List>
                </div>
                <Button type="primary" block style={{backgroundColor: '#16161b', marginTop: "1rem"}} htmlType="submit">
                    Submit
                </Button>
            </Form>


        </div>
        <div className={styles.add__interview__container__right__side}>
            <div className={styles.add__interview__container__right__side__general__info__header}>
                <h2>Question Detail</h2>
            </div>
            <div className={styles.add__interview__container__right__side__general__info}>
                <div style={{textAlign:'center', paddingTop:'35%'}}>
                    Click to eye icon to see the question detail!
                </div>
            </div>
        </div>
        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />
    </div>);
}


export default AddInterview;