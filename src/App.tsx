import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { ImageAnalysis } from './pages/ImageAnalysis';
import { VideoAnalysis } from './pages/VideoAnalysis';
import { BatchProcessing } from './pages/BatchProcessing';
import { SystemArchitecture } from './pages/SystemArchitecture';
import { About } from './pages/About';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="image" element={<ImageAnalysis />} />
          <Route path="video" element={<VideoAnalysis />} />
          <Route path="batch" element={<BatchProcessing />} />
          <Route path="architecture" element={<SystemArchitecture />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
