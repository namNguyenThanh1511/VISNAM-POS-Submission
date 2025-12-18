import React, { useState } from 'react';
import './App.css';
import PosScreen from './pages/PosScreen';
import RealtimeScreen from './pages/RealtimeScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('pos');

  return (
    <div className="App">
      <header style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '10px 20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Visnam POS</h1>
        <nav>
          <button 
            onClick={() => setCurrentScreen('pos')}
            style={{ 
              marginRight: '10px', 
              padding: '8px 15px',
              backgroundColor: currentScreen === 'pos' ? '#007bff' : 'transparent',
              color: 'white',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Bán hàng (POS)
          </button>
          <button 
            onClick={() => setCurrentScreen('realtime')}
            style={{ 
              padding: '8px 15px',
              backgroundColor: currentScreen === 'realtime' ? '#007bff' : 'transparent',
              color: 'white',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Realtime
          </button>
        </nav>
      </header>

      <main>
        {currentScreen === 'pos' ? <PosScreen /> : <RealtimeScreen />}
      </main>
    </div>
  );
}

export default App;
