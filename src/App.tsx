import { useState } from 'react';
import { BoardProvider } from './context/BoardContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DraggableBoard from './components/DraggableBoard';
import { Toaster } from './components/ui/toaster';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
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
      <Toaster />
    </BoardProvider>
  );
}

export default App;