import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    console.log(token)
    
      // ❌ This is directly in render and will cause errors!
    //  if (!token) {
    //         navigate('/login')
    //     }
    // navigation only happens after the component has rendered, so it won't cause an error.
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [ token ])

    
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper