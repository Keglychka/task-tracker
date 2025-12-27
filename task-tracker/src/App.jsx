import { useState } from 'react'
import './App.css'
import TaskTracker from './components/TaskTracker/TaskTracker'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskDetail from './components/TaskTracker/TaskDetail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskTracker />} />
        <Route path='/tasks/:taskId' element={<TaskDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
