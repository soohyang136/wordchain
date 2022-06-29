import './App.css';
import Word from './components/Word';
import Header from './components/Header';
import Precautions from './components/Precautions';

function App() {
  
  return (
    <div className='container'>
      <Header />
      <div className='contents'>
        <Precautions />
        <Word />
      </div>
    </div>
  );

}


export default App;
