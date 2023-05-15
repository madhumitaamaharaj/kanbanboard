import React from 'react';
import KanbanUI from './components/card/kanbanUi';
import Nav from './components/layout/Layout';
import styles from "./App.module.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activity from './components/activity/Activity';

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<KanbanUI />} />
          <Route path="/activity/:taskId" element={<Activity />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
