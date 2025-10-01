import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  BarChart3,
  Upload,
  PieChart,
  FileSpreadsheet,
  Eye,
  Info,
  ChevronRight,
} from "lucide-react";

import './css/Sidebar.css';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // track which parent is open
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`h-100 sidenav bg-dark sidebar text-white ${collapsed ? "collapsed" : "open"}`}
      style={{ width: collapsed ? "60px" : "240px", transition: "0.3s" }}
    >
      {/* Collapse Button */}
      <button
        className="sidenav-toggle-btn btn w-100 text-start"
        onClick={() => setCollapsed(!collapsed)}
      >
        <ChevronLeft className="sidenav-toggle-icon" />
      </button>

      <div className="nav flex-column mt-2">
        {/* Dashboard with children */}
        <div>
          <button
            className="nav-link text-white d-flex align-items-center justify-content-between w-100"
            onClick={() => toggleMenu("dashboard")}
          >
            <span>
              <BarChart3 className="me-2" color="#347ae2" /> Dashboard
            </span>
            <span className={`arrow ${openMenu === "dashboard" ? "open" : ""}`}>
              <ChevronDown />
            </span>
          </button>
          {openMenu === "dashboard" && (
            <div className="submenu ms-3">
              <Link
                to="/gst"
                className={`nav-link submenu-item text-white ${
                  location.pathname === "/gst" ? "active" : ""
                }`}
              >
                <ChevronRight /> GST
              </Link>
              <Link
                to="/swt"
                className={`nav-link submenu-item text-white ${
                  location.pathname === "/swt" ? "active" : ""
                }`}
              >
                <ChevronRight /> SWT
              </Link>
              <Link
                to="/cit"
                className={`nav-link submenu-item text-white ${
                  location.pathname === "/cit" ? "active" : ""
                }`}
              >
                <ChevronRight /> CIT
              </Link>
            </div>
          )}
        </div>

        {/* Upload Sheets */}
        <Link
          to="/upload-sheets"
          className={`nav-link text-white ${
            location.pathname === "/upload-sheets" ? "active" : ""
          }`}
        >
          <Upload className="me-2" color="#347ae2" /> Upload Sheets
        </Link>

        {/* Analytics with children */}
        <div>
          <button
            className="nav-link text-white d-flex align-items-center justify-content-between w-100"
            onClick={() => toggleMenu("analytics")}
          >
            <span>
              <PieChart className="me-2" color="#347ae2" /> Analytics
            </span>
            <span className={`arrow ${openMenu === "analytics" ? "open" : ""}`}>
              <ChevronDown />
            </span>
          </button>
          {openMenu === "analytics" && (
            <div className="submenu ms-3">
              <Link to="/risk-assessment" className="nav-link submenu-item text-white">
                <ChevronRight /> Risk Assessment
              </Link>
              <Link to="/risk-profiling" className="nav-link submenu-item text-white">
                <ChevronRight /> Risk Profiling
              </Link>
              <Link to="/compliance" className="nav-link submenu-item text-white">
                <ChevronRight /> Compliance
              </Link>
            </div>
          )}
        </div>

        {/* Reports with children */}
        <div>
          <button
            className="nav-link text-white d-flex align-items-center justify-content-between w-100"
            onClick={() => toggleMenu("reports")}
          >
            <span>
              <FileSpreadsheet className="me-2" color="#347ae2" /> Reports
            </span>
            <span className={`arrow ${openMenu === "reports" ? "open" : ""}`}>
              <ChevronDown />
            </span>
          </button>
          {openMenu === "reports" && (
            <div className="submenu ms-3">
              <Link to="/recent-uploads" className="nav-link submenu-item text-white">
                <ChevronRight /> Recent Uploads
              </Link>
              <Link to="/tax-payer-profile" className="nav-link submenu-item text-white">
                <ChevronRight /> Tax Payer Profile
              </Link>
              <Link
                to="/taxpayer-report-risk-profiling"
                className="nav-link submenu-item text-white"
              >
                <ChevronRight /> Taxpayer Report Risk Profiling
              </Link>
            </div>
          )}
        </div>

        {/* Upload History */}
        <Link to="/upload-history" className="nav-link text-white">
          <Eye className="me-2" color="#347ae2" /> Upload History
        </Link>

        {/* Help Centre */}
        <Link to="/help-centre" className="nav-link text-white">
          <Info className="me-2" color="#347ae2" /> Help Centre
        </Link>
      </div>
    </div>
  );
}