import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Security App</h2>
      <button onClick={() => navigate("/userinput")} className="start-button">
        Start
      </button>
    </div>
  );
}

export default App;
