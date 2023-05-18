import React from 'react';
import KanbanUI from './components/card/kanbanUi';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activity from './components/activity/Activity';
import Template from './components/Templates/Templates'

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={<KanbanUI />} />
          <Route path="/activity/:taskId" element={<Activity />} />
          <Route path="/template" element={<Template />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;