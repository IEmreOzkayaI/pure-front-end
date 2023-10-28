import CallToAction from "./components/pages/root/CallToAction/CallToAction";
import Footer from "./components/pages/root/Footer/Footer";
import Welcome from "./components/pages/root/Welcome/Welcome";
import CardSection from "./components/pages/root/CardSection/CardSection";
import "./global.scss";

function App() {
  return (
    <div className="globalContainer">
      <Welcome />
      <CallToAction />
      <CardSection />
      <Footer />
    </div>
  );
}

export default App;
