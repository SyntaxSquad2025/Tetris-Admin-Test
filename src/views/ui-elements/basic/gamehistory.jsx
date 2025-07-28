// "use client"

// import { useState, useEffect } from "react"
// import { CRow, CCard, CCardHeader, CCardBody, CButton, CFormInput, CFormSelect, CAlert } from "@coreui/react"
// import { getData } from "../../../apiConfigs/apiCalls"
// import { SEARCH } from "../../../apiConfigs/endpoints"
// import { useNavigate } from "react-router-dom"
// import * as XLSX from "xlsx"

// const Gamehistory = () => {
//   const navigate = useNavigate()
//   const [users, setUsers] = useState([])
//   const [filteredUsers, setFilteredUsers] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [fromDate, setFromDate] = useState("")
//   const [toDate, setToDate] = useState("")
//   const [historyType, setHistoryType] = useState("game")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [totalPages, setTotalPages] = useState(1)
//   const [totalCount, setTotalCount] = useState(0)
//   const [isExporting, setIsExporting] = useState(false)
//   const usersPerPage = 10

//   const historyTypeOptions = [
//     { value: "game", label: "Game" },
//     { value: "task", label: "Task" },
//     { value: "ads", label: "Ads" },
//     { value: "dailyReward", label: "Daily Reward" },
//     { value: "referral", label: "Referral" },
//     { value: "withdrawal", label: "Withdrawal" },
//   ]

//   // Function to sort data by createdAt (newest first)
//   const sortDataByDate = (data) => {
//     return data.sort((a, b) => {
//       const dateA = new Date(
//         a.createdAt || a.CompletionTime || a.completionTime || a.claimedAt || a.CompletedAt || a.initiated || 0,
//       )
//       const dateB = new Date(
//         b.createdAt || b.CompletionTime || b.completionTime || b.claimedAt || b.CompletedAt || b.initiated || 0,
//       )
//       return dateB - dateA // Descending order (newest first)
//     })
//   }

//   // Function to fetch ALL data for export (without pagination)
//   const fetchAllDataForExport = async () => {
//     try {
//       let typeParam = historyType
//       if (typeParam === "dailyReward") typeParam = "dailyreward"
//       if (typeParam === "game") typeParam = "gamehistory"
//       if (typeParam === "task") typeParam = "tasks"

//       // Prepare query params with high limit to get all data
//       const params = {
//         type: typeParam,
//         limit: 10000, // High limit to get all data
//       }
//       if (fromDate) params.fromDate = fromDate
//       if (toDate) params.toDate = toDate
//       if (searchTerm) {
//         // Changed to use userId instead of username
//         params.userId = searchTerm
//       }

//       // Add status filter for withdrawals to only get transferred ones
//       if (typeParam === "withdrawal") {
//         params.status = "transferred"
//       }

//       // Build query string
//       const queryString = Object.entries(params)
//         .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
//         .join("&")

//       const response = await getData(`${SEARCH}?${queryString}`)

//       let dataList = []
//       // Extract data based on type
//       if (typeParam === "gamehistory") {
//         dataList = response?.history || []
//       } else if (typeParam === "tasks") {
//         dataList = response?.tasks || []
//       } else if (typeParam === "ads") {
//         dataList = response?.ads || []
//       } else if (typeParam === "dailyreward") {
//         dataList = response?.rewards || []
//       } else if (typeParam === "referral") {
//         dataList = response?.data || []
//       } else if (typeParam === "withdrawal") {
//         dataList = response?.withdrawals || []
//       }

//       // Sort the data by createdAt (newest first)
//       return sortDataByDate(dataList)
//     } catch (error) {
//       console.error("Error fetching all data for export:", error)
//       throw error
//     }
//   }

//   // Fetch data for the selected history type using the SEARCH endpoint
//   const fetchData = async (paramsOverride = {}) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       let response
//       let dataList = []
//       let typeParam = historyType
//       if (typeParam === "dailyReward") typeParam = "dailyreward"
//       if (typeParam === "game") typeParam = "gamehistory"
//       if (typeParam === "task") typeParam = "tasks"

//       // Prepare query params - use page 1 when history type changes
//       const params = {
//         type: typeParam,
//         page: paramsOverride.resetPage ? 1 : currentPage,
//         limit: usersPerPage,
//         ...paramsOverride,
//       }
//       if (fromDate) params.fromDate = fromDate
//       if (toDate) params.toDate = toDate
//       if (searchTerm) {
//         // Changed to use userId instead of username
//         params.userId = searchTerm
//       }

//       // Add status filter for withdrawals to only get transferred ones
//       if (typeParam === "withdrawal") {
//         params.status = "transferred"
//       }

//       // Build query string
//       const queryString = Object.entries(params)
//         .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
//         .join("&")

//       response = await getData(`${SEARCH}?${queryString}`)

//       // Extract data based on type
//       if (typeParam === "gamehistory") {
//         dataList = response?.history || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "tasks") {
//         dataList = response?.tasks || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "ads") {
//         dataList = response?.ads || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "dailyreward") {
//         dataList = response?.rewards || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "referral") {
//         dataList = response?.data || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || response?.totalReferralsCount || 0)
//       } else if (typeParam === "withdrawal") {
//         dataList = response?.withdrawals || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       }

//       // Sort the data by createdAt (newest first)
//       const sortedData = sortDataByDate(dataList)
//       setUsers(sortedData)
//       setFilteredUsers(sortedData)
//     } catch (error) {
//       console.error(`Error fetching ${historyType} data:`, error)
//       setError({
//         type: historyType,
//         message: `Unable to fetch ${historyType} data.`,
//         details: error.message || "Unknown error",
//       })
//       setUsers([])
//       setFilteredUsers([])
//       setTotalPages(1)
//       setTotalCount(0)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchData({ resetPage: true })
//     // Reset search and date filters when history type changes
//     setSearchTerm("")
//     setFromDate("")
//     setToDate("")
//     // Reset current page to 1 when history type changes
//     setCurrentPage(1)
//   }, [historyType])

//   // Only fetch data when historyType or currentPage changes
//   useEffect(() => {
//     fetchData()
//   }, [historyType, currentPage])

//   // Update handleSearch to call fetchData with current filters
//   const handleSearch = () => {
//     setCurrentPage(1)
//     fetchData()
//   }

//   // Update handleFromDateChange and handleToDateChange to only set state
//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value)
//   }

//   const handleToDateChange = (e) => {
//     setToDate(e.target.value)
//   }

//   const handleRetry = () => {
//     fetchData()
//   }

//   const handleReset = () => {
//     setSearchTerm("")
//     setFromDate("")
//     setToDate("")
//     setCurrentPage(1)
//     fetchData()
//   }

//   const currentUsers = filteredUsers // Use backend-paginated data directly

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   // Fixed function to handle userId click - navigate to user details page
//   const handleUserIdClick = async (userId) => {
//     if (!userId) {
//       alert("User ID is required")
//       return
//     }

//     try {
//       // Store the userId in sessionStorage for the user details page
//       sessionStorage.setItem("selectedUserId", userId)

//       // Navigate directly to the user details page with the userId
//       navigate(`/user-game-details/${encodeURIComponent(userId)}`)
//     } catch (error) {
//       console.error("Error navigating to user details:", error)
//       alert("Error navigating to user details. Please try again.")
//     }
//   }

//   // FIXED: Download Excel function - now fetches ALL data
//   const downloadExcel = async () => {
//     setIsExporting(true)

//     try {
//       // Fetch ALL data for export (not just paginated data)
//       const allData = await fetchAllDataForExport()

//       if (!allData || allData.length === 0) {
//         alert("No data to export")
//         return
//       }

//       let formattedData = []

//       if (historyType === "game") {
//         formattedData = allData.map((user, index) => ({
//           SNo: index + 1,
//           UserId: user.userId || "N/A",
//           UserName: user.username || "N/A",
//           GameTitle: user.gameTitle || "N/A",
//           CreatedAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A",
//           UpdatedAt: user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A",
//           InitialBalance: user.initialbalance || 0,
//           BetAmount: user.betAmount || 0,
//           Prize: user.winAmount || 0,
//           FinalBalance: user.finalbalance || 0,
//           PlayedStatus: user.playedStatus || "N/A",
//         }))
//       } else if (historyType === "task") {
//         formattedData = allData.map((task, index) => ({
//           SNo: index + 1,
//           UserId: task.userId || "N/A",
//           UserName: task.username || "N/A",
//           Initiated: task.CompletionTime ? new Date(task.CompletionTime).toLocaleString() : "N/A",
//           InitialBalance: task.InitialBalance || 0,
//           RewardAmount: task.Rewardpoints || 0,
//           FinalBalance: task.FinalBalance || 0,
//           Status: task.Status || "Completed",
//         }))
//       } else if (historyType === "ads") {
//         formattedData = allData.map((ad, index) => ({
//           SNo: index + 1,
//           UserId: ad.userId || "N/A",
//           UserName: ad.username || "N/A",
//           Initiated: ad.CompletionTime ? new Date(ad.CompletionTime).toLocaleString() : "N/A",
//           InitialBalance: ad.InitialBalance || 0,
//           RewardPoints: ad.Rewardpoints || 0,
//           FinalBalance: ad.FinalBalance || 0,
//         }))
//       } else if (historyType === "dailyReward") {
//         formattedData = allData.map((claim, index) => ({
//           SNo: index + 1,
//           UserId: claim.userId || "N/A",
//           UserName: claim.username || "N/A",
//           Initiated: claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A",
//           InitialBalance: claim.initialBalance || 0,
//           RewardPoints: claim.rewardPoints || 0,
//           FinalBalance: claim.finalBalance || 0,
//           Status: claim.Status || "Claimed",
//         }))
//       } else if (historyType === "referral") {
//         formattedData = allData.map((referral, index) => ({
//           SNo: index + 1,
//           ReferringUserId: referral.referringUser?._id || "N/A",
//           ReferringUserName: referral.referringUser?.username || "N/A",
//           ReferredUserId: referral.referredUser?._id || "N/A",
//           ReferredUserName: referral.referredUser?.username || "N/A",
//           Initiated: referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A",
//           InitialBalance: referral.initialBalance || 0,
//           ReferralAmount: referral.referralamount || 0,
//           FinalBalance: referral.finalBalance || 0,
//         }))
//       } else if (historyType === "withdrawal") {
//         formattedData = allData.map((withdrawal, index) => ({
//           SNo: index + 1,
//           UserId: withdrawal.userId || "N/A",
//           UserName: withdrawal.username || "N/A",
//           Initiated: withdrawal.createdAt ? new Date(withdrawal.createdAt).toLocaleString() : "N/A",
//           Amount: withdrawal.withdrawalAmount || withdrawal.amount || 0,
//           USDT_Amount: withdrawal.USDT_Amount || 0,
//           Status: "Transferred",
//         }))
//       }

//       const ws = XLSX.utils.json_to_sheet(formattedData)
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, `${historyType}History`)

//       const fileName = `${historyType}_history_${new Date().toISOString().split("T")[0]}.xlsx`
//       XLSX.writeFile(wb, fileName)

//       // Show success message with record count
//       // alert(`Successfully exported ${formattedData.length} records to Excel!`)
//     } catch (error) {
//       console.error("Error exporting to Excel:", error)
//       alert("Error exporting data to Excel. Please try again.")
//     } finally {
//       setIsExporting(false)
//     }
//   }

//   // Render different table headers and rows based on history type
//   const renderTableHeaders = () => {
//     if (historyType === "game") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Game Title</th>
//           <th>CreatedAt</th>
//           <th>UpdatedAt</th>
//           <th>Initial Balance</th>
//           <th>Bet Amount</th>
//           <th>Prize</th>
//           <th>Final Balance</th>
//           <th>Played Status</th>
//         </tr>
//       )
//     } else if (historyType === "task") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Initiated</th>
//           <th>Initial Balance</th>
//           <th>Reward Amount</th>
//           <th>Final Balance</th>
//           <th>Status</th>
//         </tr>
//       )
//     } else if (historyType === "ads") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Initiated</th>
//           <th>Initial Balance</th>
//           <th>Reward Points</th>
//           <th>Final Balance</th>
//         </tr>
//       )
//     } else if (historyType === "dailyReward") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Initiated</th>
//           <th>Initial Balance</th>
//           <th>Reward Amount</th>
//           <th>Final Balance</th>
//           <th>Status</th>
//         </tr>
//       )
//     } else if (historyType === "referral") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>Referring User ID</th>
//           <th>Referring User Name</th>
//           <th>Referred User ID</th>
//           <th>Referred User Name</th>
//           <th>Initiated</th>
//           <th>Initial Balance</th>
//           <th>Referral Amount</th>
//           <th>Final Balance</th>
//         </tr>
//       )
//     } else if (historyType === "withdrawal") {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Initiated</th>
//           <th>Amount</th>
//           <th>USDT_Amount</th>
//           <th>Status</th>
//         </tr>
//       )
//     } else {
//       return (
//         <tr>
//           <th>S.No</th>
//           <th>User ID</th>
//           <th>User Name</th>
//           <th>Type</th>
//           <th>Details</th>
//           <th>Date</th>
//         </tr>
//       )
//     }
//   }

//   const renderTableRows = () => {
//     if (currentUsers.length === 0) {
//       const colSpan =
//         historyType === "game"
//           ? 10
//           : historyType === "task"
//             ? 7
//             : historyType === "ads"
//               ? 6
//               : historyType === "dailyReward"
//                 ? 7
//                 : historyType === "referral"
//                   ? 7
//                   : historyType === "withdrawal"
//                     ? 6
//                     : 5
//       return (
//         <tr>
//           <td colSpan={colSpan} className="text-center text-muted py-4">
//             <h6>No {historyType} history available</h6>
//           </td>
//         </tr>
//       )
//     }

//     if (historyType === "game") {
//       return currentUsers.map((user, index) => (
//         <tr key={user._id || user.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(user.userId || user._id)}
//             >
//               {user.userId || user._id || "N/A"}
//             </span>
//           </td>
//           <td>{user.username || "N/A"}</td>
//           <td>{user.gameTitle || "N/A"}</td>
//           <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
//           <td>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}</td>
//           <td>{user.initialbalance || 0}</td>
//           <td>{user.betAmount || 0}</td>
//           <td>{user.winAmount || 0}</td>
//           <td>{user.finalbalance || 0}</td>
//           <td>{user.playedStatus || "N/A"}</td>
//         </tr>
//       ))
//     } else if (historyType === "task") {
//       return currentUsers.map((task, index) => (
//         <tr key={task._id || task.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(task.userId || task._id)}
//             >
//               {task.userId || task._id || "N/A"}
//             </span>
//           </td>
//           <td>{task.username || "N/A"}</td>
//           <td>{task.CompletionTime ? new Date(task.CompletionTime).toLocaleString() : "N/A"}</td>
//           <td>{task.InitialBalance || 0}</td>
//           <td>{task.Rewardpoints || 0}</td>
//           <td>{task.FinalBalance || 0}</td>
//           <td>{task.Status || "Completed"}</td>
//         </tr>
//       ))
//     } else if (historyType === "ads") {
//       return currentUsers.map((ad, index) => (
//         <tr key={ad._id || ad.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(ad.userId || ad._id)}
//             >
//               {ad.userId || ad._id || "N/A"}
//             </span>
//           </td>
//           <td>{ad.username || "N/A"}</td>
//           <td>{ad.CompletionTime ? new Date(ad.CompletionTime).toLocaleString() : "N/A"}</td>
//           <td>{ad.InitialBalance || 0}</td>
//           <td>{ad.Rewardpoints || 0}</td>
//           <td>{ad.FinalBalance || 0}</td>
//         </tr>
//       ))
//     } else if (historyType === "dailyReward") {
//       return currentUsers.map((claim, index) => (
//         <tr key={claim._id || claim.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(claim.userId || claim._id)}
//             >
//               {claim.userId || claim._id || "N/A"}
//             </span>
//           </td>
//           <td>{claim.username || "N/A"}</td>
//           <td>{claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A"}</td>
//           <td>{claim.initialBalance || 0}</td>
//           <td>{claim.rewardPoints || 0}</td>
//           <td>{claim.finalBalance || 0}</td>
//           <td>{claim.Status || "Claimed"}</td>
//         </tr>
//       ))
//     } else if (historyType === "referral") {
//       return currentUsers.map((referral, index) => (
//         <tr key={referral._id || referral.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(referral.referringUser?._id)}
//             >
//               {referral.referringUser?._id || "N/A"}
//             </span>
//           </td>
//           <td>
//             <span>{referral.referringUser?.username || "N/A"}</span>
//           </td>
//           <td>
//             <span>{referral.referredUser?._id || "N/A"}</span>
//           </td>
//            <td>
//             <span>{referral.referredUser?.username || "N/A"}</span>
//           </td>
//           <td>{referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A"}</td>
//           <td>{referral.initialBalance || 0}</td>
//           <td>{referral.referralamount || 0}</td>
//           <td>{referral.finalBalance || 0}</td>
//         </tr>
//       ))
//     } else if (historyType === "withdrawal") {
//       return currentUsers.map((withdrawal, index) => (
//         <tr key={withdrawal._id || withdrawal.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(withdrawal.userId || withdrawal._id)}
//             >
//               {withdrawal.userId || withdrawal._id || "N/A"}
//             </span>
//           </td>
//           <td>{withdrawal.username || "N/A"}</td>
//           <td>{withdrawal.createdAt ? new Date(withdrawal.createdAt).toLocaleString() : "N/A"}</td>
//           <td>{withdrawal.withdrawalAmount || withdrawal.amount || 0}</td>
//           <td>{withdrawal.USDT_Amount || 0}</td>
//           <td>
//             <span className="badge bg-success">Transferred</span>
//           </td>
//         </tr>
//       ))
//     } else {
//       return currentUsers.map((item, index) => (
//         <tr key={item._id || item.id || index} className="table-light">
//           <td className="fw-bold">{(currentPage - 1) * usersPerPage + index + 1}</td>
//           <td>
//             <span
//               className="text-primary"
//               style={{ cursor: "pointer", textDecoration: "underline" }}
//               onClick={() => handleUserIdClick(item.userId || item._id)}
//             >
//               {item.userId || item._id || "N/A"}
//             </span>
//           </td>
//           <td>{historyType}</td>
//           <td>{"Details not available"}</td>
//           <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}</td>
//         </tr>
//       ))
//     }
//   }

//   const getSearchPlaceholder = () => {
//     switch (historyType) {
//       case "game":
//         return "Search by User ID"
//       case "task":
//         return "Search by User ID"
//       case "ads":
//         return "Search by User ID"
//       case "dailyReward":
//         return "Search by User ID"
//       case "referral":
//         return "Search by Referring User ID"
//       case "withdrawal":
//         return "Search by User ID"
//       default:
//         return "Search by User ID"
//     }
//   }

//   return (
//     <CCard className="mb-4 shadow-lg rounded">
//       <CCardHeader
//         style={{
//           backgroundColor: "#00B5E2",
//           color: "white",
//         }}
//         className="text-center"
//       >
//         <h5 className="fw-bold">
//           {historyType.charAt(0).toUpperCase() + historyType.slice(1)}
//           {historyType === "withdrawal" ? " (Transferred)" : ""} History
//         </h5>
//       </CCardHeader>
//       <CCardBody>
//         <div className="container mb-4">
//           <div className="d-flex flex-wrap gap-3 align-items-end">
//             <div style={{ flex: "1 1 200px" }}>
//               <label className="d-block mb-2">Search</label>
//               <CFormInput
//                 type="text"
//                 placeholder={getSearchPlaceholder()}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "4px",
//                   height: "40px",
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 200px" }}>
//               <label className="d-block mb-2">From</label>
//               <CFormInput
//                 type="date"
//                 value={fromDate}
//                 onChange={handleFromDateChange}
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "4px",
//                   height: "40px",
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 200px" }}>
//               <label className="d-block mb-2">To</label>
//               <CFormInput
//                 type="date"
//                 value={toDate}
//                 onChange={handleToDateChange}
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "4px",
//                   height: "40px",
//                 }}
//               />
//             </div>
//             <div style={{ flex: "1 1 200px" }}>
//               <label className="d-block mb-2">History Type</label>
//               <CFormSelect
//                 value={historyType}
//                 onChange={(e) => setHistoryType(e.target.value)}
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "4px",
//                   height: "40px",
//                 }}
//               >
//                 {historyTypeOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </CFormSelect>
//             </div>
//             <div style={{ flex: "1 1 200px" }}>
//               <div className="d-flex gap-2">
//                 <CButton
//                   style={{
//                     backgroundColor: "#00B5E2",
//                     borderColor: "#00B5E2",
//                     color: "white",
//                     height: "40px",
//                   }}
//                   onClick={handleSearch}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Loading..." : "Search"}
//                 </CButton>
//                 <CButton
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     borderColor: "#dee2e6",
//                     color: "#333",
//                     height: "40px",
//                   }}
//                   onClick={handleReset}
//                   disabled={isLoading}
//                 >
//                   Reset
//                 </CButton>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <CAlert color="danger" className="d-flex align-items-center justify-content-between mb-4">
//             <div>
//               <strong>Error:</strong> {error.message}
//               {error.details && <div className="mt-1 small">{error.details}</div>}
//             </div>
//             <CButton color="danger" variant="outline" onClick={handleRetry}>
//               Retry
//             </CButton>
//           </CAlert>
//         )}

//         <div className="container">
//           <div className="d-flex justify-content-end mb-3">
//             <CButton
//               style={{
//                 backgroundColor: "#00B5E2",
//                 borderColor: "#00B5E2",
//                 color: "white",
//               }}
//               onClick={downloadExcel}
//               disabled={filteredUsers.length === 0 || isLoading || isExporting}
//             >
//               {isExporting ? (
//                 <>
//                   <div className="spinner-border spinner-border-sm me-2" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   EXPORTING...
//                 </>
//               ) : (
//                 "EXPORT AS EXCEL"
//               )}
//             </CButton>
//           </div>
//         </div>

//         <CRow>
//           <div className="container">
//             {isLoading ? (
//               <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-2">Loading {historyType} data...</p>
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover text-center align-middle">
//                   <thead style={{ backgroundColor: "#00B5E2", color: "black" }}>{renderTableHeaders()}</thead>
//                   <tbody>{renderTableRows()}</tbody>
//                 </table>
//               </div>
//             )}

//             <div className="d-flex justify-content-center mt-3">
//               <nav aria-label="Page navigation">
//                 <div className="d-flex align-items-center gap-1 p-2 bg-white rounded shadow-sm border">
//                   {/* Previous Button */}
//                   <button
//                     className={`btn d-flex align-items-center justify-content-center ${
//                       currentPage === 1 ? "text-muted border-0 bg-light" : "text-white border-0"
//                     }`}
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       backgroundColor: currentPage === 1 ? "#f8f9fa" : "#00BFFF",
//                       cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                     }}
//                     disabled={currentPage === 1 || isLoading}
//                     onClick={prevPage}
//                   >
//                     &#8249;
//                   </button>

//                   {/* Page Numbers */}
//                   {(() => {
//                     // Use backend totalPages
//                     const pages = []
//                     if (totalPages <= 7) {
//                       for (let i = 1; i <= totalPages; i++) {
//                         pages.push(
//                           <button
//                             key={i}
//                             className={`btn d-flex align-items-center justify-content-center border-0 ${
//                               currentPage === i ? "text-white" : "text-dark bg-light hover-bg-gray"
//                             }`}
//                             style={{
//                               width: "40px",
//                               height: "40px",
//                               backgroundColor: currentPage === i ? "#00BFFF" : "#f8f9fa",
//                               fontWeight: currentPage === i ? "bold" : "normal",
//                             }}
//                             onClick={() => setCurrentPage(i)}
//                           >
//                             {i}
//                           </button>,
//                         )
//                       }
//                     } else {
//                       // Complex pagination logic for many pages
//                       if (currentPage <= 3) {
//                         // Show first 3 pages, ellipsis, last page
//                         for (let i = 1; i <= 3; i++) {
//                           pages.push(
//                             <button
//                               key={i}
//                               className={`btn d-flex align-items-center justify-content-center border-0 ${
//                                 currentPage === i ? "text-white" : "text-dark bg-light hover-bg-gray"
//                               }`}
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: currentPage === i ? "#00BFFF" : "#f8f9fa",
//                                 fontWeight: currentPage === i ? "bold" : "normal",
//                               }}
//                               onClick={() => setCurrentPage(i)}
//                             >
//                               {i}
//                             </button>,
//                           )
//                         }
//                         if (totalPages > 4) {
//                           pages.push(
//                             <span key="ellipsis1" className="d-flex align-items-center px-2 text-muted">
//                               ...
//                             </span>,
//                           )
//                           pages.push(
//                             <button
//                               key={totalPages}
//                               className="btn d-flex align-items-center justify-content-center border-0 text-dark bg-light hover-bg-gray"
//                               style={{ width: "40px", height: "40px" }}
//                               onClick={() => setCurrentPage(totalPages)}
//                             >
//                               {totalPages}
//                             </button>,
//                           )
//                         }
//                       } else if (currentPage >= totalPages - 2) {
//                         // Show first page, ellipsis, last 3 pages
//                         pages.push(
//                           <button
//                             key={1}
//                             className="btn d-flex align-items-center justify-content-center border-0 text-dark bg-light hover-bg-gray"
//                             style={{ width: "40px", height: "40px" }}
//                             onClick={() => setCurrentPage(1)}
//                           >
//                             1
//                           </button>,
//                         )
//                         pages.push(
//                           <span key="ellipsis2" className="d-flex align-items-center px-2 text-muted">
//                             ...
//                           </span>,
//                         )
//                         for (let i = totalPages - 2; i <= totalPages; i++) {
//                           pages.push(
//                             <button
//                               key={i}
//                               className={`btn d-flex align-items-center justify-content-center border-0 ${
//                                 currentPage === i ? "text-white" : "text-dark bg-light hover-bg-gray"
//                               }`}
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: currentPage === i ? "#00BFFF" : "#f8f9fa",
//                                 fontWeight: currentPage === i ? "bold" : "normal",
//                               }}
//                               onClick={() => setCurrentPage(i)}
//                             >
//                               {i}
//                             </button>,
//                           )
//                         }
//                       } else {
//                         // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
//                         pages.push(
//                           <button
//                             key={1}
//                             className="btn d-flex align-items-center justify-content-center border-0 text-dark bg-light hover-bg-gray"
//                             style={{ width: "40px", height: "40px" }}
//                             onClick={() => setCurrentPage(1)}
//                           >
//                             1
//                           </button>,
//                         )
//                         pages.push(
//                           <span key="ellipsis3" className="d-flex align-items-center px-2 text-muted">
//                             ...
//                           </span>,
//                         )
//                         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//                           pages.push(
//                             <button
//                               key={i}
//                               className={`btn d-flex align-items-center justify-content-center border-0 ${
//                                 currentPage === i ? "text-white" : "text-dark bg-light hover-bg-gray"
//                               }`}
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: currentPage === i ? "#00BFFF" : "#f8f9fa",
//                                 fontWeight: currentPage === i ? "bold" : "normal",
//                               }}
//                               onClick={() => setCurrentPage(i)}
//                             >
//                               {i}
//                             </button>,
//                           )
//                         }
//                         pages.push(
//                           <span key="ellipsis4" className="d-flex align-items-center px-2 text-muted">
//                             ...
//                           </span>,
//                         )
//                         pages.push(
//                           <button
//                             key={totalPages}
//                             className="btn d-flex align-items-center justify-content-center border-0 text-dark bg-light hover-bg-gray"
//                             style={{ width: "40px", height: "40px" }}
//                             onClick={() => setCurrentPage(totalPages)}
//                           >
//                             {totalPages}
//                           </button>,
//                         )
//                       }
//                     }

//                     return pages
//                   })()}

//                   {/* Next Button */}
//                   <button
//                     className={`btn d-flex align-items-center justify-content-center ${
//                       currentPage >= totalPages ? "text-muted border-0 bg-light" : "text-white border-0"
//                     }`}
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                       backgroundColor: currentPage >= totalPages ? "#f8f9fa" : "#00BFFF",
//                       cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
//                     }}
//                     disabled={currentPage >= totalPages || isLoading}
//                     onClick={nextPage}
//                   >
//                     &#8250;
//                   </button>
//                 </div>
//               </nav>
//             </div>
//           </div>
//         </CRow>
//       </CCardBody>
//     </CCard>
//   )
// }

// export default Gamehistory
// ==========================================================================
// "use client"

// import { useState, useEffect } from "react"
// import { CRow, CCard, CCardHeader, CCardBody, CButton, CFormInput, CFormSelect, CAlert } from "@coreui/react"
// import { getData } from "../../../apiConfigs/apiCalls"
// import { SEARCH } from "../../../apiConfigs/endpoints"
// import { useNavigate } from "react-router-dom"
// import * as XLSX from "xlsx"

// const Gamehistory = () => {
//   const navigate = useNavigate()
//   const [users, setUsers] = useState([])
//   const [filteredUsers, setFilteredUsers] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [fromDate, setFromDate] = useState("")
//   const [toDate, setToDate] = useState("")
//   const [historyType, setHistoryType] = useState("game")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [totalPages, setTotalPages] = useState(1)
//   const [totalCount, setTotalCount] = useState(0)
//   const [isExporting, setIsExporting] = useState(false)
//   const usersPerPage = 10

//   const historyTypeOptions = [
//     { value: "game", label: "Game" },
//     { value: "task", label: "Task" },
//     { value: "ads", label: "Ads" },
//     { value: "dailyReward", label: "Daily Reward" },
//     { value: "referral", label: "Referral" },
//     // { value: "withdrawal", label: "Withdrawal" },
//   ]

//   const sortDataByDate = (data) => {
//     return data.sort((a, b) => {
//       const dateA = new Date(
//         a.createdAt || a.CompletionTime || a.completionTime || a.claimedAt || a.CompletedAt || a.initiated || 0,
//       )
//       const dateB = new Date(
//         b.createdAt || b.CompletionTime || b.completionTime || b.claimedAt || b.CompletedAt || b.initiated || 0,
//       )
//       return dateB - dateA
//     })
//   }

//   const fetchAllDataForExport = async () => {
//     try {
//       let typeParam = historyType
//       if (typeParam === "dailyReward") typeParam = "dailyreward"
//       if (typeParam === "game") typeParam = "gamehistory"
//       if (typeParam === "task") typeParam = "tasks"

//       const params = {
//         type: typeParam,
//         limit: 10000,
//       }
//       if (fromDate) params.fromDate = fromDate
//       if (toDate) params.toDate = toDate
//       if (searchTerm) {
//         params.userId = searchTerm
//       }

//       if (typeParam === "withdrawal") {
//         params.status = "transferred"
//       }

//       const queryString = Object.entries(params)
//         .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
//         .join("&")

//       const response = await getData(`${SEARCH}?${queryString}`)

//       let dataList = []
//       if (typeParam === "gamehistory") {
//         dataList = response?.history || []
//       } else if (typeParam === "tasks") {
//         dataList = response?.tasks || []
//       } else if (typeParam === "ads") {
//         dataList = response?.ads || []
//       } else if (typeParam === "dailyreward") {
//         dataList = response?.rewards || []
//       } else if (typeParam === "referral") {
//         dataList = response?.data || []
//       } else if (typeParam === "withdrawal") {
//         dataList = response?.withdrawals || []
//       }

//       return sortDataByDate(dataList)
//     } catch (error) {
//       console.error("Error fetching all data for export:", error)
//       throw error
//     }
//   }

//   const fetchData = async (paramsOverride = {}) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       let response
//       let dataList = []
//       let typeParam = historyType
//       if (typeParam === "dailyReward") typeParam = "dailyreward"
//       if (typeParam === "game") typeParam = "gamehistory"
//       if (typeParam === "task") typeParam = "tasks"

//       const params = {
//         type: typeParam,
//         page: paramsOverride.resetPage ? 1 : currentPage,
//         limit: usersPerPage,
//         ...paramsOverride,
//       }
//       if (fromDate) params.fromDate = fromDate
//       if (toDate) params.toDate = toDate
//       if (searchTerm) {
//         params.userId = searchTerm
//       }

//       if (typeParam === "withdrawal") {
//         params.status = "transferred"
//       }

//       const queryString = Object.entries(params)
//         .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
//         .join("&")

//       response = await getData(`${SEARCH}?${queryString}`)

//       if (typeParam === "gamehistory") {
//         dataList = response?.history || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "tasks") {
//         dataList = response?.tasks || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "ads") {
//         dataList = response?.ads || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "dailyreward") {
//         dataList = response?.rewards || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       } else if (typeParam === "referral") {
//         dataList = response?.data || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || response?.totalReferralsCount || 0)
//       } else if (typeParam === "withdrawal") {
//         dataList = response?.withdrawals || []
//         setTotalPages(response?.totalPages || 1)
//         setTotalCount(response?.length || 0)
//       }

//       const sortedData = sortDataByDate(dataList)
//       setUsers(sortedData)
//       setFilteredUsers(sortedData)
//     } catch (error) {
//       console.error(`Error fetching ${historyType} data:`, error)
//       setError({
//         type: historyType,
//         message: `Unable to fetch ${historyType} data.`,
//         details: error.message || "Unknown error",
//       })
//       setUsers([])
//       setFilteredUsers([])
//       setTotalPages(1)
//       setTotalCount(0)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchData({ resetPage: true })
//     setSearchTerm("")
//     setFromDate("")
//     setToDate("")
//     setCurrentPage(1)
//   }, [historyType])

//   useEffect(() => {
//     fetchData()
//   }, [historyType, currentPage])

//   const handleSearch = () => {
//     setCurrentPage(1)
//     fetchData()
//   }

//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value)
//   }

//   const handleToDateChange = (e) => {
//     setToDate(e.target.value)
//   }

//   const handleRetry = () => {
//     fetchData()
//   }

//   const handleReset = () => {
//     setSearchTerm("")
//     setFromDate("")
//     setToDate("")
//     setCurrentPage(1)
//     fetchData()
//   }

//   const currentUsers = filteredUsers

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const handleUserIdClick = async (userId) => {
//     if (!userId) {
//       alert("User ID is required")
//       return
//     }

//     try {
//       sessionStorage.setItem("selectedUserId", userId)
//       navigate(`/user-game-details/${encodeURIComponent(userId)}`)
//     } catch (error) {
//       console.error("Error navigating to user details:", error)
//       alert("Error navigating to user details. Please try again.")
//     }
//   }

//   const downloadExcel = async () => {
//     setIsExporting(true)

//     try {
//       const allData = await fetchAllDataForExport()

//       if (!allData || allData.length === 0) {
//         alert("No data to export")
//         return
//       }

//       let formattedData = []

//       if (historyType === "game") {
//         formattedData = allData.map((user, index) => ({
//           SNo: index + 1,
//           UserId: user.userId || "N/A",
//           UserName: user.userName || "N/A",
//           GameTitle: user.gameTitle || "N/A",
//           CreatedAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A",
//           UpdatedAt: user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A",
//           InitialBalance: user.initialBalance || 0,
//           BetAmount: user.betAmount || 0,
//           Prize: user.winAmount || 0,
//           FinalBalance: user.finalBalance || 0,
//           PlayedStatus: user.playedStatus || "N/A",
//         }))
//       } else if (historyType === "task") {
//         formattedData = allData.map((task, index) => ({
//           SNo: index + 1,
//           UserId: task.userId || "N/A",
//           UserName: task.userName || "N/A",
//           Initiated: task.completionTime ? new Date(task.completionTime).toLocaleString() : "N/A",
//           InitialBalance: task.initialBalance || 0,
//           RewardAmount: task.rewardPoints || 0,
//           FinalBalance: task.finalBalance || 0,
//           Status: task.status || "Completed",
//         }))
//       } else if (historyType === "ads") {
//         formattedData = allData.map((ad, index) => ({
//           SNo: index + 1,
//           UserId: ad.userId || "N/A",
//           UserName: ad.userName || "N/A",
//           Initiated: ad.completionTime ? new Date(ad.completionTime).toLocaleString() : "N/A",
//           InitialBalance: ad.initialBalance || 0,
//           RewardPoints: ad.rewardPoints || 0,
//           FinalBalance: ad.finalBalance || 0,
//         }))
//       } else if (historyType === "dailyReward") {
//         formattedData = allData.map((claim, index) => ({
//           SNo: index + 1,
//           UserId: claim.userId || "N/A",
//           UserName: claim.userName || "N/A",
//           Initiated: claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A",
//           InitialBalance: claim.initialBalance || 0,
//           RewardPoints: claim.rewardPoints || 0,
//           FinalBalance: claim.finalBalance || 0,
//           Status: claim.Status || "Claimed",
//         }))
//       } else if (historyType === "referral") {
//         formattedData = allData.map((referral, index) => ({
//           SNo: index + 1,
//           ReferringUserId: referral.referringUser?._id || "N/A",
//           ReferringUserName: referral.referringUser?.userName || "N/A",
//           ReferredUserId: referral.referredUser?._id || "N/A",
//           ReferredUserName: referral.referredUser?.userName || "N/A",
//           Initiated: referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A",
//           InitialBalance: referral.initialBalance || 0,
//           ReferralAmount: referral.referralAmount || 0,
//           FinalBalance: referral.finalBalance || 0,
//         }))
//       } else if (historyType === "withdrawal") {
//         formattedData = allData.map((withdrawal, index) => ({
//           SNo: index + 1,
//           UserId: withdrawal.userId || "N/A",
//           UserName: withdrawal.username || "N/A",
//           Initiated: withdrawal.createdAt ? new Date(withdrawal.createdAt).toLocaleString() : "N/A",
//           Amount: withdrawal.withdrawalAmount || withdrawal.amount || 0,
//           USDT_Amount: withdrawal.USDT_Amount || 0,
//           Status: "Transferred",
//         }))
//       }

//       const ws = XLSX.utils.json_to_sheet(formattedData)
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, `${historyType}History`)

//       const fileName = `${historyType}_history_${new Date().toISOString().split("T")[0]}.xlsx`
//       XLSX.writeFile(wb, fileName)
//     } catch (error) {
//       console.error("Error exporting to Excel:", error)
//       alert("Error exporting data to Excel. Please try again.")
//     } finally {
//       setIsExporting(false)
//     }
//   }

//   const renderTableHeaders = () => {
//     if (historyType === "game") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             GAME TITLE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             CREATED AT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             UPDATED AT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             INITIAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             BET AMOUNT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>PRIZE</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             FINAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             PLAYED STATUS
//           </th>
//         </tr>
//       )
//     } else if (historyType === "task") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>INITIATED</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             INITIAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REWARD AMOUNT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             FINAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>STATUS</th>
//         </tr>
//       )
//     } else if (historyType === "ads") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>INITIATED</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             INITIAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REWARD POINTS
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             FINAL BALANCE
//           </th>
//         </tr>
//       )
//     } else if (historyType === "dailyReward") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>INITIATED</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             INITIAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REWARD AMOUNT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             FINAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>STATUS</th>
//         </tr>
//       )
//     } else if (historyType === "referral") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REFERRING USER ID
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REFERRING USER NAME
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REFERRED USER ID
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REFERRED USER NAME
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>INITIATED</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             INITIAL BALANCE
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             REFERRAL AMOUNT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             FINAL BALANCE
//           </th>
//         </tr>
//       )
//     } else if (historyType === "withdrawal") {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>INITIATED</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>AMOUNT</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>
//             USDT AMOUNT
//           </th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>STATUS</th>
//         </tr>
//       )
//     } else {
//       return (
//         <tr>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>S.NO</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER ID</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>USER NAME</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>TYPE</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>DETAILS</th>
//           <th style={{ color: "white", fontWeight: "bold", backgroundColor: "#2d2d2d", padding: "12px" }}>DATE</th>
//         </tr>
//       )
//     }
//   }

//   const renderTableRows = () => {
//     if (currentUsers.length === 0) {
//       const colSpan =
//         historyType === "game"
//           ? 11
//           : historyType === "task"
//             ? 8
//             : historyType === "ads"
//               ? 7
//               : historyType === "dailyReward"
//                 ? 8
//                 : historyType === "referral"
//                   ? 9
//                   : historyType === "withdrawal"
//                     ? 7
//                     : 6
//       return (
//         <tr>
//           <td
//             colSpan={colSpan}
//             className="text-center py-4"
//             style={{ backgroundColor: "#1a1a1a", color: "#888", padding: "20px" }}
//           >
//             <h6>No {historyType} history available</h6>
//           </td>
//         </tr>
//       )
//     }

//     if (historyType === "game") {
//       return currentUsers.map((user, index) => (
//         <tr
//           key={user._id || user.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(user.userId || user._id)}
//             >
//               {user.userId || user._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{user.userName || "N/A"}</td>
//           <td style={{ padding: "12px" }}>{user.gameTitle || "N/A"}</td>
//           <td style={{ padding: "12px" }}>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
//           <td style={{ padding: "12px" }}>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}</td>
//           <td style={{ padding: "12px" }}>{user.initialBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{user.betAmount || 0}</td>
//           <td style={{ padding: "12px" }}>{user.winAmount || 0}</td>
//           <td style={{ padding: "12px" }}>{user.finalBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{user.playedStatus || "N/A"}</td>
//         </tr>
//       ))
//     } else if (historyType === "task") {
//       return currentUsers.map((task, index) => (
//         <tr
//           key={task._id || task.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(task.userId || task._id)}
//             >
//               {task.userId || task._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{task.userName || "N/A"}</td>
//           <td style={{ padding: "12px" }}>
//             {task.completionTime ? new Date(task.completionTime).toLocaleString() : "N/A"}
//           </td>
//           <td style={{ padding: "12px" }}>{task.initialBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{task.rewardPoints || 0}</td>
//           <td style={{ padding: "12px" }}>{task.finalBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{task.status || "Completed"}</td>
//         </tr>
//       ))
//     } else if (historyType === "ads") {
//       return currentUsers.map((ad, index) => (
//         <tr
//           key={ad._id || ad.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(ad.userId || ad._id)}
//             >
//               {ad.userId || ad._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{ad.userName || "N/A"}</td>
//           <td style={{ padding: "12px" }}>
//             {ad.completionTime ? new Date(ad.completionTime).toLocaleString() : "N/A"}
//           </td>
//           <td style={{ padding: "12px" }}>{ad.initialBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{ad.rewardPoints || 0}</td>
//           <td style={{ padding: "12px" }}>{ad.finalBalance || 0}</td>
//         </tr>
//       ))
//     } else if (historyType === "dailyReward") {
//       return currentUsers.map((claim, index) => (
//         <tr
//           key={claim._id || claim.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(claim.userId || claim._id)}
//             >
//               {claim.userId || claim._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{claim.userName || "N/A"}</td>
//           <td style={{ padding: "12px" }}>{claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A"}</td>
//           <td style={{ padding: "12px" }}>{claim.initialBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{claim.rewardPoints || 0}</td>
//           <td style={{ padding: "12px" }}>{claim.finalBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{claim.status || "CLAIMED"}</td>
//         </tr>
//       ))
//     } else if (historyType === "referral") {
//       return currentUsers.map((referral, index) => (
//         <tr
//           key={referral._id || referral.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(referral.referringUser?._id)}
//             >
//               {referral.referringUser?._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span>{referral.referringUser?.userName || "N/A"}</span>
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span>{referral.referredUser?._id || "N/A"}</span>
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span>{referral.referredUser?.userName || "N/A"}</span>
//           </td>
//           <td style={{ padding: "12px" }}>
//             {referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A"}
//           </td>
//           <td style={{ padding: "12px" }}>{referral.initialBalance || 0}</td>
//           <td style={{ padding: "12px" }}>{referral.referralAmount || 0}</td>
//           <td style={{ padding: "12px" }}>{referral.finalBalance || 0}</td>
//         </tr>
//       ))
//     } else if (historyType === "withdrawal") {
//       return currentUsers.map((withdrawal, index) => (
//         <tr
//           key={withdrawal._id || withdrawal.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(withdrawal.userId || withdrawal._id)}
//             >
//               {withdrawal.userId || withdrawal._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{withdrawal.username || "N/A"}</td>
//           <td style={{ padding: "12px" }}>
//             {withdrawal.createdAt ? new Date(withdrawal.createdAt).toLocaleString() : "N/A"}
//           </td>
//           <td style={{ padding: "12px" }}>{withdrawal.withdrawalAmount || withdrawal.amount || 0}</td>
//           <td style={{ padding: "12px" }}>{withdrawal.USDT_Amount || 0}</td>
//           <td style={{ padding: "12px" }}>
//             <span
//               className="badge"
//               style={{
//                 backgroundColor: "#10b981",
//                 color: "white",
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//                 fontSize: "12px",
//               }}
//             >
//               TRANSFERRED
//             </span>
//           </td>
//         </tr>
//       ))
//     } else {
//       return currentUsers.map((item, index) => (
//         <tr
//           key={item._id || item.id || index}
//           style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
//           className="table-row-hover"
//         >
//           <td style={{ padding: "12px" }} className="fw-bold">
//             {(currentPage - 1) * usersPerPage + index + 1}
//           </td>
//           <td style={{ padding: "12px" }}>
//             <span
//               style={{
//                 cursor: "pointer",
//                 textDecoration: "underline",
//                 color: "#8b5cf6",
//                 fontWeight: "bold",
//               }}
//               onClick={() => handleUserIdClick(item.userId || item._id)}
//             >
//               {item.userId || item._id || "N/A"}
//             </span>
//           </td>
//           <td style={{ padding: "12px" }}>{item.username || "N/A"}</td>
//           <td style={{ padding: "12px" }}>{historyType}</td>
//           <td style={{ padding: "12px" }}>{"Details not available"}</td>
//           <td style={{ padding: "12px" }}>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}</td>
//         </tr>
//       ))
//     }
//   }

//   const getSearchPlaceholder = () => {
//     switch (historyType) {
//       case "game":
//         return "Search by User ID"
//       case "task":
//         return "Search by User ID"
//       case "ads":
//         return "Search by User ID"
//       case "dailyReward":
//         return "Search by User ID"
//       case "referral":
//         return "Search by Referring User ID"
//       case "withdrawal":
//         return "Search by User ID"
//       default:
//         return "Search by User ID"
//     }
//   }

//   return (
//     <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white", padding: "20px" }}>
//       <CCard style={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}>
//         <CCardHeader
//           style={{ backgroundColor: "#8b5cf6", color: "white", padding: "15px 20px" }}
//           className="text-center"
//         >
//           <h5 className="fw-bold">
//             {historyType.charAt(0).toUpperCase() + historyType.slice(1)}
//             {historyType === "withdrawal" ? " (Transferred)" : ""} History
//           </h5>
//         </CCardHeader>
//         <CCardBody style={{ backgroundColor: "#1a1a1a", color: "white", padding: "20px" }}>
//           <div className="container mb-4">
//             <div className="d-flex flex-wrap gap-3 align-items-end">
//               <div style={{ flex: "1 1 200px" }}>
//                 <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
//                   Search
//                 </label>
//                 <CFormInput
//                   type="text"
//                   placeholder={getSearchPlaceholder()}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   style={{
//                     backgroundColor: "#2d2d2d",
//                     borderColor: "#444",
//                     borderRadius: "4px",
//                     height: "40px",
//                     color: "white",
//                   }}
//                 />
//               </div>
//               <div style={{ flex: "1 1 200px" }}>
//                 <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
//                   From
//                 </label>
//                 <CFormInput
//                   type="date"
//                   value={fromDate}
//                   onChange={handleFromDateChange}
//                   style={{
//                     backgroundColor: "#2d2d2d",
//                     borderColor: "#444",
//                     borderRadius: "4px",
//                     height: "40px",
//                     color: "white",
//                   }}
//                 />
//               </div>
//               <div style={{ flex: "1 1 200px" }}>
//                 <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
//                   To
//                 </label>
//                 <CFormInput
//                   type="date"
//                   value={toDate}
//                   onChange={handleToDateChange}
//                   style={{
//                     backgroundColor: "#2d2d2d",
//                     borderColor: "#444",
//                     borderRadius: "4px",
//                     height: "40px",
//                     color: "white",
//                   }}
//                 />
//               </div>
//               <div style={{ flex: "1 1 200px" }}>
//                 <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
//                   History Type
//                 </label>
//                 <CFormSelect
//                   value={historyType}
//                   onChange={(e) => setHistoryType(e.target.value)}
//                   style={{
//                     backgroundColor: "#2d2d2d",
//                     borderColor: "#444",
//                     borderRadius: "4px",
//                     height: "40px",
//                     color: "white",
//                   }}
//                 >
//                   {historyTypeOptions.map((option) => (
//                     <option
//                       key={option.value}
//                       value={option.value}
//                       style={{ backgroundColor: "#2d2d2d", color: "white" }}
//                     >
//                       {option.label}
//                     </option>
//                   ))}
//                 </CFormSelect>
//               </div>
//               <div style={{ flex: "1 1 200px" }}>
//                 <div className="d-flex gap-2">
//                   <CButton
//                     style={{
//                       backgroundColor: "#8b5cf6",
//                       border: "none",
//                       borderRadius: "6px",
//                       height: "40px",
//                       color: "white",
//                       fontWeight: "bold",
//                       padding: "0 20px",
//                     }}
//                     onClick={handleSearch}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Loading..." : "Search"}
//                   </CButton>
//                   <CButton
//                     style={{
//                       backgroundColor: "#6b7280",
//                       border: "none",
//                       borderRadius: "6px",
//                       height: "40px",
//                       color: "white",
//                       padding: "0 20px",
//                     }}
//                     onClick={handleReset}
//                     disabled={isLoading}
//                   >
//                     Reset
//                   </CButton>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {error && (
//             <CAlert
//               className="d-flex align-items-center justify-content-between mb-4"
//               style={{
//                 backgroundColor: "rgba(239, 68, 68, 0.1)",
//                 border: "1px solid #ef4444",
//                 borderRadius: "8px",
//                 color: "white",
//                 padding: "15px",
//               }}
//             >
//               <div>
//                 <strong>Error:</strong> {error.message}
//                 {error.details && <div className="mt-1 small">{error.details}</div>}
//               </div>
//               <CButton
//                 style={{
//                   backgroundColor: "#ef4444",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                 }}
//                 onClick={handleRetry}
//               >
//                 Retry
//               </CButton>
//             </CAlert>
//           )}

//           <div className="container">
//             <div className="d-flex justify-content-end mb-3">
//               <CButton
//                 style={{
//                   backgroundColor: "#8b5cf6",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   fontWeight: "bold",
//                   padding: "10px 25px",
//                 }}
//                 onClick={downloadExcel}
//                 disabled={filteredUsers.length === 0 || isLoading || isExporting}
//               >
//                 {isExporting ? (
//                   <>
//                     <div className="spinner-border spinner-border-sm me-2" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                     EXPORTING...
//                   </>
//                 ) : (
//                   "EXPORT AS EXCEL"
//                 )}
//               </CButton>
//             </div>
//           </div>

//           <CRow>
//             <div className="container">
//               {isLoading ? (
//                 <div className="text-center py-5">
//                   <div className="spinner-border" style={{ color: "#8b5cf6" }} role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <p className="mt-2" style={{ color: "white" }}>
//                     Loading {historyType} data...
//                   </p>
//                 </div>
//               ) : (
//                 <div
//                   style={{
//                     backgroundColor: "#1a1a1a",
//                     borderRadius: "8px",
//                     border: "1px solid #333",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <table
//                     className="table text-center align-middle"
//                     style={{ marginBottom: 0, backgroundColor: "transparent" }}
//                   >
//                     <thead>{renderTableHeaders()}</thead>
//                     <tbody>{renderTableRows()}</tbody>
//                   </table>
//                 </div>
//               )}

//               <div className="d-flex justify-content-center mt-3">
//                 <nav aria-label="Page navigation">
//                   <div
//                     className="d-flex align-items-center gap-1 p-2"
//                     style={{ backgroundColor: "#2d2d2d", borderRadius: "8px", border: "1px solid #444" }}
//                   >
//                     {/* Previous Button */}
//                     <button
//                       className="btn d-flex align-items-center justify-content-center border-0"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: currentPage === 1 ? "#444" : "#8b5cf6",
//                         color: "#ffffff",
//                         fontWeight: "bold",
//                         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                         borderRadius: "6px",
//                       }}
//                       disabled={currentPage === 1 || isLoading}
//                       onClick={prevPage}
//                     >
//                       &#8249;
//                     </button>

//                     {/* Page Numbers */}
//                     {(() => {
//                       const pages = []
//                       if (totalPages <= 7) {
//                         for (let i = 1; i <= totalPages; i++) {
//                           pages.push(
//                             <button
//                               key={i}
//                               className="btn d-flex align-items-center justify-content-center border-0"
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
//                                 color: "#ffffff",
//                                 fontWeight: currentPage === i ? "bold" : "normal",
//                                 border: "1px solid #444",
//                                 borderRadius: "6px",
//                               }}
//                               onClick={() => setCurrentPage(i)}
//                             >
//                               {i}
//                             </button>,
//                           )
//                         }
//                       } else {
//                         if (currentPage <= 3) {
//                           for (let i = 1; i <= 3; i++) {
//                             pages.push(
//                               <button
//                                 key={i}
//                                 className="btn d-flex align-items-center justify-content-center border-0"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
//                                   color: "#ffffff",
//                                   fontWeight: currentPage === i ? "bold" : "normal",
//                                   border: "1px solid #444",
//                                   borderRadius: "6px",
//                                 }}
//                                 onClick={() => setCurrentPage(i)}
//                               >
//                                 {i}
//                               </button>,
//                             )
//                           }
//                           if (totalPages > 4) {
//                             pages.push(
//                               <span
//                                 key="ellipsis1"
//                                 className="d-flex align-items-center px-2"
//                                 style={{ color: "#888" }}
//                               >
//                                 ...
//                               </span>,
//                             )
//                             pages.push(
//                               <button
//                                 key={totalPages}
//                                 className="btn d-flex align-items-center justify-content-center border-0"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   backgroundColor: "#1a1a1a",
//                                   color: "#ffffff",
//                                   border: "1px solid #444",
//                                   borderRadius: "6px",
//                                 }}
//                                 onClick={() => setCurrentPage(totalPages)}
//                               >
//                                 {totalPages}
//                               </button>,
//                             )
//                           }
//                         } else if (currentPage >= totalPages - 2) {
//                           pages.push(
//                             <button
//                               key={1}
//                               className="btn d-flex align-items-center justify-content-center border-0"
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: "#1a1a1a",
//                                 color: "#ffffff",
//                                 border: "1px solid #444",
//                                 borderRadius: "6px",
//                               }}
//                               onClick={() => setCurrentPage(1)}
//                             >
//                               1
//                             </button>,
//                           )
//                           pages.push(
//                             <span key="ellipsis2" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
//                               ...
//                             </span>,
//                           )
//                           for (let i = totalPages - 2; i <= totalPages; i++) {
//                             pages.push(
//                               <button
//                                 key={i}
//                                 className="btn d-flex align-items-center justify-content-center border-0"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
//                                   color: "#ffffff",
//                                   fontWeight: currentPage === i ? "bold" : "normal",
//                                   border: "1px solid #444",
//                                   borderRadius: "6px",
//                                 }}
//                                 onClick={() => setCurrentPage(i)}
//                               >
//                                 {i}
//                               </button>,
//                             )
//                           }
//                         } else {
//                           pages.push(
//                             <button
//                               key={1}
//                               className="btn d-flex align-items-center justify-content-center border-0"
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: "#1a1a1a",
//                                 color: "#ffffff",
//                                 border: "1px solid #444",
//                                 borderRadius: "6px",
//                               }}
//                               onClick={() => setCurrentPage(1)}
//                             >
//                               1
//                             </button>,
//                           )
//                           pages.push(
//                             <span key="ellipsis3" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
//                               ...
//                             </span>,
//                           )
//                           for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//                             pages.push(
//                               <button
//                                 key={i}
//                                 className="btn d-flex align-items-center justify-content-center border-0"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
//                                   color: "#ffffff",
//                                   fontWeight: currentPage === i ? "bold" : "normal",
//                                   border: "1px solid #444",
//                                   borderRadius: "6px",
//                                 }}
//                                 onClick={() => setCurrentPage(i)}
//                               >
//                                 {i}
//                               </button>,
//                             )
//                           }
//                           pages.push(
//                             <span key="ellipsis4" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
//                               ...
//                             </span>,
//                           )
//                           pages.push(
//                             <button
//                               key={totalPages}
//                               className="btn d-flex align-items-center justify-content-center border-0"
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 backgroundColor: "#1a1a1a",
//                                 color: "#ffffff",
//                                 border: "1px solid #444",
//                                 borderRadius: "6px",
//                               }}
//                               onClick={() => setCurrentPage(totalPages)}
//                             >
//                               {totalPages}
//                             </button>,
//                           )
//                         }
//                       }

//                       return pages
//                     })()}

//                     {/* Next Button */}
//                     <button
//                       className="btn d-flex align-items-center justify-content-center border-0"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: currentPage >= totalPages ? "#444" : "#8b5cf6",
//                         color: "#ffffff",
//                         fontWeight: "bold",
//                         cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
//                         borderRadius: "6px",
//                       }}
//                       disabled={currentPage >= totalPages || isLoading}
//                       onClick={nextPage}
//                     >
//                       &#8250;
//                     </button>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </CRow>
//         </CCardBody>
//       </CCard>

//       <style jsx>{`
//         .table-row-hover:hover {
//           background-color: #2d2d2d !important;
//           transition: all 0.2s ease;
//         }
        
//         .form-select option {
//           background-color: #2d2d2d;
//           color: white;
//         }
        
//         input[type="date"]::-webkit-calendar-picker-indicator {
//           filter: invert(1);
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Gamehistory



"use client"

import { useState, useEffect } from "react"
import { CRow, CCard, CCardHeader, CCardBody, CButton, CFormInput, CFormSelect, CAlert } from "@coreui/react"
import { getData } from "../../../apiConfigs/apiCalls"
import { SEARCH } from "../../../apiConfigs/endpoints"
import { useNavigate } from "react-router-dom"
import * as XLSX from "xlsx"

const Gamehistory = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [historyType, setHistoryType] = useState("game")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const usersPerPage = 10

  const historyTypeOptions = [
    { value: "game", label: "Game" },
    { value: "task", label: "Task" },
    { value: "ads", label: "Ads" },
    { value: "dailyReward", label: "Daily Reward" },
    { value: "referral", label: "Referral" },
  ]

  const sortDataByDate = (data) => {
    // console.log("🔄 Sorting data by date:", data?.length || 0, "items")
    return data.sort((a, b) => {
      const dateA = new Date(
        a.createdAt || a.CompletionTime || a.completionTime || a.claimedAt || a.CompletedAt || a.initiated || 0,
      )
      const dateB = new Date(
        b.createdAt || b.CompletionTime || b.completionTime || b.claimedAt || b.CompletedAt || b.initiated || 0,
      )
      return dateB - dateA
    })
  }

  const fetchAllDataForExport = async () => {
    // console.log("📤 Starting export data fetch for type:", historyType)
    try {
      let typeParam = historyType
      if (typeParam === "dailyReward") typeParam = "dailyreward"
      if (typeParam === "game") typeParam = "gamehistory"
      if (typeParam === "task") typeParam = "tasks"

      const params = {
        type: typeParam,
        limit: 10000,
      }
      if (fromDate) params.fromDate = fromDate
      if (toDate) params.toDate = toDate
      if (searchTerm) {
        params.userId = searchTerm
      }

      if (typeParam === "withdrawal") {
        params.status = "transferred"
      }

      const queryString = Object.entries(params)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&")

      // console.log("📤 Export API call:", `${SEARCH}?${queryString}`)
      const response = await getData(`${SEARCH}?${queryString}`)
      // console.log("📤 Export API response:", response)

      let dataList = []
      if (typeParam === "gamehistory") {
        dataList = response?.history || []
      } else if (typeParam === "tasks") {
        dataList = response?.tasks || []
      } else if (typeParam === "ads") {
        dataList = response?.ads || []
      } else if (typeParam === "dailyreward") {
        dataList = response?.rewards || []
      } else if (typeParam === "referral") {
        dataList = response?.data || []
      } else if (typeParam === "withdrawal") {
        dataList = response?.withdrawals || []
      }

      // console.log("📤 Export data extracted:", dataList?.length || 0, "items")
      return sortDataByDate(dataList)
    } catch (error) {
      // console.error("❌ Error fetching all data for export:", error)
      throw error
    }
  }

  const fetchData = async (paramsOverride = {}) => {
    // console.log("🔄 Fetching data for type:", historyType, "page:", currentPage)
    setIsLoading(true)
    setError(null)

    try {
      let response
      let dataList = []
      let typeParam = historyType
      if (typeParam === "dailyReward") typeParam = "dailyreward"
      if (typeParam === "game") typeParam = "gamehistory"
      if (typeParam === "task") typeParam = "tasks"

      const params = {
        type: typeParam,
        page: paramsOverride.resetPage ? 1 : currentPage,
        limit: usersPerPage,
        ...paramsOverride,
      }
      if (fromDate) params.fromDate = fromDate
      if (toDate) params.toDate = toDate
      if (searchTerm) {
        params.userId = searchTerm
      }

      if (typeParam === "withdrawal") {
        params.status = "transferred"
      }

      const queryString = Object.entries(params)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&")

      // console.log("🌐 API call:", `${SEARCH}?${queryString}`)
      response = await getData(`${SEARCH}?${queryString}`)
      console.log("API response:", response)

      if (typeParam === "gamehistory") {
        dataList = response?.history || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || 0)
        // console.log("🎮 Game history data:", dataList?.length || 0, "items")
      } else if (typeParam === "tasks") {
        dataList = response?.tasks || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || 0)
        // console.log("📋 Tasks data:", dataList?.length || 0, "items")
      } else if (typeParam === "ads") {
        dataList = response?.ads || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || 0)
        // console.log("📺 Ads data:", dataList?.length || 0, "items")
      } else if (typeParam === "dailyreward") {
        dataList = response?.rewards || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || 0)
        // console.log("🎁 Daily reward data:", dataList?.length || 0, "items")
      } else if (typeParam === "referral") {
        dataList = response?.data || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || response?.totalReferralsCount || 0)
        // console.log("👥 Referral data:", dataList?.length || 0, "items")
      } else if (typeParam === "withdrawal") {
        dataList = response?.withdrawals || []
        setTotalPages(response?.totalPages || 1)
        setTotalCount(response?.length || 0)
        // console.log("💰 Withdrawal data:", dataList?.length || 0, "items")
      }

      // console.log("📋 Raw data list:", dataList)
      // console.log("📊 Total pages:", response?.totalPages || 1)
      // console.log("🔢 Total count:", response?.length || 0)

      const sortedData = sortDataByDate(dataList)
      // console.log("✅ Final sorted data:", sortedData)

      setUsers(sortedData)
      setFilteredUsers(sortedData)
    } catch (error) {
      console.error(`❌ Error fetching ${historyType} data:`, error)
      setError({
        type: historyType,
        message: `Unable to fetch ${historyType} data.`,
        details: error.message || "Unknown error",
      })
      setUsers([])
      setFilteredUsers([])
      setTotalPages(1)
      setTotalCount(0)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // console.log("🔄 History type changed to:", historyType)
    fetchData({ resetPage: true })
    setSearchTerm("")
    setFromDate("")
    setToDate("")
    setCurrentPage(1)
  }, [historyType])

  useEffect(() => {
    // console.log("📄 Page changed to:", currentPage)
    fetchData()
  }, [historyType, currentPage])

  const handleSearch = () => {
    // console.log("🔍 Search triggered with:", { searchTerm, fromDate, toDate, historyType })
    setCurrentPage(1)
    fetchData()
  }

  const handleFromDateChange = (e) => {
    // console.log("📅 From date changed:", e.target.value)
    setFromDate(e.target.value)
  }

  const handleToDateChange = (e) => {
  //   console.log("📅 To date changed:", e.target.value)
    setToDate(e.target.value)
  }

  const handleRetry = () => {
    // console.log("🔄 Retry triggered")
    fetchData()
  }

  const handleReset = () => {
    // console.log("🔄 Reset triggered")
    setSearchTerm("")
    setFromDate("")
    setToDate("")
    setCurrentPage(1)
    fetchData()
  }

  const currentUsers = filteredUsers
  // console.log("👥 Current users to display:", currentUsers?.length || 0)

  const nextPage = () => {
    if (currentPage < totalPages) {
      // console.log("➡️ Moving to next page:", currentPage + 1)
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      // console.log("⬅️ Moving to previous page:", currentPage - 1)
      setCurrentPage(currentPage - 1)
    }
  }

  const handleUserIdClick = async (userId) => {
    // console.log("👤 User ID clicked:", userId)
    if (!userId) {
      alert("User ID is required")
      return
    }

    try {
      sessionStorage.setItem("selectedUserId", userId)
      navigate(`/user-game-details/${encodeURIComponent(userId)}`)
    } catch (error) {
      // console.error("❌ Error navigating to user details:", error)
      alert("Error navigating to user details. Please try again.")
    }
  }

  const downloadExcel = async () => {
    // console.log("📊 Excel export started")
    setIsExporting(true)

    try {
      const allData = await fetchAllDataForExport()

      if (!allData || allData.length === 0) {
        alert("No data to export")
        return
      }

      let formattedData = []

      if (historyType === "game") {
        formattedData = allData.map((user, index) => ({
          SNo: index + 1,
          UserId: user.userId || "N/A",
          UserName: user.userName || "N/A",
          GameTitle: user.gameTitle || "N/A",
          CreatedAt: user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A",
          UpdatedAt: user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A",
          InitialBalance: user.initialBalance || 0,
          BetAmount: user.betAmount || 0,
          Prize: user.winAmount || 0,
          FinalBalance: user.finalBalance || 0,
          PlayedStatus: user.playedStatus || "N/A",
        }))
      } else if (historyType === "task") {
        formattedData = allData.map((task, index) => ({
          SNo: index + 1,
          UserId: task.userId || "N/A",
          UserName: task.userName || "N/A",
          Initiated: task.completionTime ? new Date(task.completionTime).toLocaleString() : "N/A",
          InitialBalance: task.initialBalance || 0,
          RewardAmount: task.rewardPoints || 0,
          FinalBalance: task.finalBalance || 0,
          Status: task.status || "Completed",
        }))
      } else if (historyType === "ads") {
        formattedData = allData.map((ad, index) => ({
          SNo: index + 1,
          UserId: ad.userId || "N/A",
          UserName: ad.userName || "N/A",
          Initiated: ad.completionTime ? new Date(ad.completionTime).toLocaleString() : "N/A",
          InitialBalance: ad.initialBalance || 0,
          RewardPoints: ad.rewardPoints || 0,
          FinalBalance: ad.finalBalance || 0,
        }))
      } else if (historyType === "dailyReward") {
        formattedData = allData.map((claim, index) => ({
          SNo: index + 1,
          UserId: claim.userId || "N/A",
          UserName: claim.userName || "N/A",
          Initiated: claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A",
          InitialBalance: claim.initialBalance || 0,
          RewardPoints: claim.rewardPoints || 0,
          FinalBalance: claim.finalBalance || 0,
          Status: claim.Status || "Claimed",
        }))
      } else if (historyType === "referral") {
        formattedData = allData.map((referral, index) => ({
          SNo: index + 1,
          ReferringUserId: referral.referringUser?._id || "N/A",
          ReferringUserName: referral.referringUser?.userName || "N/A",
          ReferredUserId: referral.referredUser?._id || "N/A",
          ReferredUserName: referral.referredUser?.userName || "N/A",
          Initiated: referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A",
          InitialBalance: referral.initialBalance || 0,
          ReferralAmount: referral.referralAmount || 0,
          FinalBalance: referral.finalBalance || 0,
        }))
      }

      // console.log("📊 Formatted data for export:", formattedData?.length || 0, "items")

      const ws = XLSX.utils.json_to_sheet(formattedData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, `${historyType}History`)

      const fileName = `${historyType}_history_${new Date().toISOString().split("T")[0]}.xlsx`
      XLSX.writeFile(wb, fileName)

      // console.log("✅ Excel file exported:", fileName)
    } catch (error) {
      // console.error("❌ Error exporting to Excel:", error)
      alert("Error exporting data to Excel. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const renderTableHeaders = () => {
    if (historyType === "game") {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            GAME TITLE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            CREATED AT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            UPDATED AT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            INITIAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "100px",
            }}
          >
            BET AMOUNT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "80px",
            }}
          >
            PRIZE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            FINAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            PLAYED STATUS
          </th>
        </tr>
      )
    } else if (historyType === "task") {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            INITIATED
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            INITIAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            REWARD AMOUNT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            FINAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "100px",
            }}
          >
            STATUS
          </th>
        </tr>
      )
    } else if (historyType === "ads") {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            INITIATED
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            INITIAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            REWARD POINTS
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            FINAL BALANCE
          </th>
        </tr>
      )
    } else if (historyType === "dailyReward") {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            INITIATED
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            INITIAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            REWARD AMOUNT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            FINAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "100px",
            }}
          >
            STATUS
          </th>
        </tr>
      )
    } else if (historyType === "referral") {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            REFERRING USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            REFERRING USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            REFERRED USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            REFERRED USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            INITIATED
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            INITIAL BALANCE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            REFERRAL AMOUNT
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            FINAL BALANCE
          </th>
        </tr>
      )
    } else {
      return (
        <tr>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "60px",
            }}
          >
            S.NO
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER ID
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "120px",
            }}
          >
            USER NAME
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "100px",
            }}
          >
            TYPE
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            DETAILS
          </th>
          <th
            style={{
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2d2d2d",
              padding: "12px",
              minWidth: "150px",
            }}
          >
            DATE
          </th>
        </tr>
      )
    }
  }

  const renderTableRows = () => {
    // console.log("🎨 Rendering table rows for", currentUsers?.length || 0, "users")

    if (currentUsers.length === 0) {
      const colSpan =
        historyType === "game"
          ? 11
          : historyType === "task"
            ? 8
            : historyType === "ads"
              ? 7
              : historyType === "dailyReward"
                ? 8
                : historyType === "referral"
                  ? 9
                  : 6
      return (
        <tr>
          <td
            colSpan={colSpan}
            className="text-center py-4"
            style={{ backgroundColor: "#1a1a1a", color: "#888", padding: "20px" }}
          >
            <h6>No {historyType} history available</h6>
          </td>
        </tr>
      )
    }

    if (historyType === "game") {
      return currentUsers.map((user, index) => {
        // console.log(`🎮 Rendering game row ${index + 1}:`, user)
        return (
          <tr
            key={user._id || user.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(user.userId || user._id)}
              >
                {user.userId || user._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{user.userName || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{user.gameTitle || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{user.initialBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "100px" }}>{user.betAmount || 0}</td>
            <td style={{ padding: "12px", minWidth: "80px" }}>{user.winAmount || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{user.finalBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{user.playedStatus || "N/A"}</td>
          </tr>
        )
      })
    } else if (historyType === "task") {
      return currentUsers.map((task, index) => {
      //   console.log(`📋 Rendering task row ${index + 1}:`, task)
        return (
          <tr
            key={task._id || task.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(task.userId || task._id)}
              >
                {task.userId || task._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{task.userName || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {task.completionTime ? new Date(task.completionTime).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{task.initialBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{task.rewardPoints || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{task.finalBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "100px" }}>{task.status || "Completed"}</td>
          </tr>
        )
      })
    } else if (historyType === "ads") {
      return currentUsers.map((ad, index) => {
        // console.log(`📺 Rendering ads row ${index + 1}:`, ad)
        return (
          <tr
            key={ad._id || ad.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(ad.userId || ad._id)}
              >
                {ad.userId || ad._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{ad.userName || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {ad.completionTime ? new Date(ad.completionTime).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{ad.initialBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{ad.rewardPoints || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{ad.finalBalance || 0}</td>
          </tr>
        )
      })
    } else if (historyType === "dailyReward") {
      return currentUsers.map((claim, index) => {
        // console.log(`🎁 Rendering daily reward row ${index + 1}:`, claim)
        return (
          <tr
            key={claim._id || claim.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(claim.userId || claim._id)}
              >
                {claim.userId || claim._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{claim.userName || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {claim.claimedAt ? new Date(claim.claimedAt).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{claim.initialBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{claim.rewardPoints || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{claim.finalBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "100px" }}>{claim.status || "CLAIMED"}</td>
          </tr>
        )
      })
    } else if (historyType === "referral") {
      return currentUsers.map((referral, index) => {
        // console.log(`👥 Rendering referral row ${index + 1}:`, referral)
        return (
          <tr
            key={referral._id || referral.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(referral.referringUser?._id)}
              >
                {referral.referringUser?._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              <span>{referral.referringUser?.userName || "N/A"}</span>
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              <span>{referral.referredUser?._id || "N/A"}</span>
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              <span>{referral.referredUser?.userName || "N/A"}</span>
            </td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {referral.createdAt ? new Date(referral.createdAt).toLocaleString() : "N/A"}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{referral.initialBalance || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{referral.referralAmount || 0}</td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{referral.finalBalance || 0}</td>
          </tr>
        )
      })
    } else {
      return currentUsers.map((item, index) => {
        // console.log(`📄 Rendering generic row ${index + 1}:`, item)
        return (
          <tr
            key={item._id || item.id || index}
            style={{ backgroundColor: "#1a1a1a", color: "white", borderBottom: "1px solid #333" }}
            className="table-row-hover"
          >
            <td style={{ padding: "12px", minWidth: "60px" }} className="fw-bold">
              {(currentPage - 1) * usersPerPage + index + 1}
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>
              <span
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "#8b5cf6",
                  fontWeight: "bold",
                }}
                onClick={() => handleUserIdClick(item.userId || item._id)}
              >
                {item.userId || item._id || "N/A"}
              </span>
            </td>
            <td style={{ padding: "12px", minWidth: "120px" }}>{item.username || "N/A"}</td>
            <td style={{ padding: "12px", minWidth: "100px" }}>{historyType}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>{"Details not available"}</td>
            <td style={{ padding: "12px", minWidth: "150px" }}>
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}
            </td>
          </tr>
        )
      })
    }
  }

  const getSearchPlaceholder = () => {
    switch (historyType) {
      case "game":
        return "Search by User ID"
      case "task":
        return "Search by User ID"
      case "ads":
        return "Search by User ID"
      case "dailyReward":
        return "Search by User ID"
      case "referral":
        return "Search by Referring User ID"
      default:
        return "Search by User ID"
    }
  }

  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white", padding: "20px" }}>
      <CCard style={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}>
        <CCardHeader
          style={{ backgroundColor: "#8b5cf6", color: "white", padding: "15px 20px" }}
          className="text-center"
        >
          <h5 className="fw-bold mb-0">{historyType.charAt(0).toUpperCase() + historyType.slice(1)} History</h5>
        </CCardHeader>
        <CCardBody style={{ backgroundColor: "#1a1a1a", color: "white", padding: "20px" }}>
          {/* Responsive Filter Section */}
          <div className="mb-4">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-3">
                <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
                  Search
                </label>
                <CFormInput
                  type="text"
                  placeholder={getSearchPlaceholder()}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: "#2d2d2d",
                    borderColor: "#444",
                    borderRadius: "4px",
                    height: "40px",
                    color: "white",
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
                  From
                </label>
                <CFormInput
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  style={{
                    backgroundColor: "#2d2d2d",
                    borderColor: "#444",
                    borderRadius: "4px",
                    height: "40px",
                    color: "white",
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
                  To
                </label>
                <CFormInput
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange}
                  style={{
                    backgroundColor: "#2d2d2d",
                    borderColor: "#444",
                    borderRadius: "4px",
                    height: "40px",
                    color: "white",
                  }}
                />
              </div>
             <div className="col-12 col-md-6 col-lg-2">
  <label className="d-block mb-2" style={{ color: "white", fontWeight: "bold" }}>
    History Type
  </label>
  <div className="custom-select-wrapper" style={{ position: "relative" }}>
    <CFormSelect
      value={historyType}
      onChange={(e) => setHistoryType(e.target.value)}
      style={{
        backgroundColor: "#2d2d2d",
        borderColor: "#444",
        borderRadius: "4px",
        height: "40px",
        color: "white",
        paddingRight: "30px", // Add padding to make space for the arrow
      }}
    >
      {historyTypeOptions.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{ backgroundColor: "#2d2d2d", color: "white" }}
        >
          {option.label}
        </option>
      ))}
    </CFormSelect>
    <i
      className="fas fa-chevron-down"
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "white",
        pointerEvents: "none", // Prevents the icon from blocking interaction
      }}
    />
  </div>
</div>

              <div className="col-12 col-lg-3">
                <label className="d-block mb-2" style={{ color: "transparent" }}>
                  Actions
                </label>
                <div className="d-flex gap-2">
                  <CButton
                    style={{
                      backgroundColor: "#8b5cf6",
                      borderColor: "#8b5cf6",
                      color: "white",
                      height: "40px",
                      flex: 1,
                    }}
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Search"}
                  </CButton>
                  <CButton
                    style={{
                      backgroundColor: "#6b7280",
                      borderColor: "#6b7280",
                      color: "white",
                      height: "40px",
                      flex: 1,
                    }}
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </CButton>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <CAlert
              className="d-flex align-items-center justify-content-between mb-4"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                color: "white",
                padding: "15px",
              }}
            >
              <div>
                <strong>Error:</strong> {error.message}
                {error.details && <div className="mt-1 small">{error.details}</div>}
              </div>
              <CButton
                style={{
                  backgroundColor: "#ef4444",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                }}
                onClick={handleRetry}
              >
                Retry
              </CButton>
            </CAlert>
          )}

          <div className="d-flex justify-content-end mb-3">
            <CButton
              style={{
                backgroundColor: "#8b5cf6",
                border: "none",
                borderRadius: "6px",
                color: "white",
                fontWeight: "bold",
                padding: "10px 25px",
              }}
              onClick={downloadExcel}
              disabled={filteredUsers.length === 0 || isLoading || isExporting}
            >
              {isExporting ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  EXPORTING...
                </>
              ) : (
                "EXPORT AS EXCEL"
              )}
            </CButton>
          </div>

          <CRow>
            <div className="col-12">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" style={{ color: "#8b5cf6" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2" style={{ color: "white" }}>
                    Loading {historyType} data...
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    border: "1px solid #333",
                    overflow: "auto",
                    maxHeight: "70vh",
                  }}
                >
                  <table
                    className="table text-center align-middle"
                    style={{
                      marginBottom: 0,
                      backgroundColor: "transparent",
                      minWidth: "1200px", // Ensures table doesn't compress too much
                    }}
                  >
                    <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>{renderTableHeaders()}</thead>
                    <tbody>{renderTableRows()}</tbody>
                  </table>
                </div>
              )}

              <div className="d-flex justify-content-center mt-3">
                <nav aria-label="Page navigation">
                  <div
                    className="d-flex align-items-center gap-1 p-2"
                    style={{ backgroundColor: "#2d2d2d", borderRadius: "8px", border: "1px solid #444" }}
                  >
                    {/* Previous Button */}
                    <button
                      className="btn d-flex align-items-center justify-content-center border-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: currentPage === 1 ? "#444" : "#8b5cf6",
                        color: "#ffffff",
                        fontWeight: "bold",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        borderRadius: "6px",
                      }}
                      disabled={currentPage === 1 || isLoading}
                      onClick={prevPage}
                    >
                      &#8249;
                    </button>

                    {/* Page Numbers */}
                    {(() => {
                      const pages = []
                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(
                            <button
                              key={i}
                              className="btn d-flex align-items-center justify-content-center border-0"
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
                                color: "#ffffff",
                                fontWeight: currentPage === i ? "bold" : "normal",
                                border: "1px solid #444",
                                borderRadius: "6px",
                              }}
                              onClick={() => setCurrentPage(i)}
                            >
                              {i}
                            </button>,
                          )
                        }
                      } else {
                        if (currentPage <= 3) {
                          for (let i = 1; i <= 3; i++) {
                            pages.push(
                              <button
                                key={i}
                                className="btn d-flex align-items-center justify-content-center border-0"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
                                  color: "#ffffff",
                                  fontWeight: currentPage === i ? "bold" : "normal",
                                  border: "1px solid #444",
                                  borderRadius: "6px",
                                }}
                                onClick={() => setCurrentPage(i)}
                              >
                                {i}
                              </button>,
                            )
                          }
                          if (totalPages > 4) {
                            pages.push(
                              <span
                                key="ellipsis1"
                                className="d-flex align-items-center px-2"
                                style={{ color: "#888" }}
                              >
                                ...
                              </span>,
                            )
                            pages.push(
                              <button
                                key={totalPages}
                                className="btn d-flex align-items-center justify-content-center border-0"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: "#1a1a1a",
                                  color: "#ffffff",
                                  border: "1px solid #444",
                                  borderRadius: "6px",
                                }}
                                onClick={() => setCurrentPage(totalPages)}
                              >
                                {totalPages}
                              </button>,
                            )
                          }
                        } else if (currentPage >= totalPages - 2) {
                          pages.push(
                            <button
                              key={1}
                              className="btn d-flex align-items-center justify-content-center border-0"
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#1a1a1a",
                                color: "#ffffff",
                                border: "1px solid #444",
                                borderRadius: "6px",
                              }}
                              onClick={() => setCurrentPage(1)}
                            >
                              1
                            </button>,
                          )
                          pages.push(
                            <span key="ellipsis2" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
                              ...
                            </span>,
                          )
                          for (let i = totalPages - 2; i <= totalPages; i++) {
                            pages.push(
                              <button
                                key={i}
                                className="btn d-flex align-items-center justify-content-center border-0"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
                                  color: "#ffffff",
                                  fontWeight: currentPage === i ? "bold" : "normal",
                                  border: "1px solid #444",
                                  borderRadius: "6px",
                                }}
                                onClick={() => setCurrentPage(i)}
                              >
                                {i}
                              </button>,
                            )
                          }
                        } else {
                          pages.push(
                            <button
                              key={1}
                              className="btn d-flex align-items-center justify-content-center border-0"
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#1a1a1a",
                                color: "#ffffff",
                                border: "1px solid #444",
                                borderRadius: "6px",
                              }}
                              onClick={() => setCurrentPage(1)}
                            >
                              1
                            </button>,
                          )
                          pages.push(
                            <span key="ellipsis3" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
                              ...
                            </span>,
                          )
                          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                            pages.push(
                              <button
                                key={i}
                                className="btn d-flex align-items-center justify-content-center border-0"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundColor: currentPage === i ? "#8b5cf6" : "#1a1a1a",
                                  color: "#ffffff",
                                  fontWeight: currentPage === i ? "bold" : "normal",
                                  border: "1px solid #444",
                                  borderRadius: "6px",
                                }}
                                onClick={() => setCurrentPage(i)}
                              >
                                {i}
                              </button>,
                            )
                          }
                          pages.push(
                            <span key="ellipsis4" className="d-flex align-items-center px-2" style={{ color: "#888" }}>
                              ...
                            </span>,
                          )
                          pages.push(
                            <button
                              key={totalPages}
                              className="btn d-flex align-items-center justify-content-center border-0"
                              style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: "#1a1a1a",
                                color: "#ffffff",
                                border: "1px solid #444",
                                borderRadius: "6px",
                              }}
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </button>,
                          )
                        }
                      }

                      return pages
                    })()}

                    {/* Next Button */}
                    <button
                      className="btn d-flex align-items-center justify-content-center border-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: currentPage >= totalPages ? "#444" : "#8b5cf6",
                        color: "#ffffff",
                        fontWeight: "bold",
                        cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                        borderRadius: "6px",
                      }}
                      disabled={currentPage >= totalPages || isLoading}
                      onClick={nextPage}
                    >
                      &#8250;
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </CRow>
        </CCardBody>
      </CCard>

      <style jsx>{`
        .table-row-hover:hover {
          background-color: #2d2d2d !important;
          transition: all 0.2s ease;
        }
        
        .form-select option {
          background-color: #2d2d2d;
          color: white;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
        }

        /* Custom scrollbar for the table */
        div::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .col-12.col-md-6.col-lg-3,
          .col-12.col-md-6.col-lg-2,
          .col-12.col-lg-3 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Gamehistory
