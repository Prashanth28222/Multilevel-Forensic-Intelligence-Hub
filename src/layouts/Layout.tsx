import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const Layout: React.FC = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Dashboard', subtitle: 'Multilevel Forensic Intelligence Hub' };
      case '/image':
        return { title: 'Image Forensics', subtitle: 'Frequency, Facial & Semantic Multi-Level Analysis' };
      case '/video':
        return { title: 'Video Forensics', subtitle: 'Frame-Based Temporal Deepfake Keyframe Aggregation' };
      case '/batch':
        return { title: 'Batch Processing', subtitle: 'Bulk Media Authentic / Synthetic Classification' };
      case '/architecture':
        return { title: 'System Architecture', subtitle: 'Technical Model Sitemap & Transfer Learning Metrics' };
      case '/about':
        return { title: 'About Project', subtitle: 'Research Background, Datasets & Implementation Details' };
      default:
        return { title: 'Forensic System', subtitle: 'AI Media Authentication' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="flex min-h-screen bg-[#070A12] text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
