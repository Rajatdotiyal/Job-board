import { useEffect, useState } from "react";

export default function useSignupandSignin(){

    const [isButton, setIsButton] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
          if (token) {
            setIsButton(true);
          }
        } catch (err) {
          console.error("You have been logged out");
        }
    
      }, [])

      return {isButton,setIsButton}
}