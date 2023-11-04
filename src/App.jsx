import CallToAction from "./pages/root/CallToAction/CallToAction";
import Footer from "./pages/root/Footer/Footer";
import Welcome from "./pages/root/Welcome/Welcome";
import CardSection from "./pages/root/CardSection/CardSection";
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
