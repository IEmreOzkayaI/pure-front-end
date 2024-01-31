import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import styles from "./Join.module.scss";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";

function Join({ id }) {
  const updateNodeInternals = useUpdateNodeInternals();
  // const changeBottomHandlePosition = useCallback(() => {
  //   const bottomHandle = document.querySelector(
  //     `[data-handleid="joinTargetDown_${id}"]`
  //   );

  //   const bottomResizer = document.querySelector(`#join_${id}`);

  //   bottomHandle.style.top = `${
  //     bottomResizer.previousElementSibling.offsetTop - 16
  //   }px`;

  //   updateNodeInternals(id);
  // }, [updateNodeInternals, id]);
  const [targetArray, setTargetArray] = useState([]);
  const [sourceArray, setSourceArray] = useState([]);
  const nodeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 20, height: 20 });
  useLayoutEffect(() => {
    if (nodeRef.current) {
      setDimensions({
        width: nodeRef.current.offsetWidth + dimensions.width,
        height: nodeRef.current.offsetHeight + dimensions.height,
      });
    }
  }, []);

  const add = (type) => {
    if (type === "target" && targetArray.length < 4) {
      let tmp = targetArray.length + 1;
      setTargetArray([...targetArray, tmp]);
    }
    if (type === "source" && sourceArray.length < 4) {
      let tmp = sourceArray.length + 1;
      setSourceArray([...sourceArray, tmp]);
    }
  };

  const positionHandle = useCallback(
    (index) => {
      if (index === 1 || index === 2) {
        return (dimensions.height / 3) * index;
      } else if (index === 3) {
        return 0;
      } else if (index === 4) {
        return dimensions.height;
      }
    },
    [dimensions.height]
  );

  const targetHandles = useMemo(
    () =>
      targetArray.map((x, i) => {
        const handleId = `join-handle-${i + 1}`;
        return (
          <Handle
            key={handleId}
            type="target"
            position={Position.Left}
            id={handleId}
            style={{ top: positionHandle(i + 1), backgroundColor: "red" }}
          />
        );
      }),
    [targetArray, positionHandle]
  );

  const sourceHandles = useMemo(
    () =>
      sourceArray.map((x, i) => {
        const handleId = `join-handle-${i + 1}`;
        return (
          <Handle
            key={handleId}
            type="source"
            position={Position.Right}
            id={handleId}
            style={{ top: positionHandle(i + 1), backgroundColor: "red" }}
          />
        );
      }),
    [sourceArray, positionHandle]
  );

  useEffect(
    () => updateNodeInternals(id),
    [updateNodeInternals, targetHandles, sourceHandles, id]
  );
  return (
    <div className={styles.nodeContainer}>
      <div className={styles.join} id={`join_${id}`} ref={nodeRef}>
        {targetHandles}
        {sourceHandles}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={() => add("source")}>add source handle</button>
        <button onClick={() => add("target")}>add target handle</button>
      </div>
    </div>
  );
}

export default Join;
