import './App.css'
import EditTask from './components/EditTask/EditTask'
import Todos from './components/Todos/Todos'
import Header from "./pages/Header/Header"

import { Routes, Route, BrowserRouter } from "react-router-dom"
import Index from './components/Index/Index'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/pending' element={<Todos />} />

        <Route path='/update/task/:taskId' element={< EditTask />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
