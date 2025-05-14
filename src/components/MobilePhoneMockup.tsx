
import React from 'react';

const MobilePhoneMockup: React.FC = () => {
  return (
    <div className="mobile-mockup">
      <div className="mobile-screen">
        <div className="text-white text-center">
          <div className="text-xs mb-1">9:41</div>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
            ))}
          </div>
          <div className="p-2">
            <div className="h-10 w-10 bg-white/20 rounded-xl mx-auto mb-3"></div>
            <div className="h-3 bg-white/20 rounded-full w-16 mx-auto mb-2"></div>
            <div className="h-2 bg-white/10 rounded-full w-24 mx-auto mb-6"></div>
            
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-white/30"></div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="h-12 bg-white/10 rounded-lg mb-3"></div>
              <div className="h-12 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneMockup;
