import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import Chart from "react-apexcharts";
import "./css/Dashboard.css";

export default function CITDashboard() {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => setOpen(!open);

  // Static chart data
  const salesOptions = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    stroke: { curve: "smooth" },
    colors: ["#5096FF", "#47C99E"],
    legend: { position: "top" },
  };
  const salesSeries = [
    { name: "Sales Income", data: [10, 20, 15, 30, 25, 40] },
    { name: "GST Payable", data: [5, 12, 8, 15, 10, 18] },
  ];

  const gstOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { columnWidth: "50%" } },
    xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
    colors: ["#F96992", "#FFA56D"],
    legend: { position: "top" },
  };
  const gstSeries = [
    { name: "Payable", data: [20, 30, 25, 40] },
    { name: "Refundable", data: [10, 15, 12, 18] },
  ];

  const pieOptions = {
    chart: { type: "donut" },
    labels: ["Group A", "Group B", "Group C"],
    colors: ["#5096FF", "#47C99E", "#F96992"],
    legend: { position: "bottom" },
  };
  const pieSeries = [44, 33, 23];

  const riskOptions = {
    chart: { type: "pie" },
    labels: ["Risk Flagged", "Non-Risk"],
    colors: ["#E900B6", "#47C99E"],
    legend: { position: "bottom" },
  };
  const riskSeries = [30, 70];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar open={open} toggleSidebar={toggleSidebar} />

        {/* Main area */}
        <main className="flex-grow-1 p-3 mt-5 main-content">
          {/* Page Title */}
          <div className="header-title-page mb-3">CIT Dashboard</div>

          {/* Filters */}
          <div className="d-flex align-items-center justify-content-between top-filter-class mb-4">
            <div className="tenure-filter-div">
              <label
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Select Tenure
              </label>
              <select className="tenure-select-box form-select form-select-sm">
                <option value="1m">Past 1 Month</option>
                <option value="3m">Past 3 Months</option>
                <option value="6m">Past 6 Months</option>
                <option value="1y">Past 1 Year</option>
                <option value="3y">Past 3 Years</option>
                <option value="6y">Past 6 Years</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="d-flex ps-3 gap-2 align-items-center">
              <span>29-08-2025</span>
              <span>to</span>
              <span>29-09-2025</span>
            </div>
          </div>

          {/* Widget Cards */}
          <div className="widget-main-div d-flex flex-wrap gap-3 mb-4">
            <div className="widget-card card p-3 text-white" style={{ background: "#5096FF" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "24px" }}>0</div>
                <div>Total Tax Payers</div>
              </div>
            </div>
            <div className="widget-card card p-3 text-white" style={{ background: "#47C99E" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "24px" }}>PGK 0</div>
                <div>Total Sales Income</div>
              </div>
            </div>
            <div className="widget-card card p-3 text-white" style={{ background: "#F96992" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "24px" }}>PGK 0</div>
                <div>Total GST Payable</div>
              </div>
            </div>
            <div className="widget-card card p-3 text-white" style={{ background: "#FFA56D" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "24px" }}>PGK 0</div>
                <div>Total GST Refundable</div>
              </div>
            </div>
          </div>

          {/* Chart Sections */}
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card box-background">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="chart-headers">Sales Comparison</span>
                  <button className="btn btn-outline-secondary btn-sm">Export</button>
                </div>
                <div className="card-body">
                  <Chart options={salesOptions} series={salesSeries} type="line" height={350} />
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="card box-background">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="chart-headers">GST Payable vs Refundable</span>
                  <button className="btn btn-outline-secondary btn-sm">Export</button>
                </div>
                <div className="card-body">
                  <Chart options={gstOptions} series={gstSeries} type="bar" height={350} />
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card box-background">
                <div className="card-header">Segmentation Distribution</div>
                <div className="card-body">
                  <Chart options={pieOptions} series={pieSeries} type="donut" height={350} />
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card box-background">
                <div className="card-header">Risk Flagged vs Non-Risk Flagged Taxpayers</div>
                <div className="card-body">
                  <Chart options={riskOptions} series={riskSeries} type="pie" height={350} />
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <div className="card box-background">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="chart-headers">Fraud TIN Distribution by Province</span>
                  <button className="btn btn-outline-secondary btn-sm">Export</button>
                </div>
                <div className="card-body text-center text-muted" style={{ height: "350px" }}>
                  No Data Found
                </div>
              </div>
            </div>

            {/* Tax Records Table */}
            <div className="mb-4">
              <div className="card box-background">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="chart-headers">Tax Records</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by TIN"
                    style={{ maxWidth: "300px" }}
                  />
                </div>
                <div className="card-body text-center text-muted">No Data Found</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
