import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Generate from './components/Generate';
import Claim from './components/Claim';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/generate' element={<Generate />} />
          <Route path='/claim' element={<Claim />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
