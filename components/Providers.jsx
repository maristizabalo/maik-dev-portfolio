"use client"

import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"
import Loading from "./Loading"

const Providers = ({ children, ...props }) => {

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted){
        return <Loading />
    }
    return (
        <ThemeProvider {...props}>
            {children}
        </ThemeProvider>
    )
}

export default Providers;