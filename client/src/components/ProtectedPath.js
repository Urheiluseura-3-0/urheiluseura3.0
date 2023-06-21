import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
import jwt_decode from 'jwt-decode'



const getRoles = (token) => {
    const roles = []

    if (!token) {
        roles.push('notLogged')
        return roles
    }

    const decodedToken = jwt_decode(token)

    if (decodedToken.isForeman === 1) {
        roles.push('foreman')
    }
    if (decodedToken.isWorker === 1) {
        roles.push('worker')
    }

    return roles
}

const ProtectedPath = ({ token, acceptedRoles }) => {
    const roles = getRoles(token)
    const isRoleOk = roles.some(role => acceptedRoles.includes(role))

    if (isRoleOk) {
        return <Outlet />
    } else {
        if (roles.includes('notLogged')) {
            return <Navigate to='/' />
        } else {
            return <Navigate to='/home' />
        }
    }
}

export default ProtectedPath