import { useState, useEffect } from "react";

export default function useUserRole() {
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const tokenWithoutBearer = token.split(" ")[1];
        const tokenParts = tokenWithoutBearer.split('.');

        // Decode and parse the payload
        const payload = tokenParts[1];
        const decoded = JSON.parse(atob(payload));

        // Set the role and userId in the state
        setUserRole(decoded.role);
        setUserId(decoded.userId); // Assuming `userId` is in the token payload
      } catch (err) {
        console.error("Error decoding token:", err);
        setUserRole(null);
        setUserId(null);
      }
    } else {
      setUserRole(null);
      setUserId(null);
    }
  }, []);

  return { userRole, userId }; // Return both userRole and userId
}
