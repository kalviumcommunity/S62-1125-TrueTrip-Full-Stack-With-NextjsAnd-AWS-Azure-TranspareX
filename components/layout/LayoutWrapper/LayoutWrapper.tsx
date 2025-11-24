import { ReactNode } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

interface LayoutWrapperProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export default function LayoutWrapper({ 
  children, 
  showSidebar = true 
}: LayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-0' : ''} p-6 overflow-auto`}>
          {children}
        </main>
      </div>
    </div>
  );
}