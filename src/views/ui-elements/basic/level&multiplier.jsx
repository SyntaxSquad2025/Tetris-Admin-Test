// "use client"

// import { useState, useEffect } from "react"
// import {
//   CRow,
//   CCard,
//   CCardHeader,
//   CCardBody,
//   CButton,
//   CFormInput,
//   CFormLabel,
//   CModal,
//   CModalBody,
//   CModalHeader,
//   CModalTitle,
//   CAlert,
//   CSpinner,
//   CCardFooter,
// } from "@coreui/react"
// import { getData, postData } from "../../../apiConfigs/apiCalls"
// import { GET_ALL_LEVELS, UPDATE_GAME } from "../../../apiConfigs/endpoints"

// const LevelMultiplier = () => {
//   const [games, setGames] = useState([])
//   const [selectedGame, setSelectedGame] = useState(null)
//   const [editModalVisible, setEditModalVisible] = useState(false)
//   const [levelRows, setLevelRows] = useState([])
//   const [adSDKRows, setAdSDKRows] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [minTicket, setMinTicket] = useState("10")
//   const [maxTicket, setMaxTicket] = useState("1000")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [modalVisible, setModalVisible] = useState(false)
//   const [addLevelModalVisible, setAddLevelModalVisible] = useState(false)
//   const [editLevelModalVisible, setEditLevelModalVisible] = useState(false)
//   const [addAdSDKModalVisible, setAddAdSDKModalVisible] = useState(false)
//   const [editAdSDKModalVisible, setEditAdSDKModalVisible] = useState(false)
//   const [editingLevelIndex, setEditingLevelIndex] = useState(-1)
//   const [editingAdSDKIndex, setEditingAdSDKIndex] = useState(-1)
//   const [editingLevel, setEditingLevel] = useState({
//     level: "",
//     roadspeed: "",
//     enemyspeed: "",
//     obstaclespawnrate: "",
//     coinvalue: "",
//     potholerate: "",
//     coinseriescount: "",
//     coinseriesspacing: "",
//     coinseriesdistance: "",
//     lastpotholedistance: "",
//     leveldistance: "",
//     adwatchesleft: "",
//     lives: "",
//   })
//   const [newLevel, setNewLevel] = useState({
//     level: "",
//     roadspeed: "",
//     enemyspeed: "",
//     obstaclespawnrate: "",
//     coinvalue: "",
//     potholerate: "",
//     coinseriescount: "",
//     coinseriesspacing: "",
//     coinseriesdistance: "",
//     lastpotholedistance: "",
//     leveldistance: "",
//     adwatchesleft: "",
//     lives: "",
//   })
//   const [newAdSDK, setNewAdSDK] = useState({
//     adSDK: "",
//     expiryTime: "",
//   })
//   const [editingAdSDK, setEditingAdSDK] = useState({
//     adSDK: "",
//     expiryTime: "",
//   })
//   const [expiryTime, setExpiryTime] = useState("")
//   const gamesPerPage = 10

//   // Fetch all games/levels from the backend
//   const fetchGames = async () => {
//     setLoading(true)
//     try {
//       const response = await getData(GET_ALL_LEVELS)
//       console.log("GET_ALL_LEVELS Response:", response)
//       setGames(response.data || [])
//       setError(null)
//     } catch (error) {
//       // setError("Failed to load games. Please try again.")
//       console.error("Error fetching games:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchGames()
//   }, [])

//   // Pagination logic
//   const indexOfLastGame = currentPage * gamesPerPage
//   const indexOfFirstGame = indexOfLastGame - gamesPerPage
//   const currentGames = games.slice(indexOfFirstGame, indexOfLastGame)

//   const nextPage = () => {
//     if (indexOfLastGame < games.length) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   const openModal = (game) => {
//     setSelectedGame(game)
//     // Use the level data directly from the game object if available
//     if (game.level && Array.isArray(game.level)) {
//       setLevelRows(game.level)
//     } else {
//       // Default level rows if none exist
//       setLevelRows([
//         {
//           level: "1",
//           roadspeed: "",
//           enemyspeed: "",
//           obstaclespawnrate: "",
//           coinvalue: "",
//           potholerate: "",
//           coinseriescount: "",
//           coinseriesspacing: "",
//           coinseriesdistance: "",
//           lastpotholedistance: "",
//           leveldistance: "",
//           adwatchesleft: "",
//           lives: "",
//         },
//       ])
//     }

//     // Set adSDK data if available
//     if (game.adSDK && Array.isArray(game.adSDK)) {
//       setAdSDKRows(game.adSDK)
//     } else {
//       setAdSDKRows([])
//     }

//     setMinTicket(game.min || "10")
//     setMaxTicket(game.max || "1000")
//     setExpiryTime(game.ExpiryTime || "")
//     setModalVisible(true)
//   }

//   const closeModal = () => {
//     setModalVisible(false)
//     setSelectedGame(null)
//   }

//   const handleEditClick = (game) => {
//     setSelectedGame(game)
//     // Use the level data directly from the game object if available
//     if (game.level && Array.isArray(game.level)) {
//       setLevelRows(game.level)
//     } else {
//       // Default level rows if none exist
//       setLevelRows([
//         {
//           level: "1",
//           roadspeed: "",
//           enemyspeed: "",
//           obstaclespawnrate: "",
//           coinvalue: "",
//           potholerate: "",
//           coinseriescount: "",
//           coinseriesspacing: "",
//           coinseriesdistance: "",
//           lastpotholedistance: "",
//           leveldistance: "",
//           adwatchesleft: "",
//           lives: "",
//         },
//       ])
//     }

//     // Set adSDK data if available
//     if (game.adSDK && Array.isArray(game.adSDK)) {
//       setAdSDKRows(game.adSDK)
//     } else {
//       setAdSDKRows([])
//     }

//     setMinTicket(game.min || "10")
//     setMaxTicket(game.max || "1000")
//     setExpiryTime(game.ExpiryTime || "")
//     setEditModalVisible(true)
//   }

//   // Open the edit level modal for a specific level
//   const handleEditLevel = (index) => {
//     setEditingLevelIndex(index)
//     setEditingLevel({ ...levelRows[index] })
//     setEditLevelModalVisible(true)
//   }

//   // Open the edit adSDK modal for a specific adSDK
//   const handleEditAdSDK = (index) => {
//     setEditingAdSDKIndex(index)
//     setEditingAdSDK({
//       adSDK: adSDKRows[index].adSDK,
//       expiryTime: adSDKRows[index].expiryTime || "",
//     })
//     setEditAdSDKModalVisible(true)
//   }

//   // Add a new level row with default values
//   const handleAddLevel = () => {
//     const highestLevel = levelRows.reduce((max, row) => {
//       const levelNum = Number.parseInt(row.level) || 0
//       return levelNum > max ? levelNum : max
//     }, 0)

//     // Set up the new level with the next number
//     setNewLevel({
//       level: (highestLevel + 1).toString(),
//       roadspeed: "",
//       enemyspeed: "",
//       obstaclespawnrate: "",
//       coinvalue: "",
//       potholerate: "",
//       coinseriescount: "",
//       coinseriesspacing: "",
//       coinseriesdistance: "",
//       lastpotholedistance: "",
//       leveldistance: "",
//       adwatchesleft: "",
//       lives: "",
//     })

//     // Open the add level modal
//     setAddLevelModalVisible(true)
//   }

//   // Add a new adSDK entry
//   const handleAddAdSDK = () => {
//     setNewAdSDK({
//       adSDK: "",
//       expiryTime: "",
//       _id: "",
//     })
//     setAddAdSDKModalVisible(true)
//   }

//   const handleRemoveLevel = (index) => {
//     const newRows = [...levelRows]
//     newRows.splice(index, 1)
//     setLevelRows(newRows)
//   }

//   const handleRemoveAdSDK = (index) => {
//     const newRows = [...adSDKRows]
//     newRows.splice(index, 1)
//     setAdSDKRows(newRows)
//   }

//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value)
//   }

//   const handleNewLevelChange = (field, value) => {
//     setNewLevel({
//       ...newLevel,
//       [field]: value,
//     })
//   }

//   const handleEditingLevelChange = (field, value) => {
//     setEditingLevel({
//       ...editingLevel,
//       [field]: value,
//     })
//   }

//   // Update the handleNewAdSDKChange function to handle both adSDK and expiryTime
//   const handleNewAdSDKChange = (field, value) => {
//     setNewAdSDK({
//       ...newAdSDK,
//       [field]: value,
//     })
//   }

//   const handleEditingAdSDKChange = (field, value) => {
//     setEditingAdSDK({
//       ...editingAdSDK,
//       [field]: value,
//     })
//   }

//   const handleSaveNewLevel = () => {
//     // Add the new level to the existing levels
//     setLevelRows([...levelRows, newLevel])

//     // Close the modal
//     setAddLevelModalVisible(false)

//     // Reset the new level form
//     setNewLevel({
//       level: "",
//       roadspeed: "",
//       enemyspeed: "",
//       obstaclespawnrate: "",
//       coinvalue: "",
//       potholerate: "",
//       coinseriescount: "",
//       coinseriesspacing: "",
//       coinseriesdistance: "",
//       lastpotholedistance: "",
//       leveldistance: "",
//       adwatchesleft: "",
//       lives: "",
//     })
//   }

//   const handleSaveNewAdSDK = () => {
//     // Add the new adSDK to the existing adSDKs
//     setAdSDKRows([
//       ...adSDKRows,
//       {
//         adSDK: newAdSDK.adSDK,
//         expiryTime: newAdSDK.expiryTime,
//       },
//     ])

//     // Close the modal
//     setAddAdSDKModalVisible(false)

//     // Reset the new adSDK form
//     setNewAdSDK({
//       adSDK: "",
//       expiryTime: "",
//     })
//   }

//   const handleSaveEditingLevel = () => {
//     // Update the level in the levelRows array
//     const newRows = [...levelRows]
//     newRows[editingLevelIndex] = editingLevel
//     setLevelRows(newRows)

//     // Close the modal
//     setEditLevelModalVisible(false)
//     setEditingLevelIndex(-1)
//   }

//   const handleSaveEditingAdSDK = () => {
//     // Update the adSDK in the adSDKRows array
//     const newRows = [...adSDKRows]
//     // Preserve the _id if it exists and update both adSDK and expiryTime
//     newRows[editingAdSDKIndex] = {
//       ...newRows[editingAdSDKIndex],
//       adSDK: editingAdSDK.adSDK,
//       expiryTime: editingAdSDK.expiryTime,
//     }
//     setAdSDKRows(newRows)

//     // Close the modal
//     setEditAdSDKModalVisible(false)
//     setEditingAdSDKIndex(-1)
//   }

//   // Update the handleSaveChanges function to ensure adSDK data includes expiryTime
//   const handleSaveChanges = async () => {
//     if (!selectedGame || !selectedGame._id) {
//       setError("Game ID is missing. Cannot update.")
//       return
//     }

//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       // Prepare the data for the API call
//       // Make sure adSDK entries include both adSDK and expiryTime fields
//       const formattedAdSDKRows = adSDKRows.map((row) => ({
//         adSDK: row.adSDK
//       }))

//       const gameData = {
//         gameId: selectedGame._id,
//         min: minTicket,
//         max: maxTicket,
//         level: levelRows,
//         adSDK: formattedAdSDKRows,
//         ExpiryTime: expiryTime,
//       }

//       console.log("Saving changes for game:", selectedGame._id)
//       console.log("Update data:", gameData)

//       // Make the API call to update the game
//       const response = await postData(`${UPDATE_GAME}/${selectedGame._id}`, gameData)

//       console.log("Update response:", response)
//       setSuccess("Game settings updated successfully!")

//       // Close modal after a short delay to show the success message
//       setTimeout(() => {
//         setEditModalVisible(false)
//         fetchGames() // Refresh the games list
//       }, 1500)
//     } catch (error) {
//       setError(`Failed to update game settings: ${error.response?.data?.message || error.message || "Unknown error"}`)
//       console.error("Error updating game:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <CCard className="mb-4 shadow-lg">
//         <CCardHeader
//           style={{
//             backgroundColor: "#00B5E2",
//             color: "white",
//           }}
//           className="text-center"
//         >
//           <h5 className="fw-bold">Level Management</h5>
//         </CCardHeader>

//         <CCardBody>
//           {success && (
//             <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
//               {success}
//             </CAlert>
//           )}

//           {error && (
//             <CAlert color="danger" dismissible onClose={() => setError(null)}>
//               {error}
//             </CAlert>
//           )}

//           {loading && !modalVisible && !editModalVisible && (
//             <div className="text-center my-3">
//               <CSpinner color="primary" />
//               <p className="mt-2">Loading games...</p>
//             </div>
//           )}

//           <CRow>
//             <div className="container">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover text-center align-middle">
//                   <thead style={{ backgroundColor: "#00B5E2", color: "black" }}>
//                     <tr>
//                       <th>S.No</th>
//                       <th>Game Title</th>
//                       <th>Level</th>
//                       <th>ADSDK</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {currentGames.length > 0 ? (
//                       currentGames.map((game, index) => (
//                         <tr key={game._id} className="table-light">
//                           <td className="fw-bold">{indexOfFirstGame + index + 1}</td>
//                           <td>{game.gameTitle || game.name || "Game " + (index + 1)}</td>
//                           <td>{game.level && Array.isArray(game.level) ? game.level.length : 0}</td>
//                           <td>{game.adSDK && Array.isArray(game.adSDK) ? game.adSDK.length : 0}</td>
//                           <td>
//                             <CButton
//                               style={{
//                                 color: "black",
//                               }}
//                               className="me-2"
//                               onClick={() => openModal(game)}
//                             >
//                               <i className="fas fa-eye" style={{ color: "black" }}></i>
//                             </CButton>
//                             <CButton
//                               style={{
//                                 color: "black",
//                               }}
//                               className="me-2"
//                               onClick={() => handleEditClick(game)}
//                             >
//                               <i className="fas fa-edit" style={{ color: "black" }}></i>
//                             </CButton>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="text-center text-muted fw-bold py-3">
//                           {loading ? "Loading..." : "No levels available"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {games.length > gamesPerPage && (
//                 <div className="d-flex justify-content-center align-items-center mt-4">
//                   <CButton
//                     style={{
//                       backgroundColor: "#00B5E2",
//                       borderColor: "#00B5E2",
//                       color: "black",
//                     }}
//                     className="me-3"
//                     disabled={currentPage === 1}
//                     onClick={prevPage}
//                   >
//                     ← Prev
//                   </CButton>
//                   <span className="fw-bold text-secondary">
//                     Page {currentPage} of {Math.ceil(games.length / gamesPerPage)}
//                   </span>
//                   <CButton
//                     style={{
//                       backgroundColor: "#00B5E2",
//                       borderColor: "#00B5E2",
//                       color: "black",
//                     }}
//                     className="ms-3"
//                     disabled={indexOfLastGame >= games.length}
//                     onClick={nextPage}
//                   >
//                     Next →
//                   </CButton>
//                 </div>
//               )}
//             </div>
//           </CRow>
//         </CCardBody>
//       </CCard>

//       {/* Modal for Viewing Level */}
//       <CModal visible={modalVisible} onClose={closeModal} backdrop="static" size="xl" fullscreen="lg" scrollable>
//         <CModalHeader closeButton>
//           <CModalTitle>View Level</CModalTitle>
//         </CModalHeader>
//         <CModalBody style={{ padding: "1.0rem" }}>
//           {loading ? (
//             <div className="text-center my-3">
//               <CSpinner color="primary" />
//               <p className="mt-2">Loading level data...</p>
//             </div>
//           ) : (
//             <>
//               <div className="mb-4">
//                 <p>
//                   Admin can modify the Min number of level, which enables user to withdraw the reward after completing
//                   that level with Equivalent Multiplier for that level.
//                 </p>
//               </div>

//               {/* Game Minimum Ticket */}
//               <div className="mb-3">
//                 <CFormLabel>Game Minimum Ticket</CFormLabel>
//                 <CFormInput type="number" value={minTicket} style={{ backgroundColor: "#f8f9fa" }} readOnly />
//               </div>

//               {/* Game Maximum Ticket */}
//               <div className="mb-4">
//                 <CFormLabel>Game Maximum Ticket</CFormLabel>
//                 <CFormInput type="number" value={maxTicket} style={{ backgroundColor: "#f8f9fa" }} readOnly />
//               </div>

//               {/* Game Expiry Time */}
//               <div className="mb-4">
//                 <CFormLabel>Expiry Time</CFormLabel>
//                 <CFormInput type="number" value={expiryTime} readOnly style={{ backgroundColor: "#f8f9fa" }} />
//               </div>

//               {/* Level Data Table */}
//               <h5 className="mb-3">Level Data (Total: {levelRows.length})</h5>
//               <div className="table-responsive mb-4">
//                 <table className="table table-bordered table-hover">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>Level</th>
//                       <th>RoadSpeed</th>
//                       <th>EnemySpeed</th>
//                       <th>ObstacleSpawnRate</th>
//                       <th>CoinValue</th>
//                       <th>PotholeRate</th>
//                       <th>CoinSeriesCount</th>
//                       <th>CoinSeriesSpacing</th>
//                       <th>CoinSeriesDistance</th>
//                       <th>LastPotholeDistance</th>
//                       <th>LevelDistance</th>
//                       <th>AdWatchesLeft</th>
//                       <th>Lives</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {levelRows.map((row, index) => (
//                       <tr key={index}>
//                         <td>{row.level}</td>
//                         <td>{row.roadspeed}</td>
//                         <td>{row.enemyspeed}</td>
//                         <td>{row.obstaclespawnrate}</td>
//                         <td>{row.coinvalue}</td>
//                         <td>{row.potholerate}</td>
//                         <td>{row.coinseriescount}</td>
//                         <td>{row.coinseriesspacing}</td>
//                         <td>{row.coinseriesdistance}</td>
//                         <td>{row.lastpotholedistance}</td>
//                         <td>{row.leveldistance}</td>
//                         <td>{row.adwatchesleft}</td>
//                         <td>{row.lives}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* AdSDK Data Table */}
//               <h5 className="mb-3">ADSDK Data (Total: {adSDKRows.length})</h5>
//               <div className="table-responsive mb-4">
//                 <table className="table table-bordered table-hover">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>S.No</th>
//                       <th>ADSDK</th>
//                       <th>ID</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {adSDKRows.length > 0 ? (
//                       adSDKRows.map((row, index) => (
//                         <tr key={index}>
//                           <td>{index + 1}</td>
//                           <td>{row.adSDK}</td>
//                           <td>{row._id}</td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="3" className="text-center text-muted py-3">
//                           No ADSDK data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               <hr className="my-4" />

//               <div className="d-flex justify-content-end">
//                 <CButton
//                   onClick={closeModal}
//                   style={{
//                     backgroundColor: "#00B5E2",
//                     borderColor: "#00B5E2",
//                     color: "white",
//                   }}
//                 >
//                   Go Back
//                 </CButton>
//               </div>
//             </>
//           )}
//         </CModalBody>
//       </CModal>

//       {/* Edit Modal */}
//       <CModal
//         visible={editModalVisible}
//         onClose={() => setEditModalVisible(false)}
//         backdrop="static"
//         size="xl"
//         fullscreen="lg"
//         scrollable
//       >
//         <CModalHeader closeButton>
//           <CModalTitle>Edit Level</CModalTitle>
//         </CModalHeader>
//         <CModalBody style={{ padding: "1.0rem" }}>
//           {loading ? (
//             <div className="text-center my-3">
//               <CSpinner color="primary" />
//               <p className="mt-2">Loading level data...</p>
//             </div>
//           ) : (
//             <>
//               {success && (
//                 <CAlert color="success" dismissible onClose={() => setSuccess(null)}>
//                   {success}
//                 </CAlert>
//               )}

//               {error && (
//                 <CAlert color="danger" dismissible onClose={() => setError(null)}>
//                   {error}
//                 </CAlert>
//               )}

//               <div className="mb-4">
//                 <p>
//                   Admin can modify the Min number of level, which enables user to withdraw the reward after completing
//                   that level with Equivalent Multiplier for that level.
//                 </p>
//               </div>

//               {/* Game Minimum Ticket */}
//               <div className="mb-3">
//                 <CFormLabel>Game Minimum Ticket</CFormLabel>
//                 <CFormInput
//                   type="number"
//                   value={minTicket}
//                   onChange={handleInputChange(setMinTicket)}
//                   style={{ backgroundColor: "#f8f9fa" }}
//                 />
//               </div>

//               {/* Game Maximum Ticket */}
//               <div className="mb-4">
//                 <CFormLabel>Game Maximum Ticket</CFormLabel>
//                 <CFormInput
//                   type="number"
//                   value={maxTicket}
//                   onChange={handleInputChange(setMaxTicket)}
//                   style={{ backgroundColor: "#f8f9fa" }}
//                 />
//               </div>

//               {/* Game Expiry Time */}
//               <div className="mb-4">
//                 <CFormLabel>Expiry Time</CFormLabel>
//                 <CFormInput
//                   type="number"
//                   value={expiryTime}
//                   onChange={(e) => setExpiryTime(e.target.value)}
//                   style={{ backgroundColor: "#f8f9fa" }}
//                 />
//               </div>

//               {/* Level Data Table */}
//               <h5 className="mb-3">Level Data (Total: {levelRows.length})</h5>
//               <div className="table-responsive mb-4">
//                 <table className="table table-bordered">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>Level</th>
//                       <th>RoadSpeed</th>
//                       <th>EnemySpeed</th>
//                       <th>ObstacleSpawnRate</th>
//                       <th>CoinValue</th>
//                       <th>PotholeRate</th>
//                       <th>CoinSeriesCount</th>
//                       <th>CoinSeriesSpacing</th>
//                       <th>CoinSeriesDistance</th>
//                       <th>LastPotholeDistance</th>
//                       <th>LevelDistance</th>
//                       <th>AdWatchesLeft</th>
//                       <th>Lives</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {levelRows.map((row, index) => (
//                       <tr key={index}>
//                         <td>{row.level}</td>
//                         <td>{row.roadspeed}</td>
//                         <td>{row.enemyspeed}</td>
//                         <td>{row.obstaclespawnrate}</td>
//                         <td>{row.coinvalue}</td>
//                         <td>{row.potholerate}</td>
//                         <td>{row.coinseriescount}</td>
//                         <td>{row.coinseriesspacing}</td>
//                         <td>{row.coinseriesdistance}</td>
//                         <td>{row.lastpotholedistance}</td>
//                         <td>{row.leveldistance}</td>
//                         <td>{row.adwatchesleft}</td>
//                         <td>{row.lives}</td>
//                         <td>
//                           <CButton color="primary" size="sm" className="me-1" onClick={() => handleEditLevel(index)}>
//                             <i className="fas fa-edit"></i>
//                           </CButton>
//                           {index > 0 && (
//                             <CButton color="danger" size="sm" onClick={() => handleRemoveLevel(index)}>
//                               <i className="fas fa-trash"></i>
//                             </CButton>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Add Level Button */}
//               <div className="d-flex justify-content-end mb-4">
//                 <CButton
//                   style={{
//                     backgroundColor: "#00B5E2",
//                     borderColor: "#00B5E2",
//                     color: "white",
//                   }}
//                   onClick={handleAddLevel}
//                 >
//                   <i className="fas fa-plus me-2"></i> Add Level
//                 </CButton>
//               </div>

//               {/* AdSDK Data Table */}
//               <h5 className="mb-3">ADSDK Data (Total: {adSDKRows.length})</h5>
//               <div className="table-responsive mb-4">
//                 <table className="table table-bordered">
//                   <thead className="bg-light">
//                     <tr>
//                       <th>S.No</th>
//                       <th>ADSDK</th>
//                       <th>ID</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {adSDKRows.length > 0 ? (
//                       adSDKRows.map((row, index) => (
//                         <tr key={index}>
//                           <td>{index + 1}</td>
//                           <td>{row.adSDK}</td>
//                           <td>{row._id}</td>
//                           <td>
//                             <CButton color="primary" size="sm" className="me-1" onClick={() => handleEditAdSDK(index)}>
//                               <i className="fas fa-edit"></i>
//                             </CButton>
//                             <CButton color="danger" size="sm" onClick={() => handleRemoveAdSDK(index)}>
//                               <i className="fas fa-trash"></i>
//                             </CButton>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center text-muted py-3">
//                           No ADSDK data available
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Add ADSDK Button */}
//               <div className="d-flex justify-content-end mb-4">
//                 <CButton
//                   style={{
//                     backgroundColor: "#00B5E2",
//                     borderColor: "#00B5E2",
//                     color: "white",
//                   }}
//                   onClick={handleAddAdSDK}
//                 >
//                   <i className="fas fa-plus me-2"></i> Add ADSDK
//                 </CButton>
//               </div>

//               <hr className="my-4" />

//               <div className="d-flex justify-content-end">
//                 <CButton
//                   color="secondary"
//                   onClick={() => setEditModalVisible(false)}
//                   className="me-2"
//                   style={{
//                     backgroundColor: "#6c757d",
//                     borderColor: "#6c757d",
//                   }}
//                   disabled={loading}
//                 >
//                   Cancel
//                 </CButton>
//                 <CButton
//                   onClick={handleSaveChanges}
//                   style={{
//                     backgroundColor: "#00B5E2",
//                     borderColor: "#00B5E2",
//                     color: "white",
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <CSpinner size="sm" className="me-2" /> Saving...
//                     </>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </CButton>
//               </div>
//             </>
//           )}
//         </CModalBody>
//       </CModal>

//       {/* Add Level Modal */}
//       <CModal visible={addLevelModalVisible} onClose={() => setAddLevelModalVisible(false)} backdrop="static" size="lg">
//         <CModalHeader closeButton>
//           <CModalTitle>Add New Level</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CCard className="border-0">
//             <CCardBody>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Level</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.level}
//                     onChange={(e) => handleNewLevelChange("level", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Road Speed</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.roadspeed}
//                     onChange={(e) => handleNewLevelChange("roadspeed", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Enemy Speed</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.enemyspeed}
//                     onChange={(e) => handleNewLevelChange("enemyspeed", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Obstacle Spawn Rate</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.obstaclespawnrate}
//                     onChange={(e) => handleNewLevelChange("obstaclespawnrate", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Value</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.coinvalue}
//                     onChange={(e) => handleNewLevelChange("coinvalue", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Pothole Rate</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.potholerate}
//                     onChange={(e) => handleNewLevelChange("potholerate", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Count</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.coinseriescount}
//                     onChange={(e) => handleNewLevelChange("coinseriescount", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Spacing</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.coinseriesspacing}
//                     onChange={(e) => handleNewLevelChange("coinseriesspacing", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.coinseriesdistance}
//                     onChange={(e) => handleNewLevelChange("coinseriesdistance", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Last Pothole Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.lastpotholedistance}
//                     onChange={(e) => handleNewLevelChange("lastpotholedistance", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-4">
//                   <CFormLabel>Level Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.leveldistance}
//                     onChange={(e) => handleNewLevelChange("leveldistance", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <CFormLabel>Ad Watches Left</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.adwatchesleft}
//                     onChange={(e) => handleNewLevelChange("adwatchesleft", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <CFormLabel>Lives</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newLevel.lives}
//                     onChange={(e) => handleNewLevelChange("lives", e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CCardBody>
//             <CCardFooter className="d-flex justify-content-end">
//               <CButton color="secondary" onClick={() => setAddLevelModalVisible(false)} className="me-2">
//                 Cancel
//               </CButton>
//               <CButton
//                 style={{
//                   backgroundColor: "#00B5E2",
//                   borderColor: "#00B5E2",
//                   color: "white",
//                 }}
//                 onClick={handleSaveNewLevel}
//               >
//                 Save Level
//               </CButton>
//             </CCardFooter>
//           </CCard>
//         </CModalBody>
//       </CModal>

//       {/* Edit Level Modal */}
//       <CModal
//         visible={editLevelModalVisible}
//         onClose={() => setEditLevelModalVisible(false)}
//         backdrop="static"
//         size="lg"
//       >
//         <CModalHeader closeButton>
//           <CModalTitle>Edit Level {editingLevel.level}</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CCard className="border-0">
//             <CCardBody>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Level</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.level}
//                     onChange={(e) => handleEditingLevelChange("level", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Road Speed</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.roadspeed}
//                     onChange={(e) => handleEditingLevelChange("roadspeed", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Enemy Speed</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.enemyspeed}
//                     onChange={(e) => handleEditingLevelChange("enemyspeed", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Obstacle Spawn Rate</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.obstaclespawnrate}
//                     onChange={(e) => handleEditingLevelChange("obstaclespawnrate", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Value</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.coinvalue}
//                     onChange={(e) => handleEditingLevelChange("coinvalue", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Pothole Rate</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.potholerate}
//                     onChange={(e) => handleEditingLevelChange("potholerate", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Count</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.coinseriescount}
//                     onChange={(e) => handleEditingLevelChange("coinseriescount", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Spacing</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.coinseriesspacing}
//                     onChange={(e) => handleEditingLevelChange("coinseriesspacing", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <CFormLabel>Coin Series Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.coinseriesdistance}
//                     onChange={(e) => handleEditingLevelChange("coinseriesdistance", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <CFormLabel>Last Pothole Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.lastpotholedistance}
//                     onChange={(e) => handleEditingLevelChange("lastpotholedistance", e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-4">
//                   <CFormLabel>Level Distance</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.leveldistance}
//                     onChange={(e) => handleEditingLevelChange("leveldistance", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <CFormLabel>Ad Watches Left</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.adwatchesleft}
//                     onChange={(e) => handleEditingLevelChange("adwatchesleft", e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <CFormLabel>Lives</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingLevel.lives}
//                     onChange={(e) => handleEditingLevelChange("lives", e.target.value)}
//                   />
//                 </div>
//               </div>
//             </CCardBody>
//             <CCardFooter className="d-flex justify-content-end">
//               <CButton color="secondary" onClick={() => setEditLevelModalVisible(false)} className="me-2">
//                 Cancel
//               </CButton>
//               <CButton
//                 style={{
//                   backgroundColor: "#00B5E2",
//                   borderColor: "#00B5E2",
//                   color: "white",
//                 }}
//                 onClick={handleSaveEditingLevel}
//               >
//                 Save Level
//               </CButton>
//             </CCardFooter>
//           </CCard>
//         </CModalBody>
//       </CModal>

//       {/* Add ADSDK Modal */}
//       <CModal visible={addAdSDKModalVisible} onClose={() => setAddAdSDKModalVisible(false)} backdrop="static" size="lg">
//         <CModalHeader closeButton>
//           <CModalTitle>Add New ADSDK</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CCard className="border-0">
//             <CCardBody>
//               <div className="row mb-3">
//                 <div className="col-md-12">
//                   <CFormLabel>ADSDK</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={newAdSDK.adSDK}
//                     onChange={(e) => handleNewAdSDKChange("adSDK", e.target.value)}
//                     placeholder="Enter ADSDK value (e.g., show_8692316)"
//                   />
//                 </div>
//               </div>
//             </CCardBody>
//             <CCardFooter className="d-flex justify-content-end">
//               <CButton color="secondary" onClick={() => setAddAdSDKModalVisible(false)} className="me-2">
//                 Cancel
//               </CButton>
//               <CButton
//                 style={{
//                   backgroundColor: "#00B5E2",
//                   borderColor: "#00B5E2",
//                   color: "white",
//                 }}
//                 onClick={handleSaveNewAdSDK}
//               >
//                 Save ADSDK
//               </CButton>
//             </CCardFooter>
//           </CCard>
//         </CModalBody>
//       </CModal>

//       {/* Edit ADSDK Modal */}
//       <CModal
//         visible={editAdSDKModalVisible}
//         onClose={() => setEditAdSDKModalVisible(false)}
//         backdrop="static"
//         size="lg"
//       >
//         <CModalHeader closeButton>
//           <CModalTitle>Edit ADSDK</CModalTitle>
//         </CModalHeader>
//         <CModalBody>
//           <CCard className="border-0">
//             <CCardBody>
//               <div className="row mb-3">
//                 <div className="col-md-12">
//                   <CFormLabel>ADSDK</CFormLabel>
//                   <CFormInput
//                     type="text"
//                     value={editingAdSDK.adSDK}
//                     onChange={(e) => handleEditingAdSDKChange("adSDK", e.target.value)}
//                     placeholder="Enter ADSDK value (e.g., show_8692316)"
//                   />
//                 </div>
//               </div>
//             </CCardBody>
//             <CCardFooter className="d-flex justify-content-end">
//               <CButton color="secondary" onClick={() => setEditAdSDKModalVisible(false)} className="me-2">
//                 Cancel
//               </CButton>
//               <CButton
//                 style={{
//                   backgroundColor: "#00B5E2",
//                   borderColor: "#00B5E2",
//                   color: "white",
//                 }}
//                 onClick={handleSaveEditingAdSDK}
//               >
//                 Save ADSDK
//               </CButton>
//             </CCardFooter>
//           </CCard>
//         </CModalBody>
//       </CModal>
//     </>
//   )
// }

// export default LevelMultiplier

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
  FaGamepad,
  FaEye,
  FaEdit,
  FaPlus,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { getData, postData } from "../../../apiConfigs/apiCalls";
import { GET_ALL_LEVELS, UPDATE_GAME } from "../../../apiConfigs/endpoints";

const LevelMultiplier = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [levelRows, setLevelRows] = useState([]);
  const [adSDKRows, setAdSDKRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [minTicket, setMinTicket] = useState("10");
  const [maxTicket, setMaxTicket] = useState("1000");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [addLevelModalVisible, setAddLevelModalVisible] = useState(false);
  const [editLevelModalVisible, setEditLevelModalVisible] = useState(false);
  const [addAdSDKModalVisible, setAddAdSDKModalVisible] = useState(false);
  const [editAdSDKModalVisible, setEditAdSDKModalVisible] = useState(false);
  const [editingLevelIndex, setEditingLevelIndex] = useState(-1);
  const [editingAdSDKIndex, setEditingAdSDKIndex] = useState(-1);
  const [editingLevel, setEditingLevel] = useState({
    level: "",
    linesPerLevel: "",
    perLinescore: "",
    speedPerLevel: "",
    multiplier: "",
    quitPopUp: "",
    lives: "",
  });
  const [newLevel, setNewLevel] = useState({
    level: "",
    linesPerLevel: "",
    perLinescore: "",
    speedPerLevel: "",
    multiplier: "",
    quitPopUp: "",
    lives: "",
  });
  const [newAdSDK, setNewAdSDK] = useState({
    adSDK: "",
    expiryTime: "",
  });
  const [editingAdSDK, setEditingAdSDK] = useState({
    adSDK: "",
    expiryTime: "",
  });
  const [expiryTime, setExpiryTime] = useState("");
  const gamesPerPage = 10;

  // Dark theme colors (matching tasks page exactly)
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
    accent4: "#f9ca24",
    accent5: "#6c5ce7",
    shadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
    shadowHover: "0 20px 40px 0 rgba(0, 0, 0, 0.7)",
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.2)",
    success: "#28a745",
    danger: "#dc3545",
  };

  // Fetch all games/levels from the backend
  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await getData(GET_ALL_LEVELS);
      console.log("GET_ALL_LEVELS Response:", response);
      setGames(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching games:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Pagination logic
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const nextPage = () => {
    if (indexOfLastGame < games.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (game) => {
    setSelectedGame(game);
    if (game.level && Array.isArray(game.level)) {
      setLevelRows(game.level);
    } else {
      setLevelRows([
        {
          level: "",
          linesPerLevel: "",
          perLinescore: "",
          speedPerLevel: "",
          multiplier: "",
          quitPopUp: "",
          lives: "",
        },
      ]);
    }

    if (game.adSDK && Array.isArray(game.adSDK)) {
      setAdSDKRows(game.adSDK);
    } else {
      setAdSDKRows([]);
    }

    setMinTicket(game.min || "10");
    setMaxTicket(game.max || "1000");
    setExpiryTime(game.ExpiryTime || "");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  const handleEditClick = (game) => {
    setSelectedGame(game);
    if (game.level && Array.isArray(game.level)) {
      setLevelRows(game.level);
    } else {
      setLevelRows([
        {
          level: "",
          linesPerLevel: "",
          perLinescore: "",
          speedPerLevel: "",
          multiplier: "",
          quitPopUp: "",
          lives: "",
        },
      ]);
    }

    if (game.adSDK && Array.isArray(game.adSDK)) {
      setAdSDKRows(game.adSDK);
    } else {
      setAdSDKRows([]);
    }

    setMinTicket(game.min || "10");
    setMaxTicket(game.max || "1000");
    setExpiryTime(game.ExpiryTime || "");
    setEditModalVisible(true);
  };

  const handleEditLevel = (index) => {
    setEditingLevelIndex(index);
    setEditingLevel({ ...levelRows[index] });
    setEditLevelModalVisible(true);
  };

  const handleEditAdSDK = (index) => {
    setEditingAdSDKIndex(index);
    setEditingAdSDK({
      adSDK: adSDKRows[index].adSDK,
      expiryTime: adSDKRows[index].expiryTime || "",
    });
    setEditAdSDKModalVisible(true);
  };

  const handleAddLevel = () => {
    const highestLevel = levelRows.reduce((max, row) => {
      const levelNum = Number.parseInt(row.level) || 0;
      return levelNum > max ? levelNum : max;
    }, 0);

    setNewLevel({
      level: (highestLevel + 1).toString(),
      level: "",
      linesPerLevel: "",
      perLinescore: "",
      speedPerLevel: "",
      multiplier: "",
      quitPopUp: "",
      lives: "",
    });

    setAddLevelModalVisible(true);
  };

  const handleAddAdSDK = () => {
    setNewAdSDK({
      adSDK: "",
      expiryTime: "",
      _id: "",
    });
    setAddAdSDKModalVisible(true);
  };

  const handleRemoveLevel = (index) => {
    const newRows = [...levelRows];
    newRows.splice(index, 1);
    setLevelRows(newRows);
  };

  const handleRemoveAdSDK = (index) => {
    const newRows = [...adSDKRows];
    newRows.splice(index, 1);
    setAdSDKRows(newRows);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleNewLevelChange = (field, value) => {
    setNewLevel({
      ...newLevel,
      [field]: value,
    });
  };

  const handleEditingLevelChange = (field, value) => {
    setEditingLevel({
      ...editingLevel,
      [field]: value,
    });
  };

  const handleNewAdSDKChange = (field, value) => {
    setNewAdSDK({
      ...newAdSDK,
      [field]: value,
    });
  };

  const handleEditingAdSDKChange = (field, value) => {
    setEditingAdSDK({
      ...editingAdSDK,
      [field]: value,
    });
  };

  const handleSaveNewLevel = () => {
    setLevelRows([...levelRows, newLevel]);
    setAddLevelModalVisible(false);
    setNewLevel({
      level: "",
      linesPerLevel: "",
      perLinescore: "",
      speedPerLevel: "",
      multiplier: "",
      quitPopUp: "",
      lives: "",
    });
  };

  const handleSaveNewAdSDK = () => {
    setAdSDKRows([
      ...adSDKRows,
      {
        adSDK: newAdSDK.adSDK,
        expiryTime: newAdSDK.expiryTime,
      },
    ]);
    setAddAdSDKModalVisible(false);
    setNewAdSDK({
      adSDK: "",
      expiryTime: "",
    });
  };

  const handleSaveEditingLevel = () => {
    const newRows = [...levelRows];
    newRows[editingLevelIndex] = editingLevel;
    setLevelRows(newRows);
    setEditLevelModalVisible(false);
    setEditingLevelIndex(-1);
  };

  const handleSaveEditingAdSDK = () => {
    const newRows = [...adSDKRows];
    newRows[editingAdSDKIndex] = {
      ...newRows[editingAdSDKIndex],
      adSDK: editingAdSDK.adSDK,
      expiryTime: editingAdSDK.expiryTime,
    };
    setAdSDKRows(newRows);
    setEditAdSDKModalVisible(false);
    setEditingAdSDKIndex(-1);
  };

  const handleSaveChanges = async () => {
    if (!selectedGame || !selectedGame._id) {
      setError("Game ID is missing. Cannot update.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formattedAdSDKRows = adSDKRows.map((row) => ({
        adSDK: row.adSDK,
      }));

      const gameData = {
        gameId: selectedGame._id,
        min: minTicket,
        max: maxTicket,
        level: levelRows,
        adSDK: formattedAdSDKRows,
        ExpiryTime: expiryTime,
      };

      console.log("Saving changes for game:", selectedGame._id);
      console.log("Update data:", gameData);

      const response = await postData(
        `${UPDATE_GAME}/${selectedGame._id}`,
        gameData
      );

      console.log("Update response:", response);
      setSuccess("Game settings updated successfully!");

      setTimeout(() => {
        setEditModalVisible(false);
        fetchGames();
      }, 1500);
    } catch (error) {
      setError(
        `Failed to update game settings: ${error.response?.data?.message || error.message || "Unknown error"}`
      );
      console.error("Error updating game:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dark theme loading state
  if (loading && games.length === 0) {
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
            Loading Games
          </h3>
          <p style={{ color: darkTheme.textSecondary }}>
            Fetching level data...
          </p>
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
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaGamepad
                  size={24}
                  style={{ color: "#fff", marginRight: "10px" }}
                />
                <h3 style={{ color: "#fff", margin: 0, fontWeight: "600" }}>
                  Level Management
                </h3>
              </div>
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

              {/* Games Table */}
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
                          textAlign: "center", // Centering the header text
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
                          textAlign: "center", // Centering the header text
                        }}
                      >
                        Game Title
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
                          textAlign: "center", // Centering the header text
                        }}
                      >
                        Level
                      </th>
                      {/* <th
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
                        ADSDK
                      </th> */}
                      <th
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "20px",
                          fontSize: "14px",
                          border: "none",
                          textAlign: "center", // Centering the header text
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
                          colSpan="4"
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
                            Loading games...
                          </div>
                        </td>
                      </tr>
                    ) : currentGames.length > 0 ? (
                      currentGames.map((game, index) => (
                        <tr
                          key={game._id}
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
                              color: darkTheme.textPrimary,
                              border: "none",
                              textAlign: "center", // Centering the data cell content
                            }}
                          >
                            {indexOfFirstGame + index + 1}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: darkTheme.textPrimary,
                              fontWeight: "600",
                              border: "none",
                              textAlign: "center", // Centering the data cell content
                            }}
                          >
                            {game.gameTitle ||
                              game.name ||
                              "Game " + (index + 1)}
                          </td>
                          <td
                            style={{
                              padding: "20px",
                              color: darkTheme.textPrimary,
                              fontWeight: "600",
                              border: "none",
                              textAlign: "center", // Centering the data cell content
                            }}
                          >
                            {game.level && Array.isArray(game.level)
                              ? game.level.length
                              : 0}
                          </td>
                          {/* <td
                            style={{
                              padding: "20px",
                              color: darkTheme.accent2,
                              fontWeight: "600",
                              border: "none",
                              textAlign: "center",
                            }}
                          >
                            {game.adSDK && Array.isArray(game.adSDK)
                              ? game.adSDK.length
                              : 0}
                          </td> */}
                          <td
                            style={{
                              padding: "20px",
                              border: "none",
                              textAlign: "center", // Centering the data cell content
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                              }}
                            >
                              <Button
                                onClick={() => openModal(game)}
                                style={{
                                  background: `linear-gradient(135deg, ${darkTheme.accent2}, #3dd5c7)`,
                                  border: "none",
                                  borderRadius: "10px",
                                  padding: "8px 15px",
                                  color: "#fff",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  transition: "all 0.3s ease",
                                  justifyContent: "center", // Ensuring button is centered
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "scale(1.1)";
                                  e.target.style.boxShadow = `0 5px 15px ${darkTheme.accent2}50`;
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "scale(1)";
                                  e.target.style.boxShadow = "none";
                                }}
                              >
                                <FaEye size={14} />
                              </Button>
                              <Button
                                onClick={() => handleEditClick(game)}
                                style={{
                                  background: `linear-gradient(135deg, ${darkTheme.accent4}, #e6b800)`,
                                  border: "none",
                                  borderRadius: "10px",
                                  padding: "8px 15px",
                                  color: "#fff",
                                  fontWeight: "600",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  transition: "all 0.3s ease",
                                  justifyContent: "center", // Ensuring button is centered
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
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: darkTheme.textMuted,
                            fontWeight: "600",
                            border: "none",
                          }}
                        >
                          {loading ? "Loading..." : "No games available"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {games.length > gamesPerPage && (
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
                    <Button
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
                      <FaChevronLeft size={14} />
                    </Button>

                    <span
                      style={{
                        color: darkTheme.textPrimary,
                        fontWeight: "600",
                        padding: "0 15px",
                      }}
                    >
                      Page {currentPage} of{" "}
                      {Math.ceil(games.length / gamesPerPage)}
                    </span>

                    <Button
                      disabled={indexOfLastGame >= games.length}
                      onClick={nextPage}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "none",
                        background:
                          indexOfLastGame >= games.length
                            ? darkTheme.bgTertiary
                            : `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                        color:
                          indexOfLastGame >= games.length
                            ? darkTheme.textMuted
                            : "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor:
                          indexOfLastGame >= games.length
                            ? "not-allowed"
                            : "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FaChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* View Modal */}
      <Modal
        show={modalVisible}
        onHide={closeModal}
        backdrop="static"
        size="xl"
        fullscreen="lg-down"
        scrollable
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
              <FaEye size={25} style={{ marginRight: "10px" }} />
              View Level
            </Modal.Title>
            <div style={{ position: "relative" }}>
              <Button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "900px",
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "34px",
                  padding: "0",
                  width: "30px",
                  height: "1px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                ×
              </Button>

              {/* Modal content goes here */}
            </div>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
            {loading ? (
              <div className="text-center my-3">
                <Spinner style={{ color: darkTheme.accent3 }} />
                <p
                  style={{ color: darkTheme.textSecondary, marginTop: "10px" }}
                >
                  Loading level data...
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: "30px" }}>
                  <p
                    style={{
                      color: darkTheme.textPrimary,
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    Admin can modify the Min number of level, which enables user
                    to withdraw the reward after completing that level with
                    Equivalent Multiplier for that level.
                  </p>
                </div>

                <Row className="g-4 mb-4">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: darkTheme.textPrimary,
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        Game Minimum Ticket
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={minTicket}
                        readOnly
                        style={{
                          background: darkTheme.bgSecondary,
                          border: `1px solid ${darkTheme.border}`,
                          borderRadius: "10px",
                          color: darkTheme.textPrimary,
                          padding: "12px 15px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: darkTheme.textPrimary,
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        Game Maximum Ticket
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={maxTicket}
                        readOnly
                        style={{
                          background: darkTheme.bgSecondary,
                          border: `1px solid ${darkTheme.border}`,
                          borderRadius: "10px",
                          color: darkTheme.textPrimary,
                          padding: "12px 15px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col md={4}>
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
                        Expiry Time
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={expiryTime}
                        readOnly
                        style={{
                          background: darkTheme.bgSecondary,
                          border: `1px solid ${darkTheme.border}`,
                          borderRadius: "10px",
                          color: darkTheme.textPrimary,
                          padding: "12px 15px",
                        }}
                      />
                    </Form.Group>
                  </Col> */}
                </Row>

                {/* Level Data Table */}
                <div style={{ marginBottom: "30px" }}>
                  <h5
                    style={{
                      color: darkTheme.textPrimary,
                      marginBottom: "15px",
                      fontWeight: "600",
                    }}
                  >
                    Level Data (Total: {levelRows.length})
                  </h5>
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
                          {[
                            "level",
                            "linesPerLevel",
                            "perLinescore",
                            "speedPerLevel",
                            "multiplier",
                            "quitPopUp",
                            "Lives",
                          ].map((header) => (
                            <th
                              key={header}
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                padding: "15px",
                                fontSize: "12px",
                                border: "none",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                              }}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {levelRows.map((row, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: `1px solid ${darkTheme.border}`,
                            }}
                          >
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.level}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.linesPerLevel}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.perLinescore}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.speedPerLevel}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.multiplier}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.quitPopUp}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.lives}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                {/* AdSDK Data Table */}
                {/* <div style={{ marginBottom: "30px" }}>
                  <h5
                    style={{
                      color: darkTheme.textPrimary,
                      marginBottom: "15px",
                      fontWeight: "600",
                    }}
                  >
                    ADSDK Data (Total: {adSDKRows.length})
                  </h5>
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
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
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
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            ADSDK
                          </th>
                          <th
                            style={{
                              color: "#fff",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {adSDKRows.length > 0 ? (
                          adSDKRows.map((row, index) => (
                            <tr
                              key={index}
                              style={{
                                borderBottom: `1px solid ${darkTheme.border}`,
                              }}
                            >
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textPrimary,
                                  border: "none",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textSecondary,
                                  border: "none",
                                }}
                              >
                                {row.adSDK}
                              </td>
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textSecondary,
                                  border: "none",
                                }}
                              >
                                {row._id}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="3"
                              style={{
                                textAlign: "center",
                                padding: "30px",
                                color: darkTheme.textMuted,
                                border: "none",
                              }}
                            >
                              No ADSDK data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div> */}

                <div className="d-flex justify-content-end">
                  <Button
                    onClick={closeModal}
                    style={{
                      background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                      border: "none",
                      borderRadius: "15px",
                      padding: "12px 30px",
                      color: "#fff",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Go Back
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={editModalVisible}
        onHide={() => setEditModalVisible(false)}
        backdrop="static"
        size="xl"
        fullscreen="lg-down"
        scrollable
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
              <FaEdit size={26} style={{ marginRight: "10px" }} />
              Edit Level
            </Modal.Title>
            {/* <Button
              onClick={() => setEditModalVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "28px",
                padding: "0",
                width: "900px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </Button> */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end", // Aligns content (button) to the right
                width: "80%",
              }}
            >
              <Button
                onClick={() => setEditModalVisible(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "38px",
                  padding: "0",
                  width: "1px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                ×
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
            {loading ? (
              <div className="text-center my-3">
                <Spinner style={{ color: darkTheme.accent3 }} />
                <p
                  style={{ color: darkTheme.textSecondary, marginTop: "10px" }}
                >
                  Loading level data...
                </p>
              </div>
            ) : (
              <>
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

                <div style={{ marginBottom: "30px" }}>
                  <p
                    style={{
                      color: darkTheme.textPrimary,
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    Admin can modify the Min number of level, which enables user
                    to withdraw the reward after completing that level with
                    Equivalent Multiplier for that level.
                  </p>
                </div>

                <Row className="g-4 mb-4">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: darkTheme.textPrimary,
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        Game Minimum Ticket
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={minTicket}
                        onChange={handleInputChange(setMinTicket)}
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
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: darkTheme.textPrimary,
                          fontSize: "14px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        Game Maximum Ticket
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={maxTicket}
                        onChange={handleInputChange(setMaxTicket)}
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
                  {/* <Col md={4}>
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
                        Expiry Time
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={expiryTime}
                        onChange={(e) => setExpiryTime(e.target.value)}
                        style={{
                          background: darkTheme.bgSecondary,
                          border: `1px solid ${darkTheme.border}`,
                          borderRadius: "10px",
                          color: darkTheme.textPrimary,
                          padding: "12px 15px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = darkTheme.accent3
                          e.target.style.boxShadow = `0 0 0 3px rgba(139, 92, 246, 0.2)`
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = darkTheme.border
                          e.target.style.boxShadow = "none"
                        }}
                      />
                    </Form.Group>
                  </Col> */}
                </Row>

                {/* Level Data Table */}
                <div style={{ marginBottom: "30px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <h5
                      style={{
                        color: darkTheme.textPrimary,
                        margin: 0,
                        fontWeight: "600",
                      }}
                    >
                      Level Data (Total: {levelRows.length})
                    </h5>
                    <Button
                      onClick={handleAddLevel}
                      style={{
                        background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                        border: "none",
                        borderRadius: "10px",
                        padding: "8px 20px",
                        color: "#fff",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <FaPlus size={12} />
                      Add Level
                    </Button>
                  </div>
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
                          {[
                            "level",
                            "linesPerLevel",
                            "perLinescore",
                            "speedPerLevel",
                            "multiplier",
                            "quitPopUp",
                            "Lives",
                            "Actions",
                          ].map((header) => (
                            <th
                              key={header}
                              style={{
                                color: "#fff",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                padding: "15px",
                                fontSize: "12px",
                                border: "none",
                                whiteSpace: "nowrap",
                                Align: "center",
                              }}
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {levelRows.map((row, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: `1px solid ${darkTheme.border}`,
                            }}
                          >
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.level}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.linesPerLevel}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.perLinescore}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.speedPerLevel}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.multiplier}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.quitPopUp}
                            </td>
                            <td
                              style={{
                                padding: "15px",
                                color: darkTheme.textPrimary,
                                border: "none",
                                textAlign: "center",
                              }}
                            >
                              {row.lives}
                            </td>
                            <td style={{ padding: "15px", border: "none" }}>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <Button
                                  onClick={() => handleEditLevel(index)}
                                  style={{
                                    background: `linear-gradient(135deg, ${darkTheme.accent4}, #e6b800)`,
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "6px 10px",
                                    color: "#fff",
                                    fontSize: "12px",
                                  }}
                                >
                                  <FaEdit size={12} />
                                </Button>
                                {index > 0 && (
                                  <Button
                                    onClick={() => handleRemoveLevel(index)}
                                    style={{
                                      background: `linear-gradient(135deg, ${darkTheme.danger}, #c82333)`,
                                      border: "none",
                                      borderRadius: "8px",
                                      padding: "6px 10px",
                                      color: "#fff",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <FaTrash size={12} />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                {/* AdSDK Data Table */}
                {/* <div style={{ marginBottom: "30px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <h5
                      style={{
                        color: darkTheme.textPrimary,
                        margin: 0,
                        fontWeight: "600",
                      }}
                    >
                      ADSDK Data (Total: {adSDKRows.length})
                    </h5>
                    <Button
                      onClick={handleAddAdSDK}
                      style={{
                        background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                        border: "none",
                        borderRadius: "10px",
                        padding: "8px 20px",
                        color: "#fff",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <FaPlus size={12} />
                      Add ADSDK
                    </Button>
                  </div>
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
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
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
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            ADSDK
                          </th>
                          <th
                            style={{
                              color: "#fff",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            ID
                          </th>
                          <th
                            style={{
                              color: "#fff",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                              padding: "15px",
                              fontSize: "14px",
                              border: "none",
                            }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {adSDKRows.length > 0 ? (
                          adSDKRows.map((row, index) => (
                            <tr
                              key={index}
                              style={{
                                borderBottom: `1px solid ${darkTheme.border}`,
                              }}
                            >
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textPrimary,
                                  border: "none",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textSecondary,
                                  border: "none",
                                }}
                              >
                                {row.adSDK}
                              </td>
                              <td
                                style={{
                                  padding: "15px",
                                  color: darkTheme.textSecondary,
                                  border: "none",
                                }}
                              >
                                {row._id}
                              </td>
                              <td style={{ padding: "15px", border: "none" }}>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <Button
                                    onClick={() => handleEditAdSDK(index)}
                                    style={{
                                      background: `linear-gradient(135deg, ${darkTheme.accent4}, #e6b800)`,
                                      border: "none",
                                      borderRadius: "8px",
                                      padding: "6px 10px",
                                      color: "#fff",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <FaEdit size={12} />
                                  </Button>
                                  <Button
                                    onClick={() => handleRemoveAdSDK(index)}
                                    style={{
                                      background: `linear-gradient(135deg, ${darkTheme.danger}, #c82333)`,
                                      border: "none",
                                      borderRadius: "8px",
                                      padding: "6px 10px",
                                      color: "#fff",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <FaTrash size={12} />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="4"
                              style={{
                                textAlign: "center",
                                padding: "30px",
                                color: darkTheme.textMuted,
                                border: "none",
                              }}
                            >
                              No ADSDK data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div> */}

                <div className="d-flex justify-content-end gap-3">
                  <Button
                    onClick={() => setEditModalVisible(false)}
                    disabled={loading}
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
                    onClick={handleSaveChanges}
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
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
        </div>
      </Modal>

      {/* Add Level Modal */}
      <Modal
        show={addLevelModalVisible}
        onHide={() => setAddLevelModalVisible(false)}
        backdrop="static"
        size="lg"
        style={{ zIndex: 10000 }}
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
              <FaPlus size={20} style={{ marginRight: "10px" }} />
              Add New Level
            </Modal.Title>
            <Button
              onClick={() => setAddLevelModalVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "24px",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
            <Row className="g-3">
              {[
                { label: "Level", field: "level" },
                { label: "Lines Per Level", field: "linesPerLevel" },
                { label: "Per Line Score", field: "perLinescore" },
                { label: "Speed Per Level", field: "speedPerLevel" },
                { label: "Multiplier", field: "multiplier" },
                { label: "Quit PopUp", field: "quitPopUp" },
                { label: "Lives", field: "lives" },
              ].map(({ label, field }) => (
                <Col md={6} key={field}>
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
                      {label}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={newLevel[field]}
                      onChange={(e) =>
                        handleNewLevelChange(field, e.target.value)
                      }
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
              ))}
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
              onClick={() => setAddLevelModalVisible(false)}
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
              onClick={handleSaveNewLevel}
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                color: "#fff",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Save Level
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Edit Level Modal */}
      <Modal
        show={editLevelModalVisible}
        onHide={() => setEditLevelModalVisible(false)}
        backdrop="static"
        size="lg"
        style={{ zIndex: 10000 }}
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
              <FaEdit size={20} style={{ marginRight: "10px" }} />
              Edit Level {editingLevel.level}
            </Modal.Title>
            <Button
              onClick={() => setEditLevelModalVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "24px",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
            <Row className="g-3">
              {[
                { label: "Level", field: "level" },
                { label: "Lines Per Level", field: "linesPerLevel" },
                { label: "Per Line Score", field: "perLinescore" },
                { label: "Speed Per Level", field: "speedPerLevel" },
                { label: "Multiplier", field: "multiplier" },
                { label: "Quit PopUp", field: "quitPopUp" },
                { label: "Lives", field: "lives" },
              ].map(({ label, field }) => (
                <Col md={6} key={field}>
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
                      {label}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={editingLevel[field]}
                      onChange={(e) =>
                        handleEditingLevelChange(field, e.target.value)
                      }
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
              ))}
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
              onClick={() => setEditLevelModalVisible(false)}
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
              onClick={handleSaveEditingLevel}
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                color: "#fff",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Save Level
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Add ADSDK Modal */}
      <Modal
        show={addAdSDKModalVisible}
        onHide={() => setAddAdSDKModalVisible(false)}
        backdrop="static"
        size="lg"
        style={{ zIndex: 10000 }}
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
              <FaPlus size={20} style={{ marginRight: "10px" }} />
              Add New ADSDK
            </Modal.Title>
            <Button
              onClick={() => setAddAdSDKModalVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "24px",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
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
                ADSDK
              </Form.Label>
              <Form.Control
                type="text"
                value={newAdSDK.adSDK}
                onChange={(e) => handleNewAdSDKChange("adSDK", e.target.value)}
                placeholder="Enter ADSDK value (e.g., show_8692316)"
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
          </Modal.Body>
          <Modal.Footer
            style={{
              background: darkTheme.bgCard,
              border: "none",
              padding: "20px 30px",
            }}
          >
            <Button
              onClick={() => setAddAdSDKModalVisible(false)}
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
              onClick={handleSaveNewAdSDK}
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                color: "#fff",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Save ADSDK
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* Edit ADSDK Modal */}
      <Modal
        show={editAdSDKModalVisible}
        onHide={() => setEditAdSDKModalVisible(false)}
        backdrop="static"
        size="lg"
        style={{ zIndex: 10000 }}
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
              <FaEdit size={20} style={{ marginRight: "10px" }} />
              Edit ADSDK
            </Modal.Title>
            <Button
              onClick={() => setEditAdSDKModalVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "24px",
                padding: "0",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </Button>
          </Modal.Header>
          <Modal.Body style={{ padding: "30px", background: darkTheme.bgCard }}>
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
                ADSDK
              </Form.Label>
              <Form.Control
                type="text"
                value={editingAdSDK.adSDK}
                onChange={(e) =>
                  handleEditingAdSDKChange("adSDK", e.target.value)
                }
                placeholder="Enter ADSDK value (e.g., show_8692316)"
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
          </Modal.Body>
          <Modal.Footer
            style={{
              background: darkTheme.bgCard,
              border: "none",
              padding: "20px 30px",
            }}
          >
            <Button
              onClick={() => setEditAdSDKModalVisible(false)}
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
              onClick={handleSaveEditingAdSDK}
              style={{
                background: `linear-gradient(135deg, ${darkTheme.accent3}, #7c3aed)`,
                border: "none",
                borderRadius: "10px",
                padding: "10px 25px",
                color: "#fff",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Save ADSDK
            </Button>
          </Modal.Footer>
        </div>
      </Modal>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
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
};

export default LevelMultiplier;
