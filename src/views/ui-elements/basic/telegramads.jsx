// "use client"

// import { useState, useEffect } from "react"
// import {
//   CRow,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CModal,
//   CModalHeader,
//   CModalBody,
//   CModalFooter,
//   CForm,
//   CFormInput,
//   CButton,
//   CAlert,
//   CSpinner,
//   CFormSelect,
// } from "@coreui/react"
// import { getData, postData } from "../../../apiConfigs/apiCalls"
// import { GET_ALL_ADS, ADD_AD, UPDATE_AD } from "../../../apiConfigs/endpoints"

// const TelegramAds = () => {
//   const [ads, setAds] = useState([])
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedAd, setSelectedAd] = useState({})
//   const [isEditing, setIsEditing] = useState(false)
//   const [isLoadingAds, setIsLoadingAds] = useState(false)

//   // Backend pagination states
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [totalAds, setTotalAds] = useState(0)
//   const adsPerPage = 10

//   // Updated fetchAds function to use backend pagination
//   const fetchAds = async (page = 1, limit = adsPerPage) => {
//     setIsLoadingAds(true)
//     try {
//       // Build query parameters for backend pagination
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//       })

//       const response = await getData(`${GET_ALL_ADS}?${queryParams.toString()}`)

//       // Update state with backend pagination data
//       setAds(response?.data || response?.ads || [])
//       setTotalPages(response?.totalPages || 1)
//       setTotalAds(response?.count || response?.total || response?.total_no_of_ads || 0)
//       setCurrentPage(response?.page || page)
//       setError(null)
//     } catch (error) {
//       setError("Failed to load ads. Please try again.")
//       // Reset to empty state on error
//       setAds([])
//       setTotalPages(1)
//       setTotalAds(0)
//       setCurrentPage(1)
//     } finally {
//       setIsLoadingAds(false)
//     }
//   }

//   // Initial load
//   useEffect(() => {
//     fetchAds(1, adsPerPage)
//   }, [])

//   // Handle page changes
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
//       setCurrentPage(newPage)
//       fetchAds(newPage, adsPerPage)
//     }
//   }

//   const nextPage = () => {
//     handlePageChange(currentPage + 1)
//   }

//   const prevPage = () => {
//     handlePageChange(currentPage - 1)
//   }

//   const handleAddAd = () => {
//     setSelectedAd({
//       AdName: "",
//       AdSDK: "",
//       AdCount: 0,
//       AdTimer_InMinutes: 1,
//       AdImage: "",
//       Rewardpoints: 0,
//       Status: "ACTIVE",
//     })
//     setIsEditing(false)
//     setError(null)
//     setSuccess(null)
//     setShowModal(true)
//   }

//   const handleEditClick = (ad) => {
//     setSelectedAd({ ...ad })
//     setIsEditing(true)
//     setError(null)
//     setSuccess(null)
//     setShowModal(true)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setSelectedAd((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSave = async () => {
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const userId = localStorage.getItem("id")

//       if (!userId) {
//         throw new Error("User ID not found. Please log in again.")
//       }

//       const requestBody = {
//         AdName: selectedAd.AdName,
//         AdSDK: selectedAd.AdSDK,
//         AdCount: selectedAd.AdCount,
//         AdTimer_InMinutes: selectedAd.AdTimer_InMinutes,
//         AdImage: selectedAd.AdImage,
//         Rewardpoints: selectedAd.Rewardpoints,
//         Status: selectedAd.Status,
//         AddedBy: userId,
//       }

//       let response
//       if (isEditing) {
//         requestBody.AdId = selectedAd._id
//         response = await postData(UPDATE_AD, requestBody)
//       } else {
//         response = await postData(ADD_AD, requestBody)
//       }

//       setSuccess(`${isEditing ? "Ad updated" : "Ad added"} successfully!`)

//       setTimeout(() => {
//         setShowModal(false)
//         // Refresh current page data
//         fetchAds(currentPage, adsPerPage)
//       }, 1500)
//     } catch (error) {
//       setError(
//         `Failed to ${isEditing ? "update" : "add"} ad: ${
//           error.response?.data?.message || error.message || "Unknown error"
//         }`,
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <CCard className="mb-4 shadow-lg">
//       <CCardHeader
//         style={{ backgroundColor: "#00B5E2", color: "white" }}
//         className="d-flex justify-content-between align-items-center"
//       >
//         <h5 className="fw-bold">Telegram Ads</h5>
//         <CButton
//           style={{ backgroundColor: "white", color: "black", borderColor: "white" }}
//           className="fw-bold"
//           onClick={handleAddAd}
//         >
//           + Add
//         </CButton>
//       </CCardHeader>
//       <CCardBody>
//         {error && !showModal && (
//           <CAlert color="danger" dismissible onClose={() => setError(null)}>
//             {error}
//           </CAlert>
//         )}

//         {success && !showModal && (
//           <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
//             {success}
//           </CAlert>
//         )}

//         <CRow>
//           <div className="container">
//             {/* Remove the entire search bar section and replace with just the total count */}
//             <div className="mb-3 d-flex justify-content-between align-items-center">
//               <div className="d-flex align-items-center">
//                 {isLoadingAds && (
//                   <div className="spinner-border spinner-border-sm text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 )}
//               </div>
//               {/* <span className="text-muted small">Total Ads: {totalAds}</span> */}
//             </div>

//             <div className="table-responsive">
//               <table className="table table-bordered table-hover text-center align-middle">
//                 <thead style={{ backgroundColor: "#00B5E2", color: "black" }}>
//                   <tr>
//                     <th>S.No</th>
//                     <th>Ad Name</th>
//                     <th>Ad Function</th>
//                     <th>Ad Count</th>
//                     <th>Ad Timer (Minutes)</th>
//                     <th>Ad Image</th>
//                     <th>Reward Points</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {isLoadingAds ? (
//                     <tr>
//                       <td colSpan="9" className="text-center py-4">
//                         <div className="spinner-border text-primary" role="status">
//                           <span className="visually-hidden">Loading...</span>
//                         </div>
//                         <div className="mt-2">Loading ads...</div>
//                       </td>
//                     </tr>
//                   ) : ads.length > 0 ? (
//                     ads.map((ad, index) => (
//                       <tr key={ad._id} className="table-light">
//                         <td className="fw-bold">{(currentPage - 1) * adsPerPage + index + 1}</td>
//                         <td>{ad.AdName || "N/A"}</td>
//                         <td>{ad.AdSDK || "N/A"}</td>
//                         <td>{ad.AdCount || 0}</td>
//                         <td>{ad.AdTimer_InMinutes || 0}</td>
//                         <td>
//                           {ad.AdImage ? (
//                             <img
//                               src={ad.AdImage || "/placeholder.svg"}
//                               alt="Ad"
//                               style={{ width: "30px", height: "30px", objectFit: "contain" }}
//                               onError={(e) => {
//                                 e.target.onerror = null
//                                 e.target.src = "/placeholder.svg?height=30&width=30"
//                               }}
//                             />
//                           ) : (
//                             <span>No image</span>
//                           )}
//                         </td>
//                         <td>{ad.Rewardpoints || 0}</td>
//                         <td>
//                           <span className={`badge bg-${ad.Status === "ACTIVE" ? "success" : "secondary"}`}>
//                             {ad.Status}
//                           </span>
//                         </td>
//                         <td>
//                           <CButton className="me-2" onClick={() => handleEditClick(ad)}>
//                             <i className="fas fa-edit" style={{ color: "black" }}></i>
//                           </CButton>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="text-center text-muted fw-bold py-3">
//                         No ads available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Backend Pagination */}
//             {totalPages > 1 && (
//               <div className="d-flex justify-content-between align-items-center mt-3">
//                 <div className="text-muted small">
//                   Showing {(currentPage - 1) * adsPerPage + 1} to {Math.min(currentPage * adsPerPage, totalAds)} of{" "}
//                   {totalAds} ads
//                 </div>

//                 <nav aria-label="Page navigation">
//                   <div className="d-flex align-items-center gap-1 p-2 bg-white rounded shadow-sm border">
//                     {/* Previous Button */}
//                     <button
//                       className="btn d-flex align-items-center justify-content-center border-0"
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: currentPage === 1 ? "#e9ecef" : "#00B5E2",
//                         color: currentPage === 1 ? "#6c757d" : "#ffffff",
//                         fontWeight: "bold",
//                         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                       }}
//                       disabled={currentPage === 1 || isLoadingAds}
//                       onClick={prevPage}
//                     >
//                       &#8249;
//                     </button>

//                     {/* Page Numbers */}
//                     {(() => {
//                       const pages = []
//                       const getButtonStyle = (pageNum) => ({
//                         width: "40px",
//                         height: "40px",
//                         backgroundColor: currentPage === pageNum ? "#00B5E2" : "#ffffff",
//                         color: currentPage === pageNum ? "#ffffff" : "#000000",
//                         fontWeight: currentPage === pageNum ? "bold" : "normal",
//                         border: "1px solid #00B5E2",
//                       })

//                       const renderPageButton = (i) => (
//                         <button
//                           key={i}
//                           className="btn d-flex align-items-center justify-content-center border-0"
//                           style={getButtonStyle(i)}
//                           onClick={() => handlePageChange(i)}
//                           disabled={isLoadingAds}
//                         >
//                           {i}
//                         </button>
//                       )

//                       if (totalPages <= 7) {
//                         for (let i = 1; i <= totalPages; i++) pages.push(renderPageButton(i))
//                       } else {
//                         if (currentPage <= 3) {
//                           for (let i = 1; i <= 3; i++) pages.push(renderPageButton(i))
//                           pages.push(
//                             <span key="ellipsis1" className="d-flex align-items-center px-2 text-muted">
//                               ...
//                             </span>,
//                           )
//                           pages.push(renderPageButton(totalPages))
//                         } else if (currentPage >= totalPages - 2) {
//                           pages.push(renderPageButton(1))
//                           pages.push(
//                             <span key="ellipsis2" className="d-flex align-items-center px-2 text-muted">
//                               ...
//                             </span>,
//                           )
//                           for (let i = totalPages - 2; i <= totalPages; i++) pages.push(renderPageButton(i))
//                         } else {
//                           pages.push(renderPageButton(1))
//                           pages.push(
//                             <span key="ellipsis3" className="d-flex align-items-center px-2 text-muted">
//                               ...
//                             </span>,
//                           )
//                           for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(renderPageButton(i))
//                           pages.push(
//                             <span key="ellipsis4" className="d-flex align-items-center px-2 text-muted">
//                               ...
//                             </span>,
//                           )
//                           pages.push(renderPageButton(totalPages))
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
//                         backgroundColor: currentPage >= totalPages ? "#e9ecef" : "#00B5E2",
//                         color: currentPage >= totalPages ? "#6c757d" : "#ffffff",
//                         fontWeight: "bold",
//                         cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
//                       }}
//                       disabled={currentPage >= totalPages || isLoadingAds}
//                       onClick={nextPage}
//                     >
//                       &#8250;
//                     </button>
//                   </div>
//                 </nav>
//               </div>
//             )}
//           </div>
//         </CRow>
//       </CCardBody>

//       {/* Modal */}
//       <CModal visible={showModal} onClose={() => setShowModal(false)} backdrop="static">
//         <CModalHeader style={{ backgroundColor: "#00B5E2", color: "white" }}>
//           {isEditing ? "Edit Ad" : "Add New Ad"}
//         </CModalHeader>
//         <CModalBody>
//           {error && (
//             <CAlert color="danger" dismissible onClose={() => setError(null)}>
//               {error}
//             </CAlert>
//           )}

//           {success && (
//             <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
//               {success}
//             </CAlert>
//           )}

//           <CForm>
//             <CFormInput
//               label="Ad Name"
//               name="AdName"
//               value={selectedAd.AdName}
//               onChange={handleChange}
//               className="mb-3"
//               required
//             />
//             <CFormInput
//               label="Ad Function (SDK)"
//               name="AdSDK"
//               value={selectedAd.AdSDK}
//               onChange={handleChange}
//               className="mb-3"
//               required
//             />
//             <CFormInput
//               label="Ad Count"
//               name="AdCount"
//               type="number"
//               value={selectedAd.AdCount}
//               onChange={handleChange}
//               className="mb-3"
//               required
//             />
//             <CFormInput
//               label="Timer (Minutes)"
//               name="AdTimer_InMinutes"
//               type="number"
//               value={selectedAd.AdTimer_InMinutes}
//               onChange={handleChange}
//               className="mb-3"
//               required
//             />
//             <CFormInput
//               label="Image URL"
//               name="AdImage"
//               value={selectedAd.AdImage}
//               onChange={handleChange}
//               className="mb-3"
//             />
//             {selectedAd.AdImage && (
//               <div className="text-center mb-3">
//                 <img
//                   src={selectedAd.AdImage || "/placeholder.svg"}
//                   alt="Ad Preview"
//                   style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain" }}
//                   onError={(e) => {
//                     e.target.onerror = null
//                     e.target.src = "/placeholder.svg?height=150&width=200"
//                   }}
//                 />
//               </div>
//             )}
//             <CFormInput
//               label="Reward Points"
//               name="Rewardpoints"
//               type="number"
//               value={selectedAd.Rewardpoints}
//               onChange={handleChange}
//               className="mb-3"
//               required
//             />
//             <CFormSelect
//               label="Status"
//               name="Status"
//               value={selectedAd.Status}
//               onChange={handleChange}
//               className="mb-3"
//               options={[
//                 { label: "Active", value: "ACTIVE" },
//                 { label: "Inactive", value: "INACTIVE" },
//               ]}
//             />
//           </CForm>
//         </CModalBody>
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setShowModal(false)} disabled={loading}>
//             Cancel
//           </CButton>
//           <CButton style={{ backgroundColor: "#00B5E2", color: "white" }} onClick={handleSave} disabled={loading}>
//             {loading ? (
//               <>
//                 <CSpinner size="sm" className="me-2" /> {isEditing ? "Updating..." : "Adding..."}
//               </>
//             ) : isEditing ? (
//               "Save Changes"
//             ) : (
//               "Add"
//             )}
//           </CButton>
//         </CModalFooter>
//       </CModal>
//     </CCard>
//   )
// }

// export default TelegramAds
// ==================================================================
// "use client";

// import { useState, useEffect } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
//   Spinner,
//   Modal,
//   Table,
//   Alert,
// } from "react-bootstrap";
// import {
//   FaBullhorn,
//   FaEdit,
//   FaPlus,
//   FaChevronLeft,
//   FaChevronRight,
//   FaImage,
// } from "react-icons/fa";
// import { getData, postData } from "../../../apiConfigs/apiCalls";
// import { GET_ALL_ADS, ADD_AD, UPDATE_AD } from "../../../apiConfigs/endpoints";

// const TelegramAds = () => {
//   const [ads, setAds] = useState([]);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedAd, setSelectedAd] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const adsPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1); // Add this line to initialize totalPages

//   // Dark theme colors (matching tasks page)
//   const darkTheme = {
//     bgPrimary: "#0f0f0f",
//     bgSecondary: "#1a1a1a",
//     bgTertiary: "#2d2d2d",
//     bgCard: "#1e1e1e",
//     bgCardHover: "#252525",
//     textPrimary: "#ffffff",
//     textSecondary: "#b0b0b0",
//     textMuted: "#888888",
//     accent1: "#ff6b6b",
//     accent2: "#4ecdc4",
//     accent3: "rgb(139, 92, 246)", // Purple color
//     accent4: "rgb(139, 92, 246)",
//     accent5: "#6c5ce7",
//     shadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
//     shadowHover: "0 20px 40px 0 rgba(0, 0, 0, 0.7)",
//     border: "rgba(255, 255, 255, 0.1)",
//     borderHover: "rgba(255, 255, 255, 0.2)",
//     success: "#28a745",
//     danger: "#dc3545",
//   };

//   // Fetch ads
//   const fetchAds = async () => {
//     try {
//       setLoading(true);
//       console.log("Fetching ads...");
//       const response = await getData(GET_ALL_ADS);
//       console.log("API Response:", response);

//       // Handle different possible response structures based on your backend
//       const adsData = response?.data || response?.ads || [];
//       console.log("Ads data:", adsData);

//       setAds(adsData);
//     } catch (error) {
//       console.error("Error fetching ads:", error);
//       setError("Failed to load ads. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   // Pagination logic
//   const indexOfLastAd = currentPage * adsPerPage;
//   const indexOfFirstAd = indexOfLastAd - adsPerPage;
//   const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

//   const nextPage = () => {
//     const totalPages = Math.ceil(ads.length / adsPerPage);
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Open modal for new ad
//   const handleAddAd = () => {
//     setSelectedAd({
//       adName: "",
//       adSDK: "",
//       adCount: 0,
//       adTimer_InMinutes: 1,
//       adImage: "",
//       rewardPoints: 0,
//       status: "ACTIVE",
//     });
//     setIsEditing(false);
//     setError(null);
//     setSuccess(null);
//     setShowModal(true);
//   };

//   // Open modal for editing ad
//   const handleEditClick = (ad) => {
//     setSelectedAd({ ...ad });
//     setIsEditing(true);
//     setError(null);
//     setSuccess(null);
//     setShowModal(true);
//   };

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedAd((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save or update ad
//   const handleSave = async () => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const userId = localStorage.getItem("id");

//       if (!userId) {
//         throw new Error("User ID not found. Please log in again.");
//       }

//       // Match backend field names exactly
//       const requestBody = {
//         adName: selectedAd.adName,
//         adSDK: selectedAd.adSDK,
//         adCount: Number.parseInt(selectedAd.adCount) || 0,
//         adTimer_InMinutes: Number.parseInt(selectedAd.adTimer_InMinutes) || 1,
//         adImage: selectedAd.adImage,
//         rewardPoints: Number.parseInt(selectedAd.rewardPoints) || 0,
//         status: selectedAd.status,
//         addedBy: userId,
//       };

//       if (isEditing) {
//         requestBody.adId = selectedAd._id;
//         await postData(UPDATE_AD, requestBody);
//         setSuccess("Ad updated successfully!");
//       } else {
//         await postData(ADD_AD, requestBody);
//         setSuccess("Ad added successfully!");
//       }

//       setTimeout(() => {
//         setShowModal(false);
//         setSuccess(null);
//         fetchAds();
//       }, 1500);
//     } catch (error) {
//       setError(
//         `Failed to ${isEditing ? "update" : "add"} ad: ${
//           error.response?.data?.message || error.message || "Unknown error"
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Dark theme loading state
//   if (loading && ads.length === 0) {
//     return (
//       <div
//         style={{
//           background: darkTheme.bgPrimary,
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <div className="text-center">
//           <div
//             style={{
//               width: "80px",
//               height: "80px",
//               border: `4px solid ${darkTheme.bgTertiary}`,
//               borderTop: `4px solid ${darkTheme.accent3}`,
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//               margin: "0 auto 20px",
//             }}
//           />
//           <h3
//             style={{
//               color: darkTheme.textPrimary,
//               fontWeight: "300",
//               marginBottom: "10px",
//             }}
//           >
//             Loading Ads
//           </h3>
//           <p style={{ color: darkTheme.textSecondary }}>Fetching ad data...</p>
//         </div>

//         <style jsx>{`
//           @keyframes spin {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         background: darkTheme.bgPrimary,
//         minHeight: "100vh",
//         padding: "30px 20px",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Dark floating background elements */}
//       <div
//         style={{
//           position: "absolute",
//           top: "5%",
//           left: "5%",
//           width: "200px",
//           height: "200px",
//           borderRadius: "50%",
//           background: darkTheme.bgSecondary,
//           animation: "float 10s ease-in-out infinite",
//           opacity: "0.3",
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: "10%",
//           right: "10%",
//           width: "150px",
//           height: "150px",
//           borderRadius: "50%",
//           background: darkTheme.bgTertiary,
//           animation: "float 12s ease-in-out infinite reverse",
//           opacity: "0.2",
//         }}
//       />

//       <Row className="justify-content-center">
//         <Col xl={12}>
//           <Card
//             style={{
//               background: darkTheme.bgCard,
//               border: `1px solid ${darkTheme.border}`,
//               borderRadius: "25px",
//               overflow: "hidden",
//               boxShadow: darkTheme.shadow,
//               transition: "all 0.3s ease",
//             }}
//           >
//             {/* Card Header */}
//             <div
//               style={{
//                 background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//                 padding: "25px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 position: "relative",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <FaBullhorn
//                   size={24}
//                   style={{ color: "#fff", marginRight: "10px" }}
//                 />
//                 <h3 style={{ color: "#fff", margin: 0, fontWeight: "600" }}>
//                   Telegram Ads
//                 </h3>
//               </div>
//               <Button
//                 onClick={handleAddAd}
//                 style={{
//                   background: "#fff",
//                   border: "none",
//                   borderRadius: "15px",
//                   padding: "12px 25px",
//                   color: darkTheme.accent3,
//                   fontWeight: "600",
//                   textTransform: "uppercase",
//                   letterSpacing: "1px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.transform = "scale(1.05)";
//                   e.target.style.boxShadow = "0 5px 15px rgba(255,255,255,0.3)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.transform = "scale(1)";
//                   e.target.style.boxShadow = "none";
//                 }}
//               >
//                 <FaPlus size={16} />
//                 Add Ad
//               </Button>
//             </div>

//             <Card.Body style={{ padding: "40px" }}>
//               {/* Success/Error Messages */}
//               {success && (
//                 <Alert
//                   style={{
//                     background: `${darkTheme.success}20`,
//                     border: `1px solid ${darkTheme.success}`,
//                     borderRadius: "15px",
//                     color: darkTheme.success,
//                     marginBottom: "20px",
//                   }}
//                   dismissible
//                   onClose={() => setSuccess(null)}
//                 >
//                   <i className="fas fa-check-circle me-2" />
//                   {success}
//                 </Alert>
//               )}

//               {error && (
//                 <Alert
//                   style={{
//                     background: `${darkTheme.danger}20`,
//                     border: `1px solid ${darkTheme.danger}`,
//                     borderRadius: "15px",
//                     color: darkTheme.danger,
//                     marginBottom: "20px",
//                   }}
//                   dismissible
//                   onClose={() => setError(null)}
//                 >
//                   <i className="fas fa-exclamation-triangle me-2" />
//                   {error}
//                 </Alert>
//               )}

//               {/* Ads Table */}
//               <div
//                 style={{
//                   background: darkTheme.bgSecondary,
//                   borderRadius: "15px",
//                   overflow: "hidden",
//                   border: `1px solid ${darkTheme.border}`,
//                 }}
//               >
//                 <Table
//                   responsive
//                   style={{
//                     margin: 0,
//                     color: darkTheme.textPrimary,
//                   }}
//                 >
//                   <thead
//                     style={{
//                       background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//                     }}
//                   >
//                     <tr>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         S.No
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Ad Name
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Ad Function
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Ad Count
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Timer (Min)
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Ad Image
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Reward Points
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Status
//                       </th>
//                       <th
//                         style={{
//                           color: "#fff",
//                           fontWeight: "600",
//                           textTransform: "uppercase",
//                           letterSpacing: "1px",
//                           padding: "20px",
//                           fontSize: "14px",
//                           border: "none",
//                         }}
//                       >
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {loading ? (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           style={{
//                             textAlign: "center",
//                             padding: "40px",
//                             color: darkTheme.textSecondary,
//                             border: "none",
//                           }}
//                         >
//                           <div className="d-flex justify-content-center align-items-center">
//                             <Spinner
//                               style={{
//                                 color: darkTheme.accent3,
//                                 marginRight: "10px",
//                               }}
//                             />
//                             Loading ads...
//                           </div>
//                         </td>
//                       </tr>
//                     ) : currentAds.length > 0 ? (
//                       currentAds.map((ad, index) => (
//                         <tr
//                           key={ad._id}
//                           style={{
//                             borderBottom: `1px solid ${darkTheme.border}`,
//                             transition: "all 0.3s ease",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.backgroundColor =
//                               darkTheme.bgCardHover;
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.backgroundColor =
//                               "transparent";
//                           }}
//                         >
//                           <td
//                             style={{
//                               padding: "20px",
//                               fontWeight: "600",
//                               color: darkTheme.textPrimary,
//                               border: "none",
//                             }}
//                           >
//                             {indexOfFirstAd + index + 1}
//                           </td>
//                           <td
//                             style={{
//                               padding: "20px",
//                               color: darkTheme.textPrimary,
//                               fontWeight: "600",
//                               border: "none",
//                             }}
//                           >
//                             {ad.adName || "N/A"}
//                           </td>
//                           <td
//                             style={{
//                               padding: "20px",
//                               color: darkTheme.textSecondary,
//                               border: "none",
//                             }}
//                           >
//                             {ad.adSDK || "N/A"}
//                           </td>
//                           <td
//                             style={{
//                               padding: "20px",
//                               color: darkTheme.textSecondary,
//                               border: "none",
//                             }}
//                           >
//                             {ad.adCount || 0}
//                           </td>
//                           <td
//                             style={{
//                               padding: "20px",
//                               color: darkTheme.textSecondary,
//                               border: "none",
//                             }}
//                           >
//                             {ad.adTimer_InMinutes || 0}
//                           </td>
//                           <td style={{ padding: "20px", border: "none" }}>
//                             {ad.adImage ? (
//                               <img
//                                 src={ad.adImage || "/placeholder.svg"}
//                                 alt="Ad"
//                                 style={{
//                                   width: "40px",
//                                   height: "40px",
//                                   objectFit: "cover",
//                                   borderRadius: "8px",
//                                   border: `2px solid ${darkTheme.border}`,
//                                 }}
//                                 onError={(e) => {
//                                   e.target.style.display = "none";
//                                   e.target.nextSibling.style.display = "flex";
//                                 }}
//                               />
//                             ) : null}
//                             <div
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 borderRadius: "8px",
//                                 background: darkTheme.bgTertiary,
//                                 display: ad.adImage ? "none" : "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 border: `2px solid ${darkTheme.border}`,
//                               }}
//                             >
//                               <FaImage
//                                 size={16}
//                                 style={{ color: darkTheme.textMuted }}
//                               />
//                             </div>
//                           </td>
//                           <td
//                             style={{
//                               padding: "20px",
//                               color: darkTheme.accent3,
//                               fontWeight: "600",
//                               border: "none",
//                             }}
//                           >
//                             {ad.rewardPoints || 0}
//                           </td>
//                           <td style={{ padding: "20px", border: "none" }}>
//                             <span
//                               style={{
//                                 background:
//                                   ad.status === "ACTIVE"
//                                     ? `${darkTheme.success}20`
//                                     : `${darkTheme.danger}20`,
//                                 color:
//                                   ad.status === "ACTIVE"
//                                     ? darkTheme.success
//                                     : darkTheme.danger,
//                                 padding: "6px 12px",
//                                 borderRadius: "15px",
//                                 fontSize: "12px",
//                                 fontWeight: "600",
//                                 textTransform: "uppercase",
//                                 letterSpacing: "1px",
//                               }}
//                             >
//                               {ad.status || "N/A"}
//                             </span>
//                           </td>
//                           <td style={{ padding: "20px", border: "none" }}>
//                             <Button
//                               onClick={() => handleEditClick(ad)}
//                               style={{
//                                 background: `linear-gradient(135deg, ${darkTheme.accent4}, rgb(139, 92, 246))`,
//                                 border: "none",
//                                 borderRadius: "10px",
//                                 padding: "8px 15px",
//                                 color: "#fff",
//                                 fontWeight: "600",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "5px",
//                                 transition: "all 0.3s ease",
//                               }}
//                               onMouseEnter={(e) => {
//                                 e.target.style.transform = "scale(1.1)";
//                                 e.target.style.boxShadow = `0 5px 15px ${darkTheme.accent4}50`;
//                               }}
//                               onMouseLeave={(e) => {
//                                 e.target.style.transform = "scale(1)";
//                                 e.target.style.boxShadow = "none";
//                               }}
//                             >
//                               <FaEdit size={14} />
//                             </Button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="9"
//                           style={{
//                             textAlign: "center",
//                             padding: "40px",
//                             color: darkTheme.textMuted,
//                             fontWeight: "600",
//                             border: "none",
//                           }}
//                         >
//                           No ads available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </Table>
//               </div>

//               {/* Pagination */}
//               {ads.length > 0 && (
//                 <div className="d-flex justify-content-center mt-4">
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                       background: darkTheme.bgSecondary,
//                       padding: "15px",
//                       borderRadius: "15px",
//                       border: `1px solid ${darkTheme.border}`,
//                     }}
//                   >
//                     {/* Previous Button */}
//                     <button
//                       disabled={currentPage === 1}
//                       onClick={prevPage}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "10px",
//                         border: "none",
//                         background:
//                           currentPage === 1
//                             ? darkTheme.bgTertiary
//                             : `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//                         color: currentPage === 1 ? darkTheme.textMuted : "#fff",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       &#8249;
//                     </button>

//                     {/* Page Numbers */}
//                     {(() => {
//                       const pages = [];
//                       const totalPages = Math.ceil(ads.length / adsPerPage);

//                       const getButtonStyle = (pageNum) => ({
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "10px",
//                         border: "none",
//                         background:
//                           currentPage === pageNum
//                             ? `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`
//                             : darkTheme.bgTertiary,
//                         color:
//                           currentPage === pageNum
//                             ? "#fff"
//                             : darkTheme.textPrimary,
//                         fontWeight: currentPage === pageNum ? "600" : "normal",
//                         transition: "all 0.3s ease",
//                       });

//                       const renderPageButton = (i) => (
//                         <Button
//                           key={i}
//                           style={getButtonStyle(i)}
//                           onClick={() => goToPage(i)}
//                           onMouseEnter={(e) => {
//                             if (currentPage !== i) {
//                               e.target.style.background = darkTheme.bgCardHover;
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (currentPage !== i) {
//                               e.target.style.background = darkTheme.bgTertiary;
//                             }
//                           }}
//                         >
//                           {i}
//                         </Button>
//                       );

//                       if (totalPages <= 7) {
//                         for (let i = 1; i <= totalPages; i++) {
//                           pages.push(renderPageButton(i));
//                         }
//                       } else {
//                         if (currentPage <= 3) {
//                           for (let i = 1; i <= 3; i++) {
//                             pages.push(renderPageButton(i));
//                           }
//                           pages.push(
//                             <span
//                               key="ellipsis1"
//                               style={{
//                                 color: darkTheme.textMuted,
//                                 padding: "0 10px",
//                               }}
//                             >
//                               ...
//                             </span>
//                           );
//                           pages.push(renderPageButton(totalPages));
//                         } else if (currentPage >= totalPages - 2) {
//                           pages.push(renderPageButton(1));
//                           pages.push(
//                             <span
//                               key="ellipsis2"
//                               style={{
//                                 color: darkTheme.textMuted,
//                                 padding: "0 10px",
//                               }}
//                             >
//                               ...
//                             </span>
//                           );
//                           for (let i = totalPages - 2; i <= totalPages; i++) {
//                             pages.push(renderPageButton(i));
//                           }
//                         } else {
//                           pages.push(renderPageButton(1));
//                           pages.push(
//                             <span
//                               key="ellipsis3"
//                               style={{
//                                 color: darkTheme.textMuted,
//                                 padding: "0 10px",
//                               }}
//                             >
//                               ...
//                             </span>
//                           );
//                           for (
//                             let i = currentPage - 1;
//                             i <= currentPage + 1;
//                             i++
//                           ) {
//                             pages.push(renderPageButton(i));
//                           }
//                           pages.push(
//                             <span
//                               key="ellipsis4"
//                               style={{
//                                 color: darkTheme.textMuted,
//                                 padding: "0 10px",
//                               }}
//                             >
//                               ...
//                             </span>
//                           );
//                           pages.push(renderPageButton(totalPages));
//                         }
//                       }

//                       return pages;
//                     })()}

//                     {/* Next Button */}
//                     <button
//                       disabled={currentPage >= totalPages}
//                       onClick={nextPage}
//                       style={{
//                         width: "40px",
//                         height: "40px",
//                         borderRadius: "10px",
//                         border: "none",
//                         background:
//                           currentPage >= totalPages
//                             ? darkTheme.bgTertiary
//                             : `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//                         color:
//                           currentPage >= totalPages
//                             ? darkTheme.textMuted
//                             : "#fff",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         cursor:
//                           currentPage >= totalPages ? "not-allowed" : "pointer",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       &#8250;
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal for Add/Edit Ad */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         backdrop="static"
//         centered
//         size="lg"
//         style={{ zIndex: 9999 }}
//       >
//         <div
//           style={{
//             background: darkTheme.bgCard,
//             border: `1px solid ${darkTheme.border}`,
//             borderRadius: "20px",
//             overflow: "hidden",
//           }}
//         >
//           <Modal.Header
//             style={{
//               background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//               border: "none",
//               padding: "25px",
//             }}
//           >
//             <Modal.Title style={{ color: "#fff", fontWeight: "600" }}>
//               <FaBullhorn size={20} style={{ marginRight: "10px" }} />
//               {isEditing ? "Edit Ad" : "Add New Ad"}
//             </Modal.Title>
//             <Button
//               onClick={() => setShowModal(false)}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "#fff",
//                 fontSize: "34px",
//                 padding: "0",
//                 width: "40px",
//                 height: "70px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: "absolute", // Position it in the top-left corner
//                 top: "10px", // Adjust top position if needed
//                 left: "750px", // Adjust left position for placement
//               }}
//             >
//               ×
//             </Button>
//           </Modal.Header>
//           <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
//             <Row className="g-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Ad Name
//                   </Form.Label>
//                   <Form.Control
//                     name="adName"
//                     value={selectedAd?.adName || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Ad Function (SDK)
//                   </Form.Label>
//                   <Form.Control
//                     name="adSDK"
//                     value={selectedAd?.adSDK || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Ad Count
//                   </Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="adCount"
//                     value={selectedAd?.adCount || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Timer (Minutes)
//                   </Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="adTimer_InMinutes"
//                     value={selectedAd?.adTimer_InMinutes || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Reward Points
//                   </Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="rewardPoints"
//                     value={selectedAd?.rewardPoints || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Status
//                   </Form.Label>
//                   <Form.Select
//                     name="status"
//                     value={selectedAd?.status || ""}
//                     onChange={handleChange}
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   >
//                     <option value="ACTIVE">ACTIVE</option>
//                     <option value="INACTIVE">INACTIVE</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={12}>
//                 <Form.Group>
//                   <Form.Label
//                     style={{
//                       color: darkTheme.textSecondary,
//                       fontSize: "14px",
//                       fontWeight: "600",
//                       textTransform: "uppercase",
//                       letterSpacing: "1px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     Image URL
//                   </Form.Label>
//                   <Form.Control
//                     name="adImage"
//                     value={selectedAd?.adImage || ""}
//                     onChange={handleChange}
//                     placeholder="https://example.com/image.jpg"
//                     style={{
//                       background: darkTheme.bgSecondary,
//                       border: `1px solid ${darkTheme.border}`,
//                       borderRadius: "10px",
//                       color: darkTheme.textPrimary,
//                       padding: "12px 15px",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = darkTheme.accent3;
//                       e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = darkTheme.border;
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </Form.Group>
//                 {selectedAd.adImage && (
//                   <div className="text-center mt-3">
//                     <img
//                       src={selectedAd.adImage || "/placeholder.svg"}
//                       alt="Ad Preview"
//                       style={{
//                         maxWidth: "100%",
//                         maxHeight: "150px",
//                         objectFit: "contain",
//                         borderRadius: "10px",
//                         border: `2px solid ${darkTheme.border}`,
//                       }}
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/placeholder.svg?height=150&width=200";
//                       }}
//                     />
//                   </div>
//                 )}
//               </Col>
//             </Row>
//           </Modal.Body>
//           <Modal.Footer
//             style={{
//               background: darkTheme.bgCard,
//               border: "none",
//               padding: "20px 30px",
//             }}
//           >
//             <Button
//               onClick={() => setShowModal(false)}
//               style={{
//                 background: "transparent",
//                 border: `2px solid ${darkTheme.textMuted}`,
//                 borderRadius: "10px",
//                 padding: "10px 25px",
//                 color: darkTheme.textMuted,
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSave}
//               disabled={loading}
//               style={{
//                 background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
//                 border: "none",
//                 borderRadius: "10px",
//                 padding: "10px 25px",
//                 color: "#fff",
//                 fontWeight: "600",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//               }}
//             >
//               {loading ? (
//                 <>
//                   <Spinner size="sm" />
//                   {isEditing ? "Updating..." : "Adding..."}
//                 </>
//               ) : (
//                 <>{isEditing ? "Save Changes" : "Add Ad"}</>
//               )}
//             </Button>
//           </Modal.Footer>
//         </div>
//       </Modal>

//       {/* CSS animations */}
//       <style jsx>{`
//         @keyframes spin {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TelegramAds;



"use client";

import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Modal,
  Table,
  Alert,
} from "react-bootstrap";
import {
  FaBullhorn,
  FaEdit,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaImage,
} from "react-icons/fa";
import { getData, postData } from "../../../apiConfigs/apiCalls";
import { GET_ALL_ADS, ADD_AD, UPDATE_AD } from "../../../apiConfigs/endpoints";

const TelegramAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const adsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1); // Add this line to initialize totalPages

  // Dark theme colors (matching tasks page)
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
    accent3: "rgb(139, 92, 246)", // Purple color
    accent4: "rgb(139, 92, 246)",
    accent5: "#6c5ce7",
    shadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
    shadowHover: "0 20px 40px 0 rgba(0, 0, 0, 0.7)",
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.2)",
    success: "#28a745",
    danger: "#dc3545",
  };

  // Fetch ads
  const fetchAds = async () => {
    try {
      setLoading(true);
      console.log("Fetching ads...");
      const response = await getData(GET_ALL_ADS);
      console.log("API Response:", response);

      // Handle different possible response structures based on your backend
      const adsData = response?.data || response?.ads || [];
      console.log("Ads data:", adsData);

      setAds(adsData);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError("Failed to load ads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  const nextPage = () => {
    const totalPages = Math.ceil(ads.length / adsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Open modal for new ad
  const handleAddAd = () => {
    setSelectedAd({
      adName: "",
      adSDK: "",
      adCount: 0,
      adTimer_InMinutes: 1,
      adImage: "",
      rewardPoints: 0,
      status: "ACTIVE",
    });
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Open modal for editing ad
  const handleEditClick = (ad) => {
    setSelectedAd({ ...ad });
    setIsEditing(true);
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAd((prev) => ({ ...prev, [name]: value }));
  };

  // Save or update ad
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userId = localStorage.getItem("id");

      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Match backend field names exactly
      const requestBody = {
        adName: selectedAd.adName,
        adSDK: selectedAd.adSDK,
        adCount: Number.parseInt(selectedAd.adCount) || 0,
        adTimer_InMinutes: Number.parseInt(selectedAd.adTimer_InMinutes) || 1,
        adImage: selectedAd.adImage,
        rewardPoints: Number.parseInt(selectedAd.rewardPoints) || 0,
        status: selectedAd.status,
        addedBy: userId,
      };

      if (isEditing) {
        requestBody.adId = selectedAd._id;
        await postData(UPDATE_AD, requestBody);
        setSuccess("Ad updated successfully!");
      } else {
        await postData(ADD_AD, requestBody);
        setSuccess("Ad added successfully!");
      }

      setTimeout(() => {
        setShowModal(false);
        setSuccess(null);
        fetchAds();
      }, 1500);
    } catch (error) {
      setError(
        `Failed to ${isEditing ? "update" : "add"} ad: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Dark theme loading state
  if (loading && ads.length === 0) {
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
          <h3
            style={{
              color: darkTheme.textPrimary,
              fontWeight: "300",
              marginBottom: "10px",
            }}
          >
            Loading Ads
          </h3>
          <p style={{ color: darkTheme.textSecondary }}>Fetching ad data...</p>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
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

      <Row className="justify-content-center">
        <Col xl={12}>
          <Card
            style={{
              background: darkTheme.bgCard,
              border: `1px solid ${darkTheme.border}`,
              borderRadius: "25px",
              overflow: "hidden",
              boxShadow: darkTheme.shadow,
              transition: "all 0.3s ease",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                padding: "25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaBullhorn
                  size={24}
                  style={{ color: "#fff", marginRight: "10px" }}
                />
                <h3 style={{ color: "#fff", margin: 0, fontWeight: "600" }}>
                  Telegram Ads
                </h3>
              </div>
              <Button
                onClick={handleAddAd}
                style={{
                  background: "#fff",
                  border: "none",
                  borderRadius: "15px",
                  padding: "12px 25px",
                  color: darkTheme.accent3,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 5px 15px rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <FaPlus size={16} />
                Add Ad
              </Button>
            </div>

            <Card.Body style={{ padding: "40px" }}>
              {/* Success/Error Messages */}
              {success && (
                <Alert
                  style={{
                    background: `${darkTheme.success}20`,
                    border: `1px solid ${darkTheme.success}`,
                    borderRadius: "15px",
                    color: darkTheme.success,
                    marginBottom: "20px",
                  }}
                  dismissible
                  onClose={() => setSuccess(null)}
                >
                  <i className="fas fa-check-circle me-2" />
                  {success}
                </Alert>
              )}

              {error && (
                <Alert
                  style={{
                    background: `${darkTheme.danger}20`,
                    border: `1px solid ${darkTheme.danger}`,
                    borderRadius: "15px",
                    color: darkTheme.danger,
                    marginBottom: "20px",
                  }}
                  dismissible
                  onClose={() => setError(null)}
                >
                  <i className="fas fa-exclamation-triangle me-2" />
                  {error}
                </Alert>
              )}

              {/* Ads Table */}
              <div
                style={{
                  background: darkTheme.bgSecondary,
                  borderRadius: "15px",
                  overflow: "hidden",
                  border: `1px solid ${darkTheme.border}`,
                }}
              >
                <Table
                  responsive
                  style={{
                    margin: 0,
                    color: darkTheme.textPrimary,
                  }}
                >
                  <thead
                    style={{
                      background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        S.No
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Ad Name
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Ad Function
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Ad Count
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Timer (Min)
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Ad Image
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Reward Points
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center",
                        }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan="9"
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: darkTheme.textSecondary,
                            border: "none",
                          }}
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <Spinner
                              style={{
                                color: darkTheme.accent3,
                                marginRight: "10px",
                              }}
                            />
                            Loading ads...
                          </div>
                        </td>
                      </tr>
                    ) : currentAds.length > 0 ? (
                      currentAds.map((ad, index) => (
                        <tr
                          key={ad._id}
                          style={{
                            borderBottom: `1px solid ${darkTheme.border}`,
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              darkTheme.bgCardHover;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          <td
                            style={{
                              padding: "20px",
                              fontWeight: "600",
                              color: "white",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {indexOfFirstAd + index + 1}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: darkTheme.textPrimary,
                              fontWeight: "600",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {ad.adName || "N/A"}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: "white",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {ad.adSDK || "N/A"}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: "white",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {ad.adCount || 0}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: "white",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {ad.adTimer_InMinutes || 0}
                          </td>
                          <td style={{ padding: "20px", border: "none", textAlign: "center" }}>
                            {ad.adImage ? (
                              <img
                                src={ad.adImage || "/placeholder.svg"}
                                alt="Ad"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  border: `2px solid ${darkTheme.border}`,
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                background: darkTheme.bgTertiary,
                                display: ad.adImage ? "none" : "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: `2px solid ${darkTheme.border}`,
                                margin: "0 auto",
                              }}
                            >
                              <FaImage
                                size={16}
                                style={{ color: darkTheme.textMuted }}
                              />
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: "white",
                              fontWeight: "600",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {ad.rewardPoints || 0}
                          </td>
                          <td style={{ padding: "20px", border: "none", textAlign: "center" }}>
                            <span
                              style={{
                                background:
                                  ad.status === "ACTIVE"
                                    ? `${darkTheme.success}20`
                                    : `${darkTheme.danger}20`,
                                color:
                                  ad.status === "ACTIVE"
                                    ? darkTheme.success
                                    : darkTheme.danger,
                                padding: "6px 12px",
                                borderRadius: "15px",
                                fontSize: "12px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                              }}
                            >
                              {ad.status || "N/A"}
                            </span>
                          </td>
                          <td style={{ padding: "20px", border: "none", textAlign: "center" }}>
                            <Button
                              onClick={() => handleEditClick(ad)}
                              style={{
                                background: `linear-gradient(135deg, ${darkTheme.accent4}, rgb(139, 92, 246))`,
                                border: "none",
                                borderRadius: "10px",
                                padding: "8px 15px",
                                color: "#fff",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                transition: "all 0.3s ease",
                                margin: "0 auto",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.1)";
                                e.target.style.boxShadow = `0 5px 15px ${darkTheme.accent4}50`;
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "none";
                              }}
                            >
                              <FaEdit size={14} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: darkTheme.textMuted,
                            fontWeight: "600",
                            border: "none",
                          }}
                        >
                          No ads available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {ads.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: darkTheme.bgSecondary,
                      padding: "15px",
                      borderRadius: "15px",
                      border: `1px solid ${darkTheme.border}`,
                    }}
                  >
                    {/* Previous Button */}
                    <button
                      disabled={currentPage === 1}
                      onClick={prevPage}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          currentPage === 1
                            ? darkTheme.bgTertiary
                            : `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                        color: currentPage === 1 ? darkTheme.textMuted : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      &#8249;
                    </button>

                    {/* Page Numbers */}
                    {(() => {
                      const pages = [];
                      const totalPages = Math.ceil(ads.length / adsPerPage);

                      const getButtonStyle = (pageNum) => ({
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          currentPage === pageNum
                            ? `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`
                            : darkTheme.bgTertiary,
                        color:
                          currentPage === pageNum
                            ? "#fff"
                            : darkTheme.textPrimary,
                        fontWeight: currentPage === pageNum ? "600" : "normal",
                        transition: "all 0.3s ease",
                      });

                      const renderPageButton = (i) => (
                        <Button
                          key={i}
                          style={getButtonStyle(i)}
                          onClick={() => goToPage(i)}
                          onMouseEnter={(e) => {
                            if (currentPage !== i) {
                              e.target.style.background = darkTheme.bgCardHover;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== i) {
                              e.target.style.background = darkTheme.bgTertiary;
                            }
                          }}
                        >
                          {i}
                        </Button>
                      );

                      if (totalPages <= 7) {
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(renderPageButton(i));
                        }
                      } else {
                        if (currentPage <= 3) {
                          for (let i = 1; i <= 3; i++) {
                            pages.push(renderPageButton(i));
                          }
                          pages.push(
                            <span
                              key="ellipsis1"
                              style={{
                                color: darkTheme.textMuted,
                                padding: "0 10px",
                              }}
                            >
                              ...
                            </span>
                          );
                          pages.push(renderPageButton(totalPages));
                        } else if (currentPage >= totalPages - 2) {
                          pages.push(renderPageButton(1));
                          pages.push(
                            <span
                              key="ellipsis2"
                              style={{
                                color: darkTheme.textMuted,
                                padding: "0 10px",
                              }}
                            >
                              ...
                            </span>
                          );
                          for (let i = totalPages - 2; i <= totalPages; i++) {
                            pages.push(renderPageButton(i));
                          }
                        } else {
                          pages.push(renderPageButton(1));
                          pages.push(
                            <span
                              key="ellipsis3"
                              style={{
                                color: darkTheme.textMuted,
                                padding: "0 10px",
                              }}
                            >
                              ...
                            </span>
                          );
                          for (
                            let i = currentPage - 1;
                            i <= currentPage + 1;
                            i++
                          ) {
                            pages.push(renderPageButton(i));
                          }
                          pages.push(
                            <span
                              key="ellipsis4"
                              style={{
                                color: darkTheme.textMuted,
                                padding: "0 10px",
                              }}
                            >
                              ...
                            </span>
                          );
                          pages.push(renderPageButton(totalPages));
                        }
                      }

                      return pages;
                    })()}

                    {/* Next Button */}
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={nextPage}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          currentPage >= totalPages
                            ? darkTheme.bgTertiary
                            : `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                        color:
                          currentPage >= totalPages
                            ? darkTheme.textMuted
                            : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          currentPage >= totalPages ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Add/Edit Ad */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        centered
        size="lg"
        style={{ zIndex: 9999 }}
      >
        <div
          style={{
            background: darkTheme.bgCard,
            border: `1px solid ${darkTheme.border}`,
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Modal.Header
            style={{
              background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
              border: "none",
              padding: "25px",
            }}
          >
            <Modal.Title style={{ color: "#fff", fontWeight: "600" }}>
              <FaBullhorn size={20} style={{ marginRight: "10px" }} />
              {isEditing ? "Edit Ad" : "Add New Ad"}
            </Modal.Title>
            <Button
              onClick={() => setShowModal(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "34px",
                padding: "0",
                width: "40px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute", // Position it in the top-left corner
                top: "10px", // Adjust top position if needed
                left: "750px", // Adjust left position for placement
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Ad Name
                  </Form.Label>
                  <Form.Control
                    name="adName"
                    value={selectedAd?.adName || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Ad Function (SDK)
                  </Form.Label>
                  <Form.Control
                    name="adSDK"
                    value={selectedAd?.adSDK || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Ad Count
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="adCount"
                    value={selectedAd?.adCount || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Timer (Minutes)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="adTimer_InMinutes"
                    value={selectedAd?.adTimer_InMinutes || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Reward Points
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="rewardPoints"
                    value={selectedAd?.rewardPoints || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Status
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={selectedAd?.status || ""}
                    onChange={handleChange}
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    style={{
                      color: darkTheme.textSecondary,
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "8px",
                    }}
                  >
                    Image URL
                  </Form.Label>
                  <Form.Control
                    name="adImage"
                    value={selectedAd?.adImage || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      background: darkTheme.bgSecondary,
                      border: `1px solid ${darkTheme.border}`,
                      borderRadius: "10px",
                      color: darkTheme.textPrimary,
                      padding: "12px 15px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = darkTheme.accent3;
                      e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = darkTheme.border;
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>
                {selectedAd.adImage && (
                  <div className="text-center mt-3">
                    <img
                      src={selectedAd.adImage || "/placeholder.svg"}
                      alt="Ad Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        border: `2px solid ${darkTheme.border}`,
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=150&width=200";
                      }}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer
            style={{
              background: darkTheme.bgCard,
              border: "none",
              padding: "20px 30px",
            }}
          >
            <Button
              onClick={() => setShowModal(false)}
              style={{
                background: "transparent",
                border: `2px solid ${darkTheme.textMuted}`,
                borderRadius: "10px",
                padding: "10px 25px",
                color: darkTheme.textMuted,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                color: "#fff",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  {isEditing ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{isEditing ? "Save Changes" : "Add Ad"}</>
              )}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* CSS animations */}
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
  );
};

export default TelegramAds;