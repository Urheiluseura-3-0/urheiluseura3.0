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
    console.log('Roolit', roles)
    console.log('Hyväksytyt', acceptedRoles)
    const isRoleOk = roles.some(role => acceptedRoles.includes(role))
    console.log(isRoleOk)

    if (isRoleOk) {
        console.log('Rooli kelpaa')
        return <Outlet />
    } else {
        console.log('Rooli väärä')
        if (roles.includes('notLogged')) {
            return <Navigate to='/' />
        } else {
            return <Navigate to='/home' />
        }
    }
}

export default ProtectedPath