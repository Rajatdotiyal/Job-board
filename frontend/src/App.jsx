import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Role from './pages/Role'
import JobSeeker from './pages/JobSeeker'
import Employer from './pages/Employer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import AboutUs from './pages/Aboutus'
import CreateJob from './pages/CreateJob'
import JobDetail from './pages/JobDetail'
import Applicants from './pages/Applicants'

function App() {

  
  return (
    <>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path='/home' element = {<Home/>}/>
              <Route path='/createjob' element = {<CreateJob/>}/>
              <Route path='/signup' element = {<Signup/>}/>
              <Route path='/signin' element = {<Signin/>}/>
              <Route path='/role' element = {<Role/>}/>
              <Route path='/jobs' element = {<Jobs/>}/>
              <Route path='/aboutus' element = {<AboutUs/>}/>
              <Route path='/jsdetails' element = {<JobSeeker/>}/>
              <Route path='/empdetails' element = {<Employer/>}/>
              <Route path='/applicants' element = {<Applicants/>}/>
              <Route path='/job/:id' element = {<JobDetail/>}/>

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
