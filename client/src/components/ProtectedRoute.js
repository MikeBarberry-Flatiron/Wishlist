import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const ProtectedRoute = ({ component: Component, currentUser, userContent, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser.isAuthenticated === true ? (
                    <Component {...props} currentUser={currentUser} userContent={userContent} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    userContent: state.userContent
})

export default connect(mapStateToProps)(ProtectedRoute)