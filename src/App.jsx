import CallToAction from "./components/CallToAction/CallToAction";
import Welcome from "./components/Welcome/Welcome";
import "./global.scss";

function App() {
  return (
    <div className="globalContainer">
      <Welcome />
      <CallToAction />
    </div>
  );
}

export default App;
