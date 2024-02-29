import PropTypes from "prop-types";
import EmptyInterviewInfoBoard from "../emptyInterviewInfoBoard/index.jsx";
import CustomModal from "../CustomModal.jsx";
import { useState } from "react";
import AddInterview from "../addInterview/index.jsx";
import { Input, Select, Table, Tag, Card, Skeleton, Button } from "antd";
const { Option } = Select;
import { FaRegClock } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { ImStopwatch } from "react-icons/im";
import styles from "./style.module.scss";
import { CiCalendarDate } from "react-icons/ci";
import { MdPerson2 } from "react-icons/md";
import { interviewFetch } from "../../redux/toolkit/getInterviewByCompanyIdSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { interviewFetch as interviewById } from "../../redux/toolkit/interviewSlice.js";
import { PiShareFat } from "react-icons/pi";
import { toast, Toaster } from "react-hot-toast";

const { Meta } = Card;

const columns = [
  {
    title: "Interview Title",
    dataIndex: "name",
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
  // {
  //   title: "Status",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color;
  //         if (tag === "Upcoming") {
  //           color = "purple";
  //         } else if (tag === "Completed") {
  //           color = "green";
  //         } else if (tag === "Pending") {
  //           color = "orange";
  //         } else if (tag === "Cancelled") {
  //           color = "red";
  //         }
  //         return (
  //           <Tag bordered={false} color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: "Details",
  //   key: "action",
  //   dataIndex: "details",
  // },
];

const CompanyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableView, setTableView] = useState("interviews");

  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const { _id: id } = useSelector((state) => state.user.userInfo);
  const { interviewInfo } = useSelector(
    (state) => state.getInterviewByCompanyIdSlice
  );
  const selectedInterview = useSelector(
    (state) => state.interview?.interviewInfo
  );
  useEffect(() => {
    dispatch(interviewFetch(id));
  }, [dispatch, id]);

  const filterTable = (e) => {
    //TODO tableView a gore filtreledigi degisken ya interview ya da interviewee olacak
    const filteredData = interviewInfo.filter((interview) => {
      return interview.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setSearchResult(filteredData);
  };
  return (
    <div className={styles.main}>
      {/* <EmptyInterviewInfoBoard setIsModalOpen={setIsModalOpen}/>

            <CustomModal
                width={"100%"}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            >
                <div>
                    <AddInterview setIsModalOpen={setIsModalOpen}/>
                </div>
            </CustomModal> */}
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
        >
          <Option value="">Select an interview status</Option>
          <Option value="upcoming">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <FaRegClock />
              Upcoming
            </div>
          </Option>
          <Option value="completed">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GiConfirmed />
              Completed
            </div>
          </Option>
          <Option value="pending">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <ImStopwatch />
              Pending
            </div>
          </Option>
          <Option value="cancelled">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GiCancel />
              Cancelled
            </div>
          </Option>
        </Select>

        <Table
          dataSource={
            tableView === "interviews"
              ? searchValue.length === 0
                ? interviewInfo || []
                : searchResult
              : []
          }
          columns={columns}
          locale={{
            emptyText:
              tableView === "interviews"
                ? "No Interviews Yet"
                : "No Interviewees Yet",
          }}
          loading={interviewInfo === null}
          onRow={(record) => {
            return {
              onClick: () => {
                dispatch(interviewById(record.id));
                console.log("clickedInterview", selectedInterview);
              },
            };
          }}
        />
      </div>
      <div className={styles.right_side}>
        <p>
          {tableView === "interviews" ? "Interview " : "Interviewee "}
          Details
        </p>
        <Card>
          <Skeleton loading={!selectedInterview} active paragraph={{ rows: 7 }}>
            <div className={`${styles.flex} mb-2`}>
              <div className={styles.flexColumn}>
                <div className={styles.text}>
                  {tableView === "interviews"
                    ? selectedInterview?.data.name
                    : "Alice Johnson"}
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
                    "April 15, 2023"
                  )}
                </div>
              </div>
              <MdPerson2 size={25} />
            </div>
            <div className={`${styles.flex} mb-2`}>
              <div className={styles.flexColumn}>
                <div className={styles.text}>
                  {tableView === "interviews"
                    ? "Interview Duration"
                    : "Interview Date"}
                </div>
                <div className={styles.textMuted}>
                  {tableView === "interviews"
                    ? selectedInterview?.data?.interview_time
                    : "April 15, 2023"}
                </div>
              </div>
              <CiCalendarDate size={25} />
            </div>
            <div className={`${styles.flex} mb-2`}>
              <div className={styles.flexColumn}>
                <div className={styles.text}>Status (status yok) </div>
                <div className={styles.textMuted}>Upcoming</div>
              </div>
              <GiConfirmed size={20} />
            </div>
            {tableView === "interviews" && (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#EDEDED",
                  fontWeight: "bold",
                  border: "none",
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
            )}

            <div className={styles.lower}>
              {/* <div className={styles.row}>
                <div className={styles.title}>Email</div>
                <div className={styles.value}>alice.johnson@email.com</div>
              </div>
              <div className={styles.row}>
                <div className={styles.title}>Phone</div>
                <div className={styles.value}>124125125</div>
              </div>
              <div className={styles.row}>
                <div className={styles.title}>Location</div>
                <div className={styles.value}>San Francisco, CA</div>
              </div>
              <div className={styles.row}>
                <div className={styles.title}>Experience</div>
                <div className={styles.value}>
                  5 years in Software Engineering
                </div>
              </div> */}
              <Button
                style={{
                  backgroundColor: "#EDEDED",
                  marginTop: "2rem",
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setTableView(
                    tableView === "interviews" ? "interviewees" : "interviews"
                  );
                }}
              >
                View{" "}
                {tableView === "interviews" ? "Interviewees" : "Interviews"}
              </Button>
            </div>
          </Skeleton>
        </Card>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

CompanyDashboard.propTypes = {
  clickCount: PropTypes.number,
};

export default CompanyDashboard;
