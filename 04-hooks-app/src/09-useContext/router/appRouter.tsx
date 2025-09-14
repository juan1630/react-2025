import { createBrowserRouter, Navigate } from 'react-router'
import { AboutPage } from '../pages/about/AboutPage'
import { Profile } from '../pages/profile/Profile'
import { LoginPage } from '../pages/login/LoginPage'
import { PrivateRoute } from './PrivateRoute'

export const appRouter = createBrowserRouter([
    {path: '/', element: <AboutPage />},
    {path: '/profile', element: <PrivateRoute element={<Profile/>} />},
    {path: '/login', element: <LoginPage />},
    {path: '*', element: <Navigate to='/' /> },
])