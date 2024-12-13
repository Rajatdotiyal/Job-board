import { useState } from "react";

export default function useLoadingAndErorr(){
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(false);
    return {isLoading , setIsLoading , error , setError}
}