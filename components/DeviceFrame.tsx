import { ReactNode } from 'react';
import BottomNav from './BottomNav';

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-frame">
      <div className="device-screen">
        {/* Dynamic Island */}
        <div className="dynamic-island"></div>
        
        {/* iOS Status Bar */}
        <div className="ios-status-bar">
          <div className="ios-status-left">
            <span>9:41</span>
          </div>
          <div className="ios-status-right">
            <div className="signal-bars">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="signal-bar" style={{ height: `${(i + 1) * 2 + 2}px` }}></div>
              ))}
            </div>
            <div className="battery-icon">
              <div className="battery-fill"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="phone-screen flex-1 overflow-y-auto relative bg-gray-50" style={{ paddingBottom: 'calc(80px + 34px)' }}>
          {children}
        </div>

        {/* Bottom Navigation - Fixed at bottom of frame */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50" style={{ paddingBottom: '34px' }}>
          <BottomNav />
        </div>

        {/* Home Indicator */}
        <div className="home-indicator"></div>
      </div>
    </div>
  );
}

