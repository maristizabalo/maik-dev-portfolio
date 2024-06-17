"use client"

import { ThemeProvider } from "next-themes"
import { useEffect, useState } from "react"

const Providers = ({ children, ...props }) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted){
        return <>{children}</>
    }
    return (
        <ThemeProvider {...props}>
            {children}
        </ThemeProvider>
    )
}

export default Providers;