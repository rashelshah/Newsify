
import './App.css';
import { useState} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import React from 'react'
import LoadingBar from 'react-top-loading-bar'
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Newsitem from './components/Newsitem';
import Spline from '@splinetool/react-spline';
import {
  Routes,
  Route,
} from "react-router-dom";


const App = ()=>{
  const pagesize = 5;
  const apiKey = process.env.REACT_APP_API_KEY; 
  const [progress, setProgress] = useState(0)
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
   const [mode, setmode] = useState(prefersDarkMode)
   
   const darkTheme = createTheme({
    palette: {
      mode: mode?'dark':'light'
    }
    
  });
   const toggleMode = (props) =>{
    setmode(!mode);
   }
  
    return (
      <>
        <div> 
       <ThemeProvider theme={darkTheme}>
       <CssBaseline />
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}/>
      <Routes>
      <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey} pagesize={pagesize} country="us" key={"general"} category="general" />} />
      <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pagesize} country="us" key={"business"} category="business" />} />
      <Route path="/sports" element={<News setProgress={setProgress}  apiKey={apiKey} pagesize={pagesize} country="us" key={"sports"} category="sports" />} />
      <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  pagesize={pagesize} country="us" key={"entertainment"} category="entertainment" />} />
      <Route path="/health" element={<News setProgress={setProgress}  apiKey={apiKey} pagesize={pagesize} country="us" key={"health"} category="health" />} />
      <Route path="/science" element={<News setProgress={setProgress}  apiKey={apiKey} pagesize={pagesize} country="us" key={"science"} category="science"/>} />
      <Route path="/technology" element={<News setProgress={setProgress}  apiKey={apiKey} pagesize={pagesize} country="us" key={"technology"} category="technology"/>} />
      <Route path="/" element={<Spline scene="https://prod.spline.design/GgVqRrlCCBaqUMJH/scene.splinecode" style={{marginTop:'40px'}} key={"/"}/>} />
      </Routes>
      </ThemeProvider>  
      </div>

      </>
  
    )
}



export default App;

