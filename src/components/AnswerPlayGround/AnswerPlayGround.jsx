import PropTypes from "prop-types";
import DragBar from "../shared/DragBar/DragBar";
import styles from "./AnswerPlayGround.module.scss";
import AnswerOutput from "../AnswerOutput/AnswerOutput";
import AnswerInput from "../AnswerInput/AnswerInput";
import {useState} from "react";

const AnswerPlayGround = (props) => {
	const {handleDrag, rightSideHeight,edges,nodes,setEdges,setNodes} = props;


	return (
    <div className={styles.right_side}>
      <div className={styles.right_side_content} id="right_side">
        <AnswerInput
          rightSideHeight={rightSideHeight}
          setEdges={setEdges}
          edges={edges}
          setNodes={setNodes}
          nodes={nodes}
        />
        <DragBar handleDrag={handleDrag} className={["vertical"]} />
        <AnswerOutput
          edges={edges}
          nodes={nodes}
          setNodes={setNodes}
          setEdges={setEdges}
        />
      </div>
    </div>
  );
};

export default AnswerPlayGround;

AnswerPlayGround.propTypes = {
	handleDrag: PropTypes.func,
	rightSideHeight: PropTypes.number,
};
