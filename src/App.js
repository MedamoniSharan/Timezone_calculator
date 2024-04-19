import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Route
import { ChakraProvider } from '@chakra-ui/react';

// css:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//   Components : 
import ImageSection from './components/ImageSection';

import Navbar from './components/Navbar';
import Calculator from './components/Calculator.js';
import Timezone from './components/Timezone.js';


function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
           <Navbar /> {/* Ensure Navbar is rendered within Router */}
          <Routes> {/* Use Routes instead of Route */}
            <Route exact path="/" element={<ImageSection/>} />
            <Route path="/calculate" element={<Calculator />} />
            <Route path="/timezones" element={<Timezone />}/>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
