import './App.css';
import Home from './components/home/home'
import NavBar from './components/navbar/navbar'
import Footer from './components/footer/footer'

function App() {
  return (
    <div className="App">
    <div className="container-fluid">
    <NavBar />
    <Home />
    <Footer />
    </div>
    </div>
  );
}

export default App;
