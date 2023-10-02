import CallToAction from "./components/CallToAction/CallToAction";
import Footer from "./components/Footer/Footer";
import Welcome from "./components/Welcome/Welcome";
import CardSection from "./components/CardSection/CardSection";
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
