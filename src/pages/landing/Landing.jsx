import { motion } from "framer-motion";
import CallToAction from "../root/CallToAction/CallToAction";
import Welcome from "../root/Welcome/Welcome";
import CardSection from "../root/CardSection/CardSection";
const Landing = () => {
  return (
    <motion.div
      className="globalContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Welcome />
      <CallToAction />
      <CardSection />
    </motion.div>
  );
};

export default Landing;
