import PropTypes from "prop-types";
import { useState } from "react";
import { Select, Table, Tag, Card, Button, ConfigProvider, theme } from "antd";
const { Option } = Select;
import { FaRegClock } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { IoCheckmark, IoClose } from "react-icons/io5";
import styles from "./style.module.scss";
import { CiCalendarDate } from "react-icons/ci";
import { MdPerson2 } from "react-icons/md";
import { interviewFetch } from "../../redux/toolkit/getInterviewByCompanyIdSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { interviewFetch as interviewById } from "../../redux/toolkit/interviewSlice.js";
import { PiShareFat } from "react-icons/pi";
import { toast, Toaster } from "react-hot-toast";
import { intervieweeListFetch } from "../../redux/toolkit/intervieweeListSlice.js";
import { userByIdFetch } from "../../redux/toolkit/getUserByIdSlice.js";
import moment from "moment";
import { MdOutlineEmail } from "react-icons/md";
import { interviewSolveLinkFetch } from "../../redux/toolkit/interviewSolveLinkSlice.js";
import { useCallback } from "react";
import { Tooltip } from "antd";
import { useMemo } from "react";
import { updateInterviewStatusFetch } from "../../redux/toolkit/updateInterviewStatusSlice";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CustomModal from "../CustomModal";
import { DatePicker } from "antd";
import { LuDownload } from "react-icons/lu";
import {
  getResultByUserIdInterviewIdFetch,
  cleargetResultByUserIdInterviewIdInfo,
} from "../../redux/toolkit/getResultByUserIdInterviewIdSlice.js";
import { List } from "antd";

const columnsInterview = [
  {
    title: "Interview Title",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "tags",
    render: (_, { status }) => (
      <Tag bordered={false} color="#38383D">
        {status}
      </Tag>
    ),
  },
  {
    title: "Participant Count",
    dataIndex: "participant_count",
    render: (_, { interviewee_list }) => interviewee_list.length,
  },
  {
    title: "Question Count",
    dataIndex: "question_amount",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
  },
  {
    title: "End Date",
    dataIndex: "end_date",
  },
];

const status_enums = [
  "INITIATED",
  "REGISTERED",
  "EXAMINING",
  "CALL",
  "MEET",
  "ACCEPTED",
];

const CompanyDashboard = () => {
  const [tableView, setTableView] = useState("interviews");
  const [selectedInterviewee, setSelectedInterviewee] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const {
    getResultByUserIdInterviewIdInfo,
    getResultByUserIdInterviewIdProgress,
  } = useSelector((state) => state.getResultByUserIdInterviewIdSlice);
  console.log(
    "getResultByUserIdInterviewIdProgress",
    getResultByUserIdInterviewIdProgress
  );
  console.log(
    "getResultByUserIdInterviewIdInfo",
    getResultByUserIdInterviewIdInfo
  );
  const { interviewInfo } = useSelector(
    (state) => state.getInterviewByCompanyIdSlice
  );
  const selectedInterview = useSelector(
    (state) => state.interview?.interviewInfo
  );
  const handleShowResults = useCallback(
    (interview_id, user_id) => {
      dispatch(getResultByUserIdInterviewIdFetch({ user_id, interview_id }));
    },
    [dispatch]
  );
  const intervieweeListInfo = useSelector(
    (state) => state.intervieweeListSlice.intervieweeListInfo
  );
  const columnsInterviewee = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        render: (text, record) => (
          <>
            {record.name} {record.surname}
          </>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, { status }) => (
          <>
            <Tag bordered={false} color={"#38383D"}>
              {status?.name || status}
            </Tag>
          </>
        ),
      },
      {
        title: "Result Details",
        key: "showResults",
        render: (_, record) => (
          <Button
            style={{
              backgroundColor: "#fff",
              fontWeight: "bold",
              border: "none",
              color: "#38383D",
            }}
            onClick={() => {
              const user = intervieweeListInfo.find(
                (interviewee) => interviewee.user_id === record.user_id
              );
              console.log("user", user);
              handleShowResults(user.interview_id, user.user_id);
            }}
            loading={getResultByUserIdInterviewIdProgress}
          >
            Show Results
          </Button>
        ),
      },
      {
        title: "Phone Number",
        dataIndex: "phone_number",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
    ];
  }, [
    handleShowResults,
    intervieweeListInfo,
    getResultByUserIdInterviewIdProgress,
  ]);

  const { _id: id } = useSelector((state) => state.user.userInfo);

  const userByIdInfo = useSelector(
    (state) => state.getUserByIdSlice.userByIdInfo
  );

  const {
    interviewSolveLinkError,
    interviewSolveLinkProgress,
    interviewSolveLinkInfo,
  } = useSelector((state) => state.interviewSolveLinkSlice);
  const [arrow] = useState("Show");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("");
  const setDateTime = (date, dateString) => {
    setTime(dateString);
    setIsModalOpen(false);
  };

  const fetchPdf = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/individual_user/cv/${
          selectedInterviewee?.user_id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );
      if (!response.ok) throw new Error("Response not OK");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element and trigger a download
      const a = document.createElement("a");
      a.href = url;
      // Specify the name of the file to download
      a.download = `${selectedInterviewee.name} ${selectedInterviewee?.surname}.pdf`; // Change 'CustomFileName.pdf' to your desired file name
      document.body.appendChild(a); // Append the anchor to the body to make it clickable
      a.click(); // Programmatically click the anchor to trigger the download

      // Clean up: revoke the object URL and remove the anchor element
      URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const handleToastNotifications = useCallback(() => {
    let loadingToast;
    if (interviewSolveLinkProgress) {
      loadingToast = toast.loading("Sending Interview Links", {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
          fontSize: "1.5rem",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#f5f3f3",
        },
      });
    }

    if (interviewSolveLinkError) {
      toast.dismiss(loadingToast);
      toast.error("Interview Links could not be sent", {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
          fontSize: "1.5rem",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#fff",
        },
      });
    }
    if (interviewSolveLinkInfo) {
      toast.dismiss(loadingToast);
      toast.success("Interview Links are sent", {
        style: {
          border: "1px solid #16161b",
          padding: "16px",
          color: "#16161b",
          fontSize: "1.5rem",
        },
        iconTheme: {
          primary: "#16161b",
          secondary: "#fff",
        },
      });
    }
  }, [
    interviewSolveLinkError,
    interviewSolveLinkInfo,
    interviewSolveLinkProgress,
  ]);

  useEffect(() => {
    handleToastNotifications();
  }, [
    interviewSolveLinkError,
    interviewSolveLinkInfo,
    handleToastNotifications,
  ]);

  useEffect(() => {
    dispatch(interviewFetch(id)); // get all interviews
  }, [dispatch, id]);

  useEffect(() => {
    if (interviewInfo) {
      dispatch(interviewById(interviewInfo[0].id));
      dispatch(intervieweeListFetch(interviewInfo[0].id));
    }
  }, [dispatch, interviewInfo]);

  useEffect(() => {
    // get the first interviewee of the selectedInterview
    if (tableView === "interviewees")
      dispatch(userByIdFetch(selectedInterview?.data?.interviewee_list[0]));
  }, [dispatch, tableView, selectedInterview]);

  const filterTable = (e) => {
    if (tableView === "interviews") {
      const filteredData = interviewInfo.filter((interview) => {
        return interview.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearchResult(filteredData);
    }
    if (tableView === "interviewees") {
      const filteredData = intervieweeListInfo.filter((interviewee) => {
        if (
          interviewee.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          interviewee.surname
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          interviewee.email
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          interviewee.phone_number
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
          return true;
      });
      setSearchResult(filteredData);
    }
  };

  useEffect(() => {
    if (time !== "") {
      const currentStatusIndex =
        status_enums.indexOf(
          selectedInterviewee?.status?.name || selectedInterviewee?.status
        ) + 1;
      const nextStatus = status_enums[currentStatusIndex];
      dispatch(
        updateInterviewStatusFetch({
          interview_id: selectedInterviewee?.interview_id,
          user_id: selectedInterviewee?.user_id,
          status_name: nextStatus,
          date: time,
        })
      );
    }
  }, [time]);

  const handleNextStatus = () => {
    const currentStatusIndex =
      status_enums.indexOf(
        selectedInterviewee?.status?.name || selectedInterviewee?.status
      ) + 1;
    const nextStatus = status_enums[currentStatusIndex];
    if (nextStatus === "MEET" || nextStatus === "CALL") {
      setIsModalOpen(true);
      return;
    }

    dispatch(
      updateInterviewStatusFetch({
        interview_id: selectedInterviewee?.interview_id,
        user_id: selectedInterviewee?.user_id,
        status_name: nextStatus,
      })
    );
  };

  const handleReject = () => {
    const formattedDate = moment().format("MMM DD, YYYY"); // Output will be like "Aug 12, 2021"
    dispatch(
      updateInterviewStatusFetch({
        interview_id: selectedInterviewee?.interview_id,
        user_id: selectedInterviewee?.user_id,
        status_name: "REJECTED",
        date: formattedDate,
      })
    );
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <>
        <div className={styles.main}>
          <div className={styles.left_side}>
            <p>
              {tableView === "interviews" ? "Interview " : "Interviewees "} List
            </p>
            <input
              type="text"
              placeholder={
                tableView === "interviews"
                  ? "Search Interviews"
                  : "Search Interviewees"
              }
              onChange={(e) => {
                setSearchValue(e.target.value);
                filterTable(e);
              }}
              value={searchValue}
            />

            <Select
              defaultValue="Select an interview status"
              style={{ maxWidth: "20rem" }}
              onChange={(value) => {
                if (tableView === "interviews") {
                  const filteredData = interviewInfo.filter((interview) => {
                    return interview.status.toLowerCase() === value;
                  });
                  console.log("filteredData", filteredData);
                  setIsFilter(value !== "");
                  setFilterValue(value);
                  setFilteredData(filteredData);
                } else {
                  const filteredData = intervieweeListInfo.filter(
                    (interviewee) => {
                      return interviewee.status.name === value;
                    }
                  );
                  console.log("filteredData", filteredData);
                  setIsFilter(value !== "");
                  setFilterValue(value);
                  setFilteredData(filteredData);
                }
              }}
              value={filterValue}
            >
              <Option value="">Select an interview status</Option>
              {tableView === "interviews" ? (
                <>
                  <Option value={`pending`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      Pending
                    </div>
                  </Option>
                  <Option value={`success`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <GiConfirmed />
                      Success
                    </div>
                  </Option>
                </>
              ) : (
                <>
                  <Option value={`INITIATED`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      INITIATED
                    </div>
                  </Option>
                  <Option value={`REGISTERED`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      REGISTERED
                    </div>
                  </Option>
                  <Option value={`EXAMINING`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      EXAMINING
                    </div>
                  </Option>
                  <Option value={`CALL`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      CALL
                    </div>
                  </Option>
                  <Option value={`MEET`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      MEET
                    </div>
                  </Option>
                  <Option value={`ACCEPTED`}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <FaRegClock />
                      ACCEPTED
                    </div>
                  </Option>
                </>
              )}
            </Select>

            {tableView === "interviews" ? (
              <Table
                dataSource={
                  isFilter
                    ? filteredData
                    : searchValue.length === 0
                    ? interviewInfo || []
                    : searchResult
                }
                columns={columnsInterview}
                locale={{
                  emptyText: "No Interviews Yet",
                }}
                loading={!interviewInfo}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      dispatch(interviewById(record.id));
                      console.log("clickedInterview", selectedInterview);

                      dispatch(intervieweeListFetch(record.id));
                    },
                  };
                }}
              />
            ) : (
              <Table
                dataSource={
                  isFilter
                    ? filteredData
                    : searchValue.length === 0
                    ? intervieweeListInfo || []
                    : searchResult
                }
                columns={columnsInterviewee}
                locale={{
                  emptyText: "No Interviewees Yet",
                }}
                loading={!intervieweeListInfo}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      console.log("clickedPerson", record);
                      setSelectedInterviewee(record);
                    },
                  };
                }}
              />
            )}
          </div>
          <div className={styles.right_side}>
            <p>
              {tableView === "interviews" ? "Interview " : "Interviewee "}
              Details
            </p>
            <Card loading={!selectedInterview}>
              <div className={`${styles.flex} mb-2`}>
                <div className={styles.flexColumn}>
                  <div className={styles.text}>
                    {tableView === "interviews"
                      ? selectedInterview?.data.name
                      : `${
                          selectedInterviewee?.name ||
                          userByIdInfo?.name ||
                          "John"
                        } ${
                          selectedInterviewee?.surname ||
                          userByIdInfo?.surname ||
                          "Doe"
                        }`}
                  </div>

                  <div className={styles.textMuted}>
                    {tableView === "interviews" ? (
                      <div
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          width: "10rem",
                        }}
                        title={selectedInterview?.data?.description}
                      >
                        {selectedInterview?.data?.description}
                      </div>
                    ) : (
                      `Joined on ${moment(
                        selectedInterviewee?.created_at ||
                          userByIdInfo?.created_at
                      ).format("MM.DD.YYYY")}`
                    )}
                  </div>
                </div>
                <MdPerson2 size={25} />
              </div>
              <div
                className={`${styles.flex} ${
                  tableView === "interviews" && "mb-2"
                }`}
              >
                {tableView === "interviews" && (
                  <>
                    <div className={styles.flexColumn}>
                      <div className={styles.text}>Interview Duration</div>
                      <div className={styles.textMuted}>
                        {selectedInterview?.data?.interview_time}
                      </div>
                    </div>

                    <CiCalendarDate size={25} />
                  </>
                )}
              </div>
              <div className={`${styles.flex} mb-2`}>
                <div className={styles.flexColumn}>
                  <div className={styles.text}>Status</div>
                  <div className={styles.textMuted}>
                    {tableView === "interviewees"
                      ? selectedInterviewee.register_type === "Interview" &&
                        selectedInterviewee?.status === "ACTIVE"
                        ? "Not Started"
                        : selectedInterviewee?.status?.name ||
                          selectedInterviewee?.status ||
                          userByIdInfo?.status ||
                          "Unknown"
                      : selectedInterview?.data?.status}
                  </div>
                </div>
                {tableView === "interviews" &&
                  selectedInterview?.data?.status === "ACTIVE" && (
                    <GiConfirmed size={20} />
                  )}
                {tableView === "interviews" &&
                  selectedInterview?.data?.status === "PENDING" && (
                    <IoMdCloseCircleOutline size={20} />
                  )}
                {tableView === "interviewees" && (
                  <>
                    <Tooltip
                      placement="top"
                      title={"Reject User's Apply"}
                      arrow={mergedArrow}
                      onClick={handleReject}
                    >
                      <IoClose
                        size={20}
                        style={{
                          backgroundColor: "#38383D",
                          borderRadius: ".2rem",
                          width: "4rem",
                          marginRight: ".5rem",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>

                    <Tooltip
                      placement="top"
                      title={"Pass User To Next Step"}
                      arrow={mergedArrow}
                      onClick={handleNextStatus}
                    >
                      <IoCheckmark
                        size={20}
                        style={{
                          backgroundColor: "#38383D",
                          borderRadius: ".2rem",
                          width: "4rem",
                          marginRight: ".5rem",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </>
                )}
              </div>
              {tableView === "interviews" && (
                <>
                  <Button
                    className="mb-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#38383D",
                      fontWeight: "bold",
                      border: "none",
                      color: "#fff",
                    }}
                    icon={<PiShareFat />}
                    block
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(
                          selectedInterview?.data?.share_link
                        );
                        toast.success("Link copied", {
                          style: {
                            border: "1px solid #16161b",
                            padding: "16px",
                            color: "#16161b",
                            fontSize: "1.5rem",
                          },
                          iconTheme: {
                            primary: "#16161b",
                            secondary: "#f5f3f3",
                          },
                        });
                      } catch (e) {
                        console.log(e);
                        toast.error(
                          "Link could not be copied, please try again later.",
                          {
                            style: {
                              border: "1px solid #16161b",
                              padding: "16px",
                              color: "#16161b",
                              fontSize: "1.5rem",
                            },
                            iconTheme: {
                              primary: "#16161b",
                              secondary: "#fff",
                            },
                          }
                        );
                      }
                    }}
                  >
                    Copy Interview Link
                  </Button>
                  <Button
                    block
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#38383D",
                      fontWeight: "bold",
                      border: "none",
                      color: "#fff",
                    }}
                    icon={<MdOutlineEmail />}
                    onClick={() => {
                      dispatch(
                        interviewSolveLinkFetch({
                          user_id_list:
                            selectedInterview?.data?.interviewee_list,
                          interview_id: selectedInterview?.data?._id,
                        })
                      );
                    }}
                  >
                    Send Interview Link To All Participants
                  </Button>
                </>
              )}
              {tableView === "interviewees" && (
                <>
                  <Button
                    block
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#38383D",
                      fontWeight: "bold",
                      border: "none",
                      color: "#fff",
                    }}
                    icon={<MdOutlineEmail />}
                    onClick={() => {
                      dispatch(
                        interviewSolveLinkFetch({
                          user_id_list: [
                            selectedInterviewee?._id || userByIdInfo?._id,
                          ],
                          interview_id: selectedInterview?.data?._id,
                        })
                      );
                    }}
                    disabled={!intervieweeListInfo}
                  >
                    Send Interview Link
                  </Button>
                  {getResultByUserIdInterviewIdInfo && (
                    <List
                      style={{ marginTop: "3rem" }}
                      size="small"
                      header={<div style={{ fontWeight: "bold" }}>Results</div>}
                      bordered
                      dataSource={getResultByUserIdInterviewIdInfo?.data?.questions.map(
                        (question) =>
                          `${question.topic} ${question.isTrue ? "✅" : "❌"}`
                      )}
                      locale={{
                        emptyText: "No Results Yet",
                      }}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  )}
                </>
              )}

              <div className={styles.lower}>
                {tableView === "interviewees" && (
                  <>
                    <div className={styles.row}>
                      <div className={styles.title}>Email</div>
                      <div className={styles.value}>
                        {selectedInterviewee?.email ||
                          userByIdInfo?.email ||
                          "example@mail.com"}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.title}>Phone</div>
                      <div className={styles.value}>
                        {selectedInterviewee?.phone_number ||
                          userByIdInfo?.phone_number ||
                          "+1234566789"}
                      </div>
                    </div>
                    {/* <div className={styles.row}>
                  <div className={styles.title}>Location</div>
                  <div className={styles.value}>San Francisco, CA</div>
                </div> */}
                    <div className={styles.row} style={{ display: "flex" }}>
                      <Button
                        block
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#38383D",
                          fontWeight: "bold",
                          border: "none",
                          color: "#fff",
                        }}
                        icon={<LuDownload />}
                        onClick={() => fetchPdf()}
                      >
                        Cover Letter
                      </Button>
                    </div>
                  </>
                )}

                <Button
                  style={{
                    backgroundColor: "#38383D",
                    marginTop: "2rem",
                    border: "none",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                  onClick={() => {
                    dispatch(cleargetResultByUserIdInterviewIdInfo());
                    setTableView(
                      tableView === "interviews" ? "interviewees" : "interviews"
                    );
                    setSearchValue("");
                  }}
                >
                  View{" "}
                  {tableView === "interviews" ? "Interviewees" : "Interviews"}
                </Button>
              </div>
            </Card>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
        <CustomModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          label={"Select Communication Date & Time"}
        >
          <div style={{ textAlign: "center", display: "flex" }}>
            <DatePicker
              showTime
              format={"MMM DD, YYYY HH:mm"}
              needConfirm={false}
              style={{ width: "100%" }}
            />
            <Button onClick={setDateTime}> Set </Button>
          </div>
        </CustomModal>
      </>
    </ConfigProvider>
  );
};

CompanyDashboard.propTypes = {
  clickCount: PropTypes.number,
};

export default CompanyDashboard;
