import { Link, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Users, Bookmark, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navigation = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0%', width: '20%' });

  const tabs = [
    { path: '/', label: 'Explore', icon: MapPin },
    { path: '/planner', label: 'Trip Planner', icon: Calendar },
    { path: '/guides', label: 'Guides', icon: Users },
    { path: '/bookings', label: 'Bookings', icon: Bookmark },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  useEffect(() => {
    const currentTabIndex = tabs.findIndex(tab => tab.path === location.pathname);
    if (currentTabIndex !== -1) {
      setActiveTab(tabs[currentTabIndex].path);
      setIndicatorStyle({
        left: `${currentTabIndex * 20}%`,
        width: '20%',
      });
    }
  }, [location.pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/40 safe-area-inset-bottom">
      <div className="max-w-md mx-auto px-0">
        {/* Animated indicator */}
        <div
          className="absolute top-0 h-1 bg-primary transition-all duration-300 ease-out"
          style={indicatorStyle}
        />

        <div className="flex items-center justify-between">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.path;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="flex-1 flex flex-col items-center justify-center py-4 px-2 relative transition-colors duration-200"
              >
                <Icon
                  size={24}
                  className={`mb-1 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-xs font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
