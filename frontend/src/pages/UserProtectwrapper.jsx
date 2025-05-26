import React, { useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    console.log(token)

    const { user, setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)
    
      // ❌ This is directly in render and will cause errors!
    //  if (!token) {
    //         navigate('/login')
    //     }
    // navigation only happens after the component has rendered, so it won't cause an error.
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

          axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })

    }, [ token ])

     if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    
    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper