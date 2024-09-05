import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './domains/users/pages/Home';
import Profile from './domains/users/pages/Profile';
import Wrapper from './components/Wrapper';
import { SearchProvider } from './context/SearchContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Router>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:username" element={<Profile />} />
            </Routes>
            <ToastContainer />
          </Wrapper>
        </Router>
      </SearchProvider>
    </QueryClientProvider>
  );
};

export default App;
