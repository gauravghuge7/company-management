import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "react-message-popup";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Common font styles
  const fontStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#424242",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        employeeEmail: email,
        employeePassword: password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post("/api/employee/login", body, config);

      console.log(response.data.data);

      if (response.data.success === true) {
        if (response.data.data.userType === "employee") {
          message.success("Employee Logged In Successfully");
          window.location.href = "/employee/dashboard";
        } else if (response.data.data.userType === "admin") {
          message.success("Admin Logged In Successfully");
          window.location.href = "/admin/dashboard";
        } else if (response.data.data.userType === "client") {
          message.success("Client Logged In Successfully");
          window.location.href = "/company/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Invalid Email or Password");
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    console.log("Contact Form Submitted", { contactName, contactEmail, contactMessage });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-poppins p-6">
      
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4 animate-fade-in text-center">
        Welcome to the Management Portal
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl animate-slide-in">
        A powerful platform to streamline project workflows, track team performance, and enhance client collaboration.
      </p>

      {/* Colorful Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        
        {/* Employee Portal Card */}
        <div className="relative bg-gradient-to-tr from-blue-500 to-blue-700 rounded-3xl shadow-lg p-6 transition transform hover:scale-105">
          <h3 className="text-3xl font-bold text-white mb-2">Employee Portal</h3>
          <p className="text-white mb-4">Access tasks, track deadlines, and monitor project updates with ease.</p>
          <Link to="/employee/login" className="inline-block px-6 py-2 bg-white text-blue-700 rounded-full shadow-md transition hover:bg-blue-100">
            Employee Login
          </Link>
        </div>

        {/* Admin Dashboard Card */}
        <div className="relative bg-gradient-to-tr from-green-500 to-green-700 rounded-3xl shadow-lg p-6 transition transform hover:scale-105">
          <h3 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h3>
          <p className="text-white mb-4">Manage team tasks, oversee ticket statuses, and enhance productivity.</p>
          <Link to="/admin/dashboard" className="inline-block px-6 py-2 bg-white text-green-700 rounded-full shadow-md transition hover:bg-green-100">
            Admin Dashboard
          </Link>
        </div>

        {/* Client Access Card */}
        <div className="relative bg-gradient-to-tr from-purple-500 to-purple-700 rounded-3xl shadow-lg p-6 transition transform hover:scale-105">
          <h3 className="text-3xl font-bold text-white mb-2">Client Access</h3>
          <p className="text-white mb-4">Submit tickets, view project progress, and collaborate seamlessly.</p>
          <Link to="/client/login" className="inline-block px-6 py-2 bg-white text-purple-700 rounded-full shadow-md transition hover:bg-purple-100">
            Client Login
          </Link>
        </div>
        
        {/* Reports & Analytics Card */}
        <div className="relative bg-gradient-to-tr from-red-500 to-red-700 rounded-3xl shadow-lg p-6 transition transform hover:scale-105">
          <h3 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h3>
          <p className="text-white mb-4">Gain insights with comprehensive reports and data-driven analytics.</p>
          <Link to="/reports" className="inline-block px-6 py-2 bg-white text-red-700 rounded-full shadow-md transition hover:bg-red-100">
            View Reports
          </Link>
        </div>

        {/* Support Center Card */}
        <div className="relative bg-gradient-to-tr from-yellow-500 to-yellow-700 rounded-3xl shadow-lg p-6 transition transform hover:scale-105">
          <h3 className="text-3xl font-bold text-white mb-2">Support Center</h3>
          <p className="text-white mb-4">Access FAQs, submit tickets, and connect with our support team.</p>
          <Link to="/support" className="inline-block px-6 py-2 bg-white text-yellow-700 rounded-full shadow-md transition hover:bg-yellow-100">
            Support
          </Link>
        </div>
      </div>

      {/* Work List Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Platform Highlights</h2>
        <ul className="text-lg text-gray-600 space-y-3 list-disc list-inside">
          <li>Task Management: Create, assign, and track tasks with ease.</li>
          <li>Real-Time Collaboration: Facilitate seamless team communication.</li>
          <li>Ticketing System: Centralized support ticket handling for clients.</li>
          <li>Progress Tracking: Monitor project phases and update timelines.</li>
          <li>Data Analytics: Access insightful reports to enhance productivity.</li>
        </ul>
      </div>

      {/* About the Portal Section */}
      <div className="w-full max-w-4xl bg-blue-100 rounded-2xl shadow-lg p-8 text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">About the Portal</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our management portal is designed to streamline your organization's workflow, improving productivity
          by centralizing task management, communication, and data analytics. Whether you're an employee, admin, or client, 
          the portal ensures a seamless experience in managing tasks, tracking progress, and collaborating with team members.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 text-left mb-12">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-gray-800">1. How do I log into the portal?</h4>
            <p className="text-gray-600">To log into the portal, simply click on the appropriate login button based on your role (Employee, Admin, or Client).</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">2. How do I submit a ticket?</h4>
            <p className="text-gray-600">To submit a ticket, go to the Client Access section and log in with your credentials. From there, you can easily create and track your tickets.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">3. What features are available in the Admin Dashboard?</h4>
            <p className="text-gray-600">The Admin Dashboard provides tools to manage tasks, monitor team performance, and view detailed reports and analytics.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">4. Is there support available if I encounter issues?</h4>
            <p className="text-gray-600">Yes! Our Support Center is available to help you with any questions or issues you may have. You can submit a support ticket for assistance.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white p-6 mt-12">
        <div className="flex flex-col items-center">
          <p className="text-sm mb-2">© 2024 Management Portal. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
            <Link to="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
