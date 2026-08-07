import { useDispatch, useSelector } from 'react-redux'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout as logoutAction,
  updateUser as updateUserAction,
} from '../store/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const login = ({ user: authenticatedUser, token }) => {
    if (!authenticatedUser || !token) {
      dispatch(loginFailure('User and token are required to log in.'))
      return false
    }

    dispatch(loginStart())
    dispatch(loginSuccess({ user: authenticatedUser, token }))
    return true
  }

  const logout = () => dispatch(logoutAction())
  const updateUser = (updates) => dispatch(updateUserAction(updates))

  return { isAuthenticated, user, login, logout, updateUser }
}
