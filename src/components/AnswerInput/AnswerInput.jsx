import styles from "./AnswerInput.module.scss";
import PropTypes from "prop-types";
import AceEditor from "../IDE/AceEditor.jsx";
import {useSelector} from "react-redux";
import DiagramFlow from "../ReactFlow/ReactFlow.jsx";

const AnswerInput = (props) => {
    const { rightSideHeight, edges ,setEdges,nodes,setNodes} = props;
    const currentQuestion = useSelector((state) => state.interviewManagement.currentQuestion);

    return (
        <div
            className={styles.right_side_content_up}
            style={{height: `${rightSideHeight}%`}}
        >
            {currentQuestion?.type === "Algorithm" && <AceEditor/>}
            {currentQuestion?.type === "Diagram" && <DiagramFlow edges={edges} setEdges={setEdges} nodes={nodes} setNodes={setNodes}/>}
        </div>
    );
};

AnswerInput.propTypes = {
    rightSideHeight: PropTypes.number,
};

export default AnswerInput;
