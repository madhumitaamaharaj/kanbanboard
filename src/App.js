import React from 'react';
import KanbanUI from './components/card/kanbanUi';
import Nav from './components/layout/Layout';
import styles from "./App.module.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activity from './components/activity/Activity';
import { RecoilRoot } from "recoil";
function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <div>
       
        <Routes>
          <Route path="/" element={<KanbanUI />} />
          <Route path="/activity/:taskId" element={<Activity />} />
        </Routes>
      </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
