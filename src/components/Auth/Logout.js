import React, { Component, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';
import { logout } from '../../Redux/authActionCreators';

// This is class component 


// const mapDispatchToProps = dispatch => ({
//     logout: () => dispatch(logout())
// })

// class Logout extends Component {
//     componentDidMount() {
//         this.props.logout()
//     }

//     render() {
//         return (
//             <Routes>
//                 <Route to='/*' element={<Navigate to="/" replace />} />
//             </Routes>
//         )
//     }
// }

// This is functional component

const LogoutFC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout())
    }, [])

    return (
        <Routes>
            <Route to='/*' element={<Navigate to="/" replace />} />
        </Routes>
    )
}
export default LogoutFC
// export default connect(null, mapDispatchToProps)(Logout)