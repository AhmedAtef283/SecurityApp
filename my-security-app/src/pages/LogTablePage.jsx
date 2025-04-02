import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./../App.css"; // Import the CSS

const LogTablePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [userIp, setUserIp] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(userIp);
  useEffect(() => {
    const fetchUserIPAndLogs = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);

        // Simulated API log data including the fetched IP
        const fakeLogs = [{ id: 1, ip: data.ip }];
        setLogs(fakeLogs);
      } catch (error) {
        console.error("Error fetching IP:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIPAndLogs();
  }, []);

  const blockUser = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const ignoreUser = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login Attempts for {location.state?.username || "Unknown User"}</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading logs...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Log #</th>
                <th>IP Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>{log.ip}</td>
                    <td>
                    <button
                        className="submit1-button"
                        onClick={() => ignoreUser(log.id)}
                      >
                        Ignore
                      </button>
                      <button
                        className="submit1-button"
                        onClick={() => blockUser(log.id)}
                      >
                        Block
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-gray-500">
                    No login attempts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <button className="submit-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default LogTablePage;
