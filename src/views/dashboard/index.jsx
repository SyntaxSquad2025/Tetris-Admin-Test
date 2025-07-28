// import React, { useEffect, useState } from "react";
// import { Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom"; // Import Link for navigation
// import { FaUsers, FaExchangeAlt, FaGamepad } from "react-icons/fa";
// import { CircularProgressbar } from "react-circular-progressbar";
// import { getData } from "../../../src/apiConfigs/apiCalls";
// import {
//   TOTAL_GAME_HISTORY,
//   GET_TASK,
//   GET_ALL_USERS,
//   GET_ALL_WITHDRAWALS,
// } from "../../../src/apiConfigs/endpoints";

// // Styles for circular progress bar
// import "react-circular-progressbar/dist/styles.css"; // Import the circular progress bar styles

// const DashDefault = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalTasks, setTotalTasks] = useState(0);
//   const [totalGames, setTotalGames] = useState(0);
//   const [totalTransactions, setTotalTransactions] = useState(0);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       const usersRes = await getData(GET_ALL_USERS);
//       if (!usersRes) {
//         setTotalUsers(0);
//       } else {
//         setTotalUsers(usersRes?.users?.length || 0);
//       }
//       // const tasksRes = await getData(GET_TASK);
//       const gamesRes = await getData(TOTAL_GAME_HISTORY);
//       if (!gamesRes) {
//         setTotalGames(0);
//       } else {
//         setTotalGames(gamesRes?.history?.length || 0);
//       }
//       const transactionsRes = await getData(GET_ALL_WITHDRAWALS);
//       if (!transactionsRes) {
//         setTotalTransactions(0);
//       } else {
//         setTotalTransactions(transactionsRes?.withdrawals?.length || 0);
//       }
//       console.log(usersRes, gamesRes, "transactionsRes");

//       // setTotalTasks(tasksRes?.allTasks?.length || 0);
//     };

//     console.log(totalUsers, totalGames, totalTransactions, "totalTransactions");

//     fetchData();
//   }, []);

//   // Data for cards
//   const dashSalesData = [
//     {
//       title: "Total Registered Users",
//       value: totalUsers,
//       color: "#00B5E2",
//       icon: <FaUsers size={30} />,
//       link: "/usermanagement",
//     },
//     {
//       title: "Total Transaction Users",
//       value: totalTransactions,
//       color: "#00B5E2",
//       icon: <FaExchangeAlt size={30} />,
//       link: "/allwithdrawals",
//     },
//     {
//       title: "Total Games",
//       value: totalGames,
//       color: "#00B5E2",
//       icon: <FaGamepad size={30} />,
//       link: "/gamehistory",
//     },
//   ];

//   return (
//     <React.Fragment>
//       <Row className="justify-content-center mt-4">
//         {dashSalesData.map((data, index) => (
//           <Col key={index} xl={4} md={6} sm={12} className="mb-4">
//             <Card className="shadow-sm rounded-lg" style={{ border: "none" }}>
//               <Card.Body
//                 className="text-center p-4"
//                 style={{
//                   color: "#34495e",
//                   borderLeft: `8px solid ${data.color}`,
//                 }}
//               >
//                 <div className="d-flex justify-content-center mb-3">
//                   <div
//                     style={{
//                       width: 50,
//                       height: 50,
//                       borderRadius: "50%",
//                       backgroundColor: `${data.color}20`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {data.icon}
//                   </div>
//                 </div>
//                 <h6
//                   className="mb-3"
//                   style={{ fontWeight: "600", fontSize: "18px" }}
//                 >
//                   {data.title}
//                 </h6>
//                 <h3
//                   style={{
//                     fontWeight: "300",
//                     color: data.color,
//                     fontSize: "30px",
//                   }}
//                 >
//                   {data.value.toLocaleString()}
//                 </h3>
//                 <Link
//                   to={data.link}
//                   style={{ textDecoration: "none", color: data.color }}
//                 >
//                   <Button
//                     variant="link"
//                     style={{
//                       fontWeight: "500",
//                       fontSize: "14px",
//                       color: data.color,
//                     }}
//                   >
//                     View Details
//                   </Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </React.Fragment>
//   );
// };

// export default DashDefault;
// ==============================================================

// "use client"

// import React, { useEffect, useState } from "react"
// import { Row, Col, Card, Button } from "react-bootstrap"
// import { Link } from "react-router-dom"
// import { FaUsers, FaExchangeAlt, FaGamepad } from "react-icons/fa"
// import { getData } from "../../../src/apiConfigs/apiCalls"
// import { DASHBOARD } from "../../../src/apiConfigs/endpoints"

// // Styles for circular progress bar
// import "react-circular-progressbar/dist/styles.css"

// const DashDefault = () => {
//   const [totalUsers, setTotalUsers] = useState(0)
//   const [totalGames, setTotalGames] = useState(0)
//   const [totalTransactions, setTotalTransactions] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   // Dark theme colors
//   const darkTheme = {
//     bgPrimary: "#1a1a1a",
//     bgSecondary: "#2d2d2d",
//     bgTertiary: "#3a3a3a",
//     textPrimary: "#ffffff",
//     textSecondary: "#b0b0b0",
//     textMuted: "#888888",
//     border: "#404040",
//     accent: "#4a9eff",
//     success: "#28a745",
//     danger: "#dc3545",
//     warning: "#ffc107",
//   }

//   // Fetch data from single DASHBOARD API
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const dashboardRes = await getData(DASHBOARD)

//         if (!dashboardRes) {
//           setError("Failed to fetch dashboard data")
//           setTotalUsers(0)
//           setTotalGames(0)
//           setTotalTransactions(0)
//         } else {
//           // Set data from single API response
//           setTotalUsers(dashboardRes.totalUsers || 0)
//           setTotalGames(dashboardRes.totalGames || 0)
//           setTotalTransactions(dashboardRes.totalTransacions || 0) // Note: keeping the typo from backend

//           console.log("Dashboard data fetched successfully:", dashboardRes)
//         }
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error)
//         setError("Error fetching dashboard data")
//         setTotalUsers(0)
//         setTotalGames(0)
//         setTotalTransactions(0)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDashboardData()
//   }, [])

//   // Data for cards with updated colors for dark theme
//   const dashSalesData = [
//     {
//       title: "Total Registered Users",
//       value: totalUsers,
//       color: darkTheme.accent,
//       icon: <FaUsers size={30} />,
//       link: "/usermanagement",
//       gradient: "linear-gradient(135deg, #4a9eff 0%, #0066cc 100%)",
//     },
//     {
//       title: "Total Transaction Users",
//       value: totalTransactions,
//       color: darkTheme.success,
//       icon: <FaExchangeAlt size={30} />,
//       link: "/allwithdrawals",
//       gradient: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)",
//     },
//     {
//       title: "Total Games",
//       value: totalGames,
//       color: darkTheme.warning,
//       icon: <FaGamepad size={30} />,
//       link: "/gamehistory",
//       gradient: "linear-gradient(135deg, #ffc107 0%, #e0a800 100%)",
//     },
//   ]

//   // Loading state with dark theme
//   if (loading) {
//     return (
//       <div
//         style={{
//           backgroundColor: darkTheme.bgPrimary,
//           minHeight: "100vh",
//           color: darkTheme.textPrimary,
//           padding: "20px",
//         }}
//       >
//         <Row className="justify-content-center mt-4">
//           <Col className="text-center">
//             <div
//               className="spinner-border"
//               role="status"
//               style={{
//                 color: darkTheme.accent,
//                 width: "3rem",
//                 height: "3rem",
//               }}
//             >
//               <span className="sr-only">Loading...</span>
//             </div>
//             <p
//               className="mt-3"
//               style={{
//                 color: darkTheme.textSecondary,
//                 fontSize: "18px",
//               }}
//             >
//               Loading dashboard data...
//             </p>
//           </Col>
//         </Row>
//       </div>
//     )
//   }

//   // Error state with dark theme
//   if (error) {
//     return (
//       <div
//         style={{
//           backgroundColor: darkTheme.bgPrimary,
//           minHeight: "100vh",
//           color: darkTheme.textPrimary,
//           padding: "20px",
//         }}
//       >
//         <Row className="justify-content-center mt-4">
//           <Col md={6} className="text-center">
//             <div
//               className="alert"
//               role="alert"
//               style={{
//                 backgroundColor: darkTheme.bgSecondary,
//                 border: `1px solid ${darkTheme.danger}`,
//                 borderLeft: `4px solid ${darkTheme.danger}`,
//                 color: darkTheme.textPrimary,
//                 borderRadius: "8px",
//                 padding: "20px",
//               }}
//             >
//               <i
//                 className="fas fa-exclamation-triangle"
//                 style={{
//                   color: darkTheme.danger,
//                   fontSize: "24px",
//                   marginBottom: "10px",
//                 }}
//               ></i>
//               <h5 style={{ color: darkTheme.danger, marginBottom: "10px" }}>Error Loading Dashboard</h5>
//               <p style={{ color: darkTheme.textSecondary, marginBottom: "15px" }}>{error}</p>
//             </div>
//             <Button
//               onClick={() => window.location.reload()}
//               className="mt-2"
//               style={{
//                 backgroundColor: darkTheme.accent,
//                 borderColor: darkTheme.accent,
//                 color: "#ffffff",
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 fontWeight: "500",
//               }}
//             >
//               <i className="fas fa-refresh" style={{ marginRight: "8px" }}></i>
//               Retry
//             </Button>
//           </Col>
//         </Row>
//       </div>
//     )
//   }

//   return (
//     <div
//       style={{
//         backgroundColor: darkTheme.bgPrimary,
//         minHeight: "100vh",
//         color: darkTheme.textPrimary,
//         padding: "20px",
//       }}
//     >
//       {/* Dashboard Header */}
//       <Row className="mb-4">
//         <Col>
//           <h2
//             style={{
//               color: darkTheme.textPrimary,
//               fontWeight: "300",
//               fontSize: "28px",
//               marginBottom: "8px",
//             }}
//           >
//             Dashboard 
//           </h2>
//         </Col>
//       </Row>

//       {/* Main Dashboard Cards */}
//       <Row className="justify-content-center">
//         {dashSalesData.map((data, index) => (
//           <Col key={index} xl={4} md={6} sm={12} className="mb-4">
//             <Card
//               className="h-100"
//               style={{
//                 border: `1px solid ${darkTheme.border}`,
//                 backgroundColor: darkTheme.bgSecondary,
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 transition: "all 0.3s ease",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-5px)"
//                 e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.4)"
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)"
//                 e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.3)"
//               }}
//             >
//               {/* Card Header with Gradient */}
//               <div
//                 style={{
//                   background: data.gradient,
//                   height: "4px",
//                   width: "100%",
//                 }}
//               />

//               <Card.Body className="text-center p-4">
//                 {/* Icon Container */}
//                 <div className="d-flex justify-content-center mb-3">
//                   <div
//                     style={{
//                       width: 70,
//                       height: 70,
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${data.color}20, ${data.color}10)`,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       border: `2px solid ${data.color}30`,
//                       color: data.color,
//                     }}
//                   >
//                     {React.cloneElement(data.icon, { size: 35 })}
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h6
//                   className="mb-3"
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "16px",
//                     color: darkTheme.textSecondary,
//                     textTransform: "uppercase",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   {data.title}
//                 </h6>

//                 {/* Value */}
//                 <h2
//                   style={{
//                     fontWeight: "700",
//                     color: data.color,
//                     fontSize: "36px",
//                     marginBottom: "20px",
//                     textShadow: `0 0 10px ${data.color}30`,
//                   }}
//                 >
//                   {data.value.toLocaleString()}
//                 </h2>

//                 {/* View Details Button */}
//                 <Link to={data.link} style={{ textDecoration: "none" }}>
//                   <Button
//                     variant="outline"
//                     style={{
//                       backgroundColor: "transparent",
//                       border: `2px solid ${data.color}`,
//                       color: data.color,
//                       fontWeight: "600",
//                       fontSize: "14px",
//                       padding: "8px 20px",
//                       borderRadius: "25px",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.5px",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = data.color
//                       e.target.style.color = "#ffffff"
//                       e.target.style.transform = "scale(1.05)"
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = "transparent"
//                       e.target.style.color = data.color
//                       e.target.style.transform = "scale(1)"
//                     }}
//                   >
//                     View Details
//                     <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
//                   </Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   )
// }

// export default DashDefault



"use client"

import { useEffect, useState } from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaUsers, FaExchangeAlt, FaGamepad, FaChartLine, FaStar, FaTrophy } from "react-icons/fa"
import { getData } from "../../../src/apiConfigs/apiCalls"
import { DASHBOARD } from "../../../src/apiConfigs/endpoints"

// Styles for circular progress bar
import "react-circular-progressbar/dist/styles.css"

const DashDefault = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalGames, setTotalGames] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [animatedValues, setAnimatedValues] = useState({ users: 0, games: 0, transactions: 0 })

  // Dark theme colors
  const darkTheme = {
    bgPrimary: "#0f0f0f",
    bgSecondary: "#1a1a1a",
    bgTertiary: "#2d2d2d",
    bgCard: "#1e1e1e",
    bgCardHover: "#252525",
    textPrimary: "#ffffff",
    textSecondary: "#b0b0b0",
    textMuted: "#888888",
    accent1: "#ff6b6b",
    accent2: "#4ecdc4",
    accent3: "#45b7d1",
    accent4: "#f9ca24",
    accent5: "#6c5ce7",
    shadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
    shadowHover: "0 20px 40px 0 rgba(0, 0, 0, 0.7)",
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.2)",
  }

  // Animate numbers
useEffect(() => {
  if (!loading && !error) {
    // Directly set the values without animation
    setAnimatedValues({
      users: totalUsers,
      games: totalGames,
      transactions: totalTransactions,
    });
  }
}, [totalUsers, totalGames, totalTransactions, loading, error]);

  // Fetch data from single DASHBOARD API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        const dashboardRes = await getData(DASHBOARD)

        if (!dashboardRes) {
          setError("Failed to fetch dashboard data")
          setTotalUsers(0)
          setTotalGames(0)
          setTotalTransactions(0)
        } else {
          // Set data from single API response
          setTotalUsers(dashboardRes.totalUsers || 0)
          setTotalGames(dashboardRes.totalGames || 0)
          setTotalTransactions(dashboardRes.totalTransacions || 0) // Note: keeping the typo from backend

          console.log("Dashboard data fetched successfully:", dashboardRes)
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Error fetching dashboard data")
        setTotalUsers(0)
        setTotalGames(0)
        setTotalTransactions(0)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Creative dashboard data with dark theme
  const dashSalesData = [
    {
      title: "Total Registered Users",
      textTransform: "none",
      value: animatedValues.users,
      actualValue: totalUsers,
      color: darkTheme.accent1,
      icon: <FaUsers size={32} />,
      link: "/usermanagement",
      gradient: `linear-gradient(135deg, ${darkTheme.accent1} 0%, #e55555 100%)`,
      bgPattern: `radial-gradient(circle at 20% 80%, ${darkTheme.accent1}20 0%, transparent 50%)`,
      trend: "+12%",
      // decorIcon: <FaStar size={16} />,
    },
    {
      title: "Total Transaction Users",
      value: animatedValues.transactions,
      actualValue: totalTransactions,
      color: darkTheme.accent2,
      icon: <FaExchangeAlt size={32} />,
      link: "/allwithdrawals",
      gradient: `linear-gradient(135deg, ${darkTheme.accent2} 0%, #3db5ac 100%)`,
      bgPattern: `radial-gradient(circle at 80% 20%, ${darkTheme.accent2}20 0%, transparent 50%)`,
      trend: "+8%",
      // decorIcon: <FaChartLine size={16} />,
    },
    {
      title: "Total Games",
      value: animatedValues.games,
      actualValue: totalGames,
      color: darkTheme.accent4,
      icon: <FaGamepad size={32} />,
      link: "/gamehistory",
      gradient: `linear-gradient(135deg, ${darkTheme.accent4} 0%, #e6b800 100%)`,
      bgPattern: `radial-gradient(circle at 50% 50%, ${darkTheme.accent4}20 0%, transparent 50%)`,
      trend: "+15%",
      // decorIcon: <FaTrophy size={16} />,
    },
  ]

  // Dark theme loading state
  if (loading) {
    return (
      <div
        style={{
          background: darkTheme.bgPrimary,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated dark background elements */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: darkTheme.bgTertiary,
            animation: "float 6s ease-in-out infinite",
            opacity: "0.3",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: darkTheme.bgSecondary,
            animation: "float 8s ease-in-out infinite reverse",
            opacity: "0.2",
          }}
        />

        <div className="text-center">
          <div
            style={{
              width: "80px",
              height: "80px",
              border: `4px solid ${darkTheme.bgTertiary}`,
              borderTop: `4px solid ${darkTheme.accent3}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <h3 style={{ color: darkTheme.textPrimary, fontWeight: "300", marginBottom: "10px" }}>Loading Dashboard</h3>
          <p style={{ color: darkTheme.textSecondary }}>Fetching your analytics...</p>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    )
  }

  // Dark theme error state
  if (error) {
    return (
      <div
        style={{
          background: darkTheme.bgPrimary,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: darkTheme.bgCard,
            border: `1px solid ${darkTheme.border}`,
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            maxWidth: "500px",
            boxShadow: darkTheme.shadow,
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: `linear-gradient(135deg, ${darkTheme.accent1}, #e55555)`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <i className="fas fa-exclamation-triangle" style={{ color: "#fff", fontSize: "32px" }} />
          </div>
          <h4 style={{ color: darkTheme.textPrimary, marginBottom: "15px" }}>Oops! Something went wrong</h4>
          <p style={{ color: darkTheme.textSecondary, marginBottom: "25px" }}>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            style={{
              background: `linear-gradient(135deg, ${darkTheme.accent3}, #3a9bc1)`,
              border: "none",
              borderRadius: "25px",
              padding: "12px 30px",
              color: "#fff",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: darkTheme.bgPrimary,
        minHeight: "100vh",
        padding: "30px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dark floating background elements */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: darkTheme.bgSecondary,
          animation: "float 10s ease-in-out infinite",
          opacity: "0.3",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: darkTheme.bgTertiary,
          animation: "float 12s ease-in-out infinite reverse",
          opacity: "0.2",
        }}
      />

      {/* Dark theme header */}
      <div className="text-center mb-5">
        <h1
          style={{
            color: darkTheme.textPrimary,
            fontSize: "3rem",
            fontWeight: "50",
            marginBottom: "10px",
            textShadow: "0 4px 8px rgba(0,0,0,0.8)",
            letterSpacing: "1px",
            fontFamily: "Ubuntu",
          }}
        >
          {/* Dashboard
           */}
           Tetris Command Center
        </h1>
        {/* <div
          style={{
            width: "100px",
            height: "4px",
            background: `linear-gradient(90deg, ${darkTheme.accent1}, ${darkTheme.accent2}, ${darkTheme.accent4})`,
            margin: "0 auto 20px",
            borderRadius: "2px",
          }}
        /> */}

      </div>

      {/* Dark theme dashboard cards */}
      <Row className="justify-content-center g-4">
        {dashSalesData.map((data, index) => (
         <Col key={index} xl={4} lg={6} md={6} sm={12}>
  <Card
    style={{
      background: `${data.bgPattern}, ${darkTheme.bgCard}`,
      border: `1px solid ${darkTheme.border}`,
      borderRadius: "20px",
      overflow: "hidden",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: darkTheme.shadow,
      position: "relative",
      minHeight: "80px", // Decreased height
    }}
    className="h-100"
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
      e.currentTarget.style.boxShadow = darkTheme.shadowHover;
      e.currentTarget.style.background = `${data.bgPattern}, ${darkTheme.bgCardHover}`;
      e.currentTarget.style.borderColor = darkTheme.borderHover;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0) scale(1)";
      e.currentTarget.style.boxShadow = darkTheme.shadow;
      e.currentTarget.style.background = `${data.bgPattern}, ${darkTheme.bgCard}`;
      e.currentTarget.style.borderColor = darkTheme.border;
    }}
  >
    {/* Gradient top border */}
    <div
      style={{
        background: data.gradient,
        height: "5px",
        width: "100%",
      }}
    />

    {/* Decorative corner element */}
    <div
      style={{
        position: "absolute",
        top: "15px",  // Adjust position for smaller size
        right: "15px",
        color: data.color,
        opacity: "0.3",
      }}
    >
      {data.decorIcon}
    </div>

    <Card.Body className="p-3 text-center position-relative"> {/* Reduced padding */}
      {/* Icon with dark theme background */}
      <div className="mb-3">
        <div
          style={{
            width: "60px",  // Reduced size of the icon
            height: "60px", // Reduced size of the icon
            background: data.gradient,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            boxShadow: `0 10px 30px ${data.color}40`,
            position: "relative",
          }}
        >
          <div style={{ color: "#fff" }}>{data.icon}</div>

          {/* Pulse animation ring */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `2px solid ${data.color}`,
              animation: "pulse 2s infinite",
              opacity: "0.6",
            }}
          />
        </div>
      </div>

      {/* Title and description */}
      <h5
        style={{
          color: darkTheme.textPrimary,
          fontWeight: "500",
          fontSize: "1.2rem", // Reduced font size
          marginBottom: "3px",
          textTransform: "none",
          letterSpacing: "1px",
        }}
      >
        {data.title}
      </h5>

      <p
        style={{
          color: darkTheme.textMuted,
          fontSize: "0.85rem",  // Reduced font size
          marginBottom: "20px",
        }}
      >
        {data.description}
      </p>

      {/* Animated value */}
      <div className="mb-3">
        <h2
          style={{
            color: data.color,
            fontSize: "2rem",  // Reduced font size
            fontWeight: "700",
            marginBottom: "5px",
            textShadow: `0 0 20px ${data.color}50`,
          }}
        >
          {data.value.toLocaleString()}
        </h2>
      </div>

      {/* Dark theme button */}
      <Link to={data.link} style={{ textDecoration: "none" }}>
        <Button
          style={{
            background: "transparent",
            border: `2px solid ${data.color}`,
            color: data.color,
            borderRadius: "20px",
            padding: "8px 20px", // Reduced padding
            fontWeight: "600",
            fontSize: "0.8rem", // Reduced font size
            textTransform: "none",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = data.gradient;
            e.target.style.color = "#fff";
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = `0 5px 15px ${data.color}50`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = data.color;
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
          }}
        >
          View Details
          <i className="fas fa-arrow-right ms-2" />
        </Button>
      </Link>
    </Card.Body>
  </Card>
</Col>

        ))}
      </Row>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default DashDefault
