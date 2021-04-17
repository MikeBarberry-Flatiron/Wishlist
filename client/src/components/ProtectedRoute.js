import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, currentUser, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser.isAuthenticated === true ? (
                    <Component {...props} currentUser={currentUser} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(ProtectedRoute)