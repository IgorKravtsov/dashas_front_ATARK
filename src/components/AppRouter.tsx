import React from 'react'
import { Route, Routes } from 'react-router'
import { RouteNames } from '../routes'
import MainPage from '../pages/mainPage/MainPage'
import LoginPage from '../pages/loginPage/LoginPage'
import RegisterPage from '../pages/registerPage/RegisterPage'
import CurrentOfficePage from '../pages/currentOfficePage/CurrentOfficePage'
import EditPlantPage from '../pages/editPlantPage/EditPlantPage'
import AddPlantPage from '../pages/addPlantPage/AddPlantPage'

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RouteNames.MAIN} element={<MainPage />} />
      <Route path={RouteNames.LOGIN} element={<LoginPage />} />
      <Route path={RouteNames.REGISTER} element={<RegisterPage />} />
      <Route path={RouteNames.CURRENT_OFFICE} element={<CurrentOfficePage />} />
      <Route path={RouteNames.ADD_PLANT + '/:officeId'} element={<AddPlantPage />} />
      <Route path={RouteNames.EDIT_PLANT + '/:officeId/:plantId'} element={<EditPlantPage />} />
      <Route path='*' element={<h1>Not found</h1>} />
    </Routes>
  )
}

export default AppRouter
