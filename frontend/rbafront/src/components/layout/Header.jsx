import AvtarImage from "../../assets/user/avatar-8.jpg";
export default function Header({ toggleSidebar }) {
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/"; // redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top header">
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        <button
          className="btn btn-outline-light me-2"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Title */}
        <span className="navbar-brand mb-0 h1">RBA Tool</span>

        {/* Right side: avatar + logout */}
        <div className="ms-auto d-flex align-items-center">
          <img
            src={AvtarImage}
            alt="Admin"
            className="rounded-circle me-3"
            width="40"
            height="40"
          />
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
