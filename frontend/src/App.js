import 'bootstrap/dist/css/bootstrap.min.css';
import EonetEvents from './components/EonetEvents'
import './App.css';
import Header from './components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='bg-image'>
        <Header />
        <EonetEvents />
      </div>
    </ThemeProvider>
  );
}

export default App;
