import { useNavigate } from "react-router-dom";
import "./../App.css";

function IPBlockedPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>IP Blocked Successfully</h2>
      <button onClick={() => navigate("/")} className="start-button">
        Back to Home
      </button>
    </div>
  );
}

export default IPBlockedPage;
