import { useState } from 'react';
import { BoardProvider } from './context/BoardContext';
import { ThemeProvider } from './context/ThemeProvider'; // Import ThemeProvider
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DraggableBoard from './components/DraggableBoard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <ThemeProvider defaultTheme="light"> {/* Wrap with ThemeProvider */}
      <BoardProvider>
        <div className="flex h-screen flex-col">
          <Header 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
            />
            
            <main className="flex-1 overflow-hidden">
              <DraggableBoard />
            </main>
          </div>
        </div>
      </BoardProvider>
    </ThemeProvider>
  );
}

export default App;