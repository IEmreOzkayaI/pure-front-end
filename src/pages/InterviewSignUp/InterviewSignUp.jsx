import React from "react";
import styles from "./InterviewSignUp.module.scss";
import { motion } from "framer-motion";
const InterviewSignUp = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      InterviewSignUp
    </motion.div>
  );
};

export default InterviewSignUp;
