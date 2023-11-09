import CallToAction from "./pages/root/CallToAction/CallToAction";
import Footer from "./pages/root/Footer/Footer";
import Welcome from "./pages/root/Welcome/Welcome";
import CardSection from "./pages/root/CardSection/CardSection";
import "./global.scss";
import { motion } from "framer-motion";

function App() {
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
      <Footer />
    </motion.div>
  );
}

export default App;
