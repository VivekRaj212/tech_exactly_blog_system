import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await api.get("/admin/dashboard");
      const usersRes = await api.get("/admin/users");
      setStats(statsRes.data);
      setUsers(usersRes.data.users || usersRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      {/* Page Title */}
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="row g-3 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Users</h6>
              <h3 className="fw-bold">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Posts</h6>
              <h3 className="fw-bold">{stats.totalPosts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6 className="text-muted">Total Comments</h6>
              <h3 className="fw-bold">{stats.totalComments}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Users</h4>

          {users.length === 0 ? (
            <p className="text-muted">No users found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
