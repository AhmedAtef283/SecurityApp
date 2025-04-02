import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInputPage = () => {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username && platform) {
      navigate("/logs", { state: { username, platform } });
    } else {
      alert("Please Fill Empty Values");
    }
  };

  return (
    <div className="user-input-container">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <input
        type="text"
        placeholder="Username"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="Platform Link"
        className="input-field"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <button onClick={handleSubmit} className="submit-button">
        Enter
      </button>
    </div>
  );
};

export default UserInputPage;
