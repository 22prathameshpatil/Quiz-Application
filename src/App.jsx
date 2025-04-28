import Signin from '../auth/Signin';
import Signup from '../auth/Signup';
import Navbar from '../components/Navbar';
import AttemptQuiz from '../pages/AttemptQuiz';
import CreateQuiz from '../pages/CreateQuiz';
import Home from '../pages/Home';
import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateQuiz />} />
            <Route path="/attempt/:id" element={<AttemptQuiz />} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
