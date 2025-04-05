import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./../App.css";
import toast, { Toaster } from "react-hot-toast";

const LogTablePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [userIp, setUserIp] = useState("");
  const [blockedIps, setBlockedIps] = useState(() => {
    return JSON.parse(localStorage.getItem("blockedIps")) || [];
  });
  const [loading, setLoading] = useState(true);
  console.log(userIp);

  useEffect(() => {
    const fetchUserIPAndLogs = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
        const fakeLogs = [{ id: 1, ip: data.ip }];

        // Filter out blocked IPs
        setLogs(fakeLogs.filter((log) => !blockedIps.includes(log.ip)));
      } catch (error) {
        console.error("Error fetching IP:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIPAndLogs();
  }, [blockedIps]);

  const blockUser = (id, ip) => {
    const updatedBlockedIps = [...blockedIps, ip];
    setBlockedIps(updatedBlockedIps);
    localStorage.setItem("blockedIps", JSON.stringify(updatedBlockedIps));

    setLogs(logs.filter((log) => log.id !== id));
    toast.success(`IP ${ip} blocked due to brute-force attempts!`);
    navigate("/ipblocked");
  };

  const ignoreUser = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
    toast.success("IP Ignored Successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="table-auto border-collapse border border-gray-300 bg-white p-6">
        <Toaster />
        <div className="card">
          <h2>
            Login Attempts for {location.state?.username || "Unknown User"}
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading logs...</p>
          ) : (
            <div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                            style={{ marginRight: "20px" }}
                            onClick={() => ignoreUser(log.id)}
                          >
                            Ignore
                          </button>
                          <button
                            className="submit1-button"
                            onClick={() => blockUser(log.id, log.ip)}
                          >
                            Block
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-gray-500"
                        style={{ paddingTop: "30px" }}
                      >
                        No login attempts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <button className="submit-button" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogTablePage;
