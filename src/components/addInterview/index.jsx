import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import {
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { filteredQuestionFetch } from "../../redux/toolkit/questionSlice.js";
import { toast, Toaster } from "react-hot-toast";
import { questionFetch } from "../../redux/toolkit/getQuestionSlice.js";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoLockOpenOutline } from "react-icons/io5";
import {
  addInterviewFetch,
  addInterviewProgress,
} from "../../redux/toolkit/addInterviewSlice.js";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AddInterview = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();
  const questionInfo = useSelector(
    (state) => state.questionSlice?.questionInfo,
  );
  const getQuestionInfo = useSelector(
    (state) => state.getQuestionSlice?.questionInfo,
  );
  const userInfo = useSelector((state) => state.user?.userInfo);

  const [form] = Form.useForm(); // Form hook'unu kullanarak form nesnesi oluştur
  const [interactive_steps, setInteractiveSteps] = useState(false);
  const [additional_resources, setAdditionalResources] = useState(false);
  const [uniqueTopics, setUniqueTopics] = useState([]);

  const addInterviewSuccess = useSelector(
    (state) => state.addInterviewSlice.addInterviewInfo,
  );
  const addInterviewFailure = useSelector(
    (state) => state.addInterviewSlice.addInterviewError,
  );
  const addInterviewLoading = useSelector(
    (state) => state.addInterviewSlice.addInterviewProgress,
  );
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    let startDate = values.start_end_date[0];
    let endDate = values.start_end_date[1];

    // Başlangıç tarihinin gün, ay ve yılını alma
    const startDay = startDate.$D < 10 ? "0" + startDate.$D : startDate.$D;
    const startMonth =
      startDate.$M + 1 < 10 ? "0" + (startDate.$M + 1) : startDate.$M + 1;
    const startYear = startDate.$y;

    // Bitiş tarihinin gün, ay ve yılını alma
    const endDay = endDate.$D < 10 ? "0" + endDate.$D : endDate.$D;
    const endMonth =
      endDate.$M + 1 < 10 ? "0" + (endDate.$M + 1) : endDate.$M + 1;
    const endYear = endDate.$y;

    startDate = startYear + "-" + startMonth + "-" + startDay;
    endDate = endYear + "-" + endMonth + "-" + endDay;

    const diagram_question_list = values.questions
      .filter((question) => question.type === "diagram")
      .map((question) => question.question);
    const test_question_list = values.questions
      .filter((question) => question.type === "test")
      .map((question) => question.question);
    const algorithm_question_list = values.questions
      .filter((question) => question.type === "algorithm")
      .map((question) => question.question);

    const newInterview = {
      name: values.name,
      description: values.description,
      interview_time: values.interview_time,
      questions: {
        diagram_question_list: diagram_question_list,
        test_question_list: test_question_list,
        algorithm_question_list: algorithm_question_list,
      },
      company_list: [userInfo._id],
      start_date: startDate,
      end_date: endDate,
    };

    dispatch(addInterviewFetch(newInterview));
  };

  useEffect(() => {
    if (addInterviewLoading && !addInterviewFailure && !addInterviewSuccess) {
      toast.loading("Adding interview...", {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      });
    }
  }, [addInterviewProgress]);

  useEffect(() => {
    if (addInterviewFailure) {
      toast.error(addInterviewFailure.message, {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      });
    }
  }, [addInterviewFailure]);
  console.log("Add Interview Success", addInterviewSuccess);

  useEffect(() => {
    if (addInterviewSuccess) {
      toast.success(addInterviewSuccess.message, {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      });
      setTimeout(() => {
        form.resetFields();
        setIsModalOpen(false);
      }, 2000);
    }
  }, [addInterviewSuccess]);

  const onValuesChange = (changedValues, allValues) => {
    console.log("Form values changed:", allValues);
  };

  const getQuestions = (name) => {
    const questionData = form.getFieldValue(["questions", name]);

    if (questionData.type && questionData.level) {
      const data = {
        question_type: questionData.type,
        question_level: questionData.level,
        question_topic: questionData.topic,
      };
      dispatch(filteredQuestionFetch(data));
    }
  };

  const showDetailed = (question) => {
    dispatch(
      questionFetch({
        question_id: question.question,
        question_type: question.type,
      }),
    );
  };

  useEffect(() => {
    setUniqueTopics(
      Array.from(new Set(questionInfo?.map((item) => item.topic))),
    );
  }, [questionInfo]);

  console.log("Unique Topics", uniqueTopics);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const blockChanges = (name, type) => {
    // Eğer soru zaten yapılandırılmışsa, bir hata mesajı göster
    if (form.getFieldValue(["questions", name, type]) !== undefined) {
      toast.error(
        "You can't change the configured question! \n First delete it and then add again!",
        {
          style: {
            border: "1px solid #16161b",
            padding: "16px",
            color: "#16161b",
          },
          iconTheme: {
            primary: "#16161b",
            secondary: "#fff",
          },
        },
      );
    }
  };

  return (
    <div className={styles.add__interview__container}>
      <div className={styles.add__interview__container__left__side}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <div
            className={
              styles.add__interview__container__left__side__general__info__header
            }
          >
            <h2>General Info</h2>
          </div>
          <div
            className={
              styles.add__interview__container__left__side__general__info
            }
          >
            <Space
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label="Name" name="name">
                <Input
                  style={{
                    width: "30rem",
                  }}
                />
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
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="RangePicker" name="start_end_date">
              <RangePicker
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </div>
          <div
            className={
              styles.add__interview__container__left__side__question__info__header
            }
          >
            <h2>Question Info</h2>
          </div>
          <div
            className={
              styles.add__interview__container__left__side__question__info
            }
          >
            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Space
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 8fr",
                      }}
                    >
                      <Button
                        style={{ backgroundColor: "#16161b", color: "#f5f3f3" }}
                      >
                        Current : {form.getFieldsValue().questions?.length || 0}
                      </Button>
                      <Button
                        type="dashed"
                        onClick={() => add("", 0)}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Question
                      </Button>
                    </Space>
                  </Form.Item>
                  {fields.map(({ key, name }) => (
                    <Space
                      key={key}
                      style={{
                        display: "grid",
                        marginBottom: 8,
                        width: "100%",
                        gridTemplateColumns: "20% 23% 25% 25% 2% 2%",
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        name={[name, "type"]}
                        style={{ gridColumn: "1/2" }}
                      >
                        <Select
                          placeholder="Type"
                          onChange={() => getQuestions(name)}
                          onMouseDown={() => blockChanges(name, "type")}
                          disabled={
                            !!form.getFieldValue(["questions", name, "type"])
                          } // Seçim yapıldıysa Select bileşenini devre dışı bırak
                        >
                          <Select.Option value="test">Test</Select.Option>
                          <Select.Option value="algorithm">
                            Algorithm
                          </Select.Option>
                          <Select.Option value="diagram">Diagram</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={[name, "level"]}
                        style={{ gridColumn: "2/3" }}
                      >
                        <Select
                          placeholder="Level"
                          onChange={() => getQuestions(name)}
                          onMouseDown={() => blockChanges(name, "level")}
                          disabled={
                            !form.getFieldsValue().questions[name].type ||
                            !!form.getFieldValue(["questions", name, "level"])
                          }
                        >
                          <Select.Option value="beginner">
                            Beginner
                          </Select.Option>
                          <Select.Option value="intermediate">
                            Intermediate
                          </Select.Option>
                          <Select.Option value="advance">Advance</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={[name, "topic"]}
                        style={{ gridColumn: "3/4" }}
                      >
                        <Select
                          placeholder="Topic"
                          onChange={() => getQuestions(name)}
                          onMouseDown={() => blockChanges(name, "topic")}
                          disabled={
                            !form.getFieldsValue().questions[name].level ||
                            !!form.getFieldValue(["questions", name, "topic"])
                          }
                        >
                          {uniqueTopics.map((topic, index) => (
                            <Select.Option key={index} value={topic}>
                              {topic}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={[name, "question"]}
                        style={{ gridColumn: "5/6" }}
                      >
                        <Select
                          placeholder="Question"
                          onMouseDown={() => blockChanges(name, "question")}
                          disabled={
                            !form.getFieldsValue().questions[name].topic ||
                            !!form.getFieldsValue().questions[name].question
                          }
                        >
                          {questionInfo?.map((item, index) => {
                            return (
                              <Select.Option key={index} value={item._id}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Tooltip title="Delete" color={"black"}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Tooltip>
                      {form.getFieldsValue().questions[name].type &&
                        form.getFieldsValue().questions[name].level &&
                        form.getFieldsValue().questions[name].topic &&
                        form.getFieldsValue().questions[name].question && (
                          <Tooltip title="See Question" color={"black"}>
                            <EyeOutlined
                              onClick={() =>
                                showDetailed(
                                  form.getFieldValue(["questions", name]),
                                )
                              }
                            />
                          </Tooltip>
                        )}
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </div>
          <Button
            type="primary"
            block
            style={{ backgroundColor: "#16161b", marginTop: "1rem" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className={styles.add__interview__container__right__side}>
        <div
          className={
            styles.add__interview__container__right__side__general__info__header
          }
        >
          {getQuestionInfo && (
            <div className={styles.name}>{getQuestionInfo?.name}</div>
          )}
          {!getQuestionInfo && <h2>Question Detail</h2>}
        </div>
        <div
          className={
            styles.add__interview__container__right__side__general__info
          }
        >
          {!getQuestionInfo && (
            <div
              className={
                styles.add__interview__container__right__side__general__info__empty
              }
            >
              Please select a question to see the details and then click the eye
              icon.
            </div>
          )}
          {getQuestionInfo && (
            <div
              className={
                styles.add__interview__container__right__side__general__info__content
              }
            >
              <div className={styles.topic_level}>
                <div className={styles.topic}>
                  Topic: {getQuestionInfo?.topic}
                </div>
                <div className={styles.level}>
                  Level: {capitalizeWords(getQuestionInfo?.level.name)}
                </div>
              </div>
              {getQuestionInfo?.type === "Algorithm" && (
                <div className={styles.algorithm}>
                  <div className={styles.scenario}>
                    <div className={styles.title}> Scenario</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.description.scenario}
                    </div>
                  </div>
                  <div className={styles.question}>
                    <div className={styles.title}>Question</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.description.question}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  </div>
                  <div className={styles.real_life}>
                    <div className={styles.title}>Real Life Application</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.real_life_application}
                    </div>
                  </div>
                  <div className={styles.example_input_output}>
                    <div className={styles.title}>Example</div>
                    <div className={styles.content}>
                      <div className={styles.example_input}>
                        <div className={styles.example_input_content}>
                          Input: {getQuestionInfo?.example_input}
                        </div>
                      </div>
                      <div className={styles.example_output}>
                        <div className={styles.example_output_content}>
                          Output: {getQuestionInfo?.example_output}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.time_complexity_analysis}>
                    <div className={styles.title}>Time Complexity Analysis</div>
                    <div className={styles.content}>
                      <div className={styles.time_complexity_analysis_item}>
                        Best Case:{" "}
                        {getQuestionInfo?.time_complexity_analysis.best_case}
                      </div>
                      <div className={styles.time_complexity_analysis_item}>
                        Average Case:{" "}
                        {getQuestionInfo?.time_complexity_analysis.average_case}
                      </div>
                      <div className={styles.time_complexity_analysis_item}>
                        Worst Case:{" "}
                        {getQuestionInfo?.time_complexity_analysis.worst_case}
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.additional_resources}`}>
                    <div
                      className={`${styles.additional_title} ${styles.title} ${additional_resources && styles.additional_resources_title_active}`}
                      onClick={() =>
                        setAdditionalResources(!additional_resources)
                      }
                    >
                      Additional Resources
                      <div className={styles.icon}>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                    <div
                      className={`${styles.additional_resources_links} ${additional_resources && styles.content_active}`}
                    >
                      {getQuestionInfo?.additional_resources_about_algorithm_and_topic.map(
                        (resource, index) => {
                          return (
                            <div
                              key={index}
                              className={styles.additional_resources_links_item}
                            >
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {resource.name}
                              </a>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className={styles.interactive_steps}>
                    <div
                      className={`${styles.additional_title} ${styles.title} ${interactive_steps && styles.interactive_steps_title_active}`}
                      onClick={() => setInteractiveSteps(!interactive_steps)}
                    >
                      Interactive Steps
                      {/*<IoLockClosedOutline />*/}
                      <div className={styles.icon}>
                        <IoLockOpenOutline />
                      </div>
                    </div>
                    <div
                      className={`${styles.interactive_steps_content} ${interactive_steps && styles.content_active}`}
                    >
                      {getQuestionInfo?.interactive_steps.map((step, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.interactive_steps_content_item}
                          >
                            {step.step_number}. {step.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {getQuestionInfo?.type === "Diagram" && (
                <div className={styles.diagram}>
                  <div className={styles.scenario}>
                    <div className={styles.title}> Scenario</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.description}
                    </div>
                  </div>
                  <div className={styles.real_life}>
                    <div className={styles.title}>Real Life Application</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.real_life_application}
                    </div>
                  </div>
                  <div className={`${styles.additional_resources}`}>
                    <div
                      className={`${styles.additional_title} ${styles.title} ${additional_resources && styles.additional_resources_title_active}`}
                      onClick={() =>
                        setAdditionalResources(!additional_resources)
                      }
                    >
                      Additional Resources
                      <div className={styles.icon}>
                        <RiArrowDropDownLine />
                      </div>
                    </div>
                    <div
                      className={`${styles.additional_resources_links} ${additional_resources && styles.content_active}`}
                    >
                      {getQuestionInfo?.additional_resources_about_topic.map(
                        (resource, index) => {
                          return (
                            <div
                              key={index}
                              className={styles.additional_resources_links_item}
                            >
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {resource.name}
                              </a>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className={styles.interactive_steps}>
                    <div
                      className={`${styles.additional_title} ${styles.title} ${interactive_steps && styles.interactive_steps_title_active}`}
                      onClick={() => setInteractiveSteps(!interactive_steps)}
                    >
                      Interactive Steps
                      {/*<IoLockClosedOutline />*/}
                      <div className={styles.icon}>
                        <IoLockOpenOutline />
                      </div>
                    </div>
                    <div
                      className={`${styles.interactive_steps_content} ${interactive_steps && styles.content_active}`}
                    >
                      {getQuestionInfo?.interactive_steps.map((step, index) => {
                        return (
                          <div
                            key={index}
                            className={styles.interactive_steps_content_item}
                          >
                            {step.step_number}. {step.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {getQuestionInfo?.type === "Test" && (
                <div className={styles.test}>
                  <div className={styles.question}>
                    <div className={styles.title}> Question</div>
                    <div className={styles.content}>
                      {getQuestionInfo?.question}
                    </div>
                  </div>
                  <div className={styles.choices}>
                    {getQuestionInfo?.choices.map((choice, index) => {
                      return (
                        <div key={index} className={styles.choices_item}>
                          {choice}
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.answer}>
                    <div className={styles.title}>
                      {getQuestionInfo?.answer} : Answer
                    </div>
                    <div className={styles.content}>
                      {getQuestionInfo?.answer_explanation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default AddInterview;
