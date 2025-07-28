// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { CButton, CCard, CCardBody } from "@coreui/react"

// export default function Logout() {
//   const navigate = useNavigate()
//   const [isOpen, setIsOpen] = useState(true)

//   // Function to handle logout confirmation
//   const handleConfirm = () => {
//     // Clear user data
//     localStorage.removeItem("token")
//     localStorage.removeItem("id")
//     sessionStorage.clear()

//     // Redirect to login page
//     navigate("/", { replace: true })
//   }

//   // Function to handle logout cancellation
//   const handleCancel = () => {
//     // Don't clear any user data when canceling
//     setIsOpen(false)

//     // Use window.history to go back to the previous page instead of a hardcoded route
//     // This ensures we return to wherever the user was before
//     if (window.history.length > 1) {
//       window.history.back()
//     } else {
//       // Fallback if there's no history
//       navigate("/dashboard")
//     }

//     // Add a small delay to ensure the modal is closed before navigation
//     setTimeout(() => {
//       console.log("Cancel logout - returning to previous page")
//     }, 100)
//   }

//   // Close modal if escape key is pressed
//   useEffect(() => {
//     const handleEscapeKey = (event) => {
//       if (event.key === "Escape") {
//         handleCancel()
//       }
//     }

//     document.addEventListener("keydown", handleEscapeKey)
//     return () => {
//       document.removeEventListener("keydown", handleEscapeKey)
//       // Make sure we clean up any timers or state
//       setIsOpen(false)
//     }
//   }, [])

//   if (!isOpen) return null

//   return (
//     <div
//       className="fixed inset-0 d-flex align-items-center justify-content-center"
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 1050,
//       }}
//     >
//       <CCard
//         className="w-100"
//         style={{
//           maxWidth: "400px",
//           backgroundColor: "white",
//           color: "#333",
//           border: "none",
//           borderRadius: "10px",
//           boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <CCardBody className="p-4 text-center">
//           <div className="d-flex flex-column align-items-center">
//             <h2 className="mb-3" style={{ color: "#00B5E2" }}>
//               Logout
//             </h2>
//             <p className="text-center mb-4">Are you sure you want to logout?</p>

//             <div className="d-flex gap-3 w-100 mt-3">
//               <CButton
//                 style={{
//                   backgroundColor: "#f8f9fa",
//                   borderColor: "#dee2e6",
//                   color: "#333",
//                 }}
//                 className="w-50"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </CButton>
//               <CButton
//                 style={{
//                   backgroundColor: "#00B5E2",
//                   borderColor: "#00B5E2",
//                   color: "white",
//                 }}
//                 className="w-50"
//                 onClick={handleConfirm}
//               >
//                 Confirm
//               </CButton>
//             </div>
//           </div>
//         </CCardBody>
//       </CCard>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react"

export default function Logout() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Function to handle logout confirmation
  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      // Clear user data
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")
      localStorage.removeItem("authToken")
      sessionStorage.clear()

      // Small delay for better UX
      setTimeout(() => {
        // Redirect to login page
        navigate("/", { replace: true })
      }, 1000)
    } catch (error) {
      console.error("Logout error:", error)
      // Even if API call fails, still redirect to login
      navigate("/", { replace: true })
    }
  }

  // Function to handle logout cancellation
  const handleCancel = () => {
    setIsOpen(false)

    // Use window.history to go back to the previous page
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // Fallback if there's no history
      navigate("/dashboard")
    }

    setTimeout(() => {
      console.log("Cancel logout - returning to previous page")
    }, 100)
  }

  // Close modal if escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && !isLoading) {
        handleCancel()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
      setIsOpen(false)
    }
  }, [isLoading])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(26, 26, 26, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
        backdropFilter: "blur(5px)",
      }}
    >
      <CCard
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#2d2d2d",
          border: "1px solid #404040",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <CCardHeader
          style={{
            background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
            border: "none",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              color: "white",
              margin: 0,
              fontWeight: "600",
              fontSize: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🚪</span>
            Logout Confirmation
          </h4>
        </CCardHeader>

        <CCardBody
          style={{
            backgroundColor: "#2d2d2d",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #404040",
              borderRadius: "8px",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              🔐
            </div>
            <h5
              style={{
                color: "#ffffff",
                marginBottom: "1rem",
                fontWeight: "600",
              }}
            >
              Are you sure you want to logout?
            </h5>
            <p
              style={{
                color: "#a0a0a0",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                marginBottom: "0",
              }}
            >
              You will be redirected to the login page and will need to sign in again to access your account.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <CButton
              onClick={handleCancel}
              disabled={isLoading}
              style={{
                backgroundColor: "#666",
                border: "none",
                borderRadius: "25px",
                color: "white",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#777"
                  e.target.style.transform = "translateY(-1px)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#666"
                  e.target.style.transform = "translateY(0)"
                }
              }}
            >
              Cancel
            </CButton>
            <CButton
              onClick={handleConfirm}
              disabled={isLoading}
              style={{
                background: isLoading ? "#666" : "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                border: "none",
                borderRadius: "25px",
                color: "white",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(-1px)"
                  e.target.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.4)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "none"
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Logging out...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Confirm Logout
                </>
              )}
            </CButton>
          </div>
        </CCardBody>
      </CCard>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
