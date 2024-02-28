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
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdPerson2 } from "react-icons/md";

const { Meta } = Card;

const columns = [
  {
    title: "Candidate Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Position",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Interview Date",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color;
          if (tag === "Upcoming") {
            color = "purple";
          } else if (tag === "Completed") {
            color = "green";
          } else if (tag === "Pending") {
            color = "orange";
          } else if (tag === "Cancelled") {
            color = "red";
          }
          return (
            <Tag bordered={false} color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Details",
    key: "action",
    dataIndex: "details",
  },
];
const dataSource = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["Upcoming"],
    details: "View Profile",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["Completed"],
    details: "View Profile",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["Cancelled"],
    details: "View Profile",
  },
  {
    key: "4",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["Pending"],
    details: "View Profile",
  },
];
const CompanyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  const handleSearch = (newValue) => {
    console.log("apiye istek at");
  };
  const handleChange = (newValue) => {
    setValue(newValue);
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
        <p>Interview List</p>
        <input type="text" placeholder="Search Interviews" />
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
          dataSource={dataSource}
          columns={columns}
          locale={{ emptyText: "No Interviews Yet" }}
        />
      </div>
      <div className={styles.right_side}>
        <p>Interview Details</p>
        <Card>
          <Skeleton loading={loading} avatar active />
          <div className={`${styles.flex} mb-2`}>
            <div className={styles.flexColumn}>
              <div className={styles.text}>Alice Johnson</div>
              <div className={styles.textMuted}>April 15, 2023</div>
            </div>
            <MdPerson2 size={25} />
          </div>
          <div className={`${styles.flex} mb-2`}>
            <div className={styles.flexColumn}>
              <div className={styles.text}>Interview Date</div>
              <div className={styles.textMuted}>April 15, 2023</div>
            </div>
            <CiCalendarDate size={25} />
          </div>
          <div className={`${styles.flex}`}>
            <div className={styles.flexColumn}>
              <div className={styles.text}>Status </div>
              <div className={styles.textMuted}>Upcoming</div>
            </div>
            <GiConfirmed size={20} />
          </div>
          <div className={styles.lower}>
            <div className={styles.row}>
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
            </div>
            <Button
              style={{
                backgroundColor: "#EDEDED",
                marginTop: "2rem",
                border: "none",
                fontWeight: "bold",
              }}
            >
              View Interviewees
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

CompanyDashboard.propTypes = {
  clickCount: PropTypes.number,
};

export default CompanyDashboard;
