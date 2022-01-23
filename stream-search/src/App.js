import './App.css';
import Home from './components/home/home'
import NavBar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
    <div className="container-fluid">
    <NavBar />
    <Footer />
    </div>
    </div>
    </Provider>
  );
}

export default App;
