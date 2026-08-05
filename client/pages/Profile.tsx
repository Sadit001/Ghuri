import { User, LogOut, Heart, Settings, CreditCard } from 'lucide-react';

export default function Profile() {
  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="px-4 py-6 border-b border-border/40 bg-card/50">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground text-sm">Account settings and preferences</p>
      </div>

      {/* User Card */}
      <div className="px-4 py-6">
        <div className="bd-card p-6 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 mx-auto flex items-center justify-center">
            <User size={48} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Sign In Required</h2>
            <p className="text-muted-foreground text-sm">
              Create an account to save trips and bookings
            </p>
          </div>
          <div className="space-y-2 pt-4">
            <button className="w-full py-3 rounded-full bg-primary hover:bg-primary-light text-primary-foreground font-semibold transition-all active:scale-95">
              Sign In with Phone
            </button>
            <button className="w-full py-3 rounded-full border-2 border-border hover:bg-card/50 text-foreground font-semibold transition-all active:scale-95">
              Sign In with Email
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Settings
        </h3>

        {[
          { icon: Heart, label: 'Saved Destinations', badge: null },
          { icon: CreditCard, label: 'Saved Payment Methods', badge: null },
          { icon: Settings, label: 'Preferences', badge: null },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-card border border-border/40 hover:border-primary/30 hover:bg-card/80 transition-all"
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon size={22} className="text-secondary flex-shrink-0" />
                <span className="font-semibold text-foreground text-sm">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold ml-2">
                  {item.badge}
                </span>
              )}
              <span className="text-muted-foreground text-lg ml-2">›</span>
            </button>
          );
        })}
      </div>

      {/* Account Section */}
      <div className="px-4 py-6 space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
          Account
        </h3>

        <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 transition-all">
          <LogOut size={22} className="text-destructive" />
          <span className="font-semibold text-destructive">Sign Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-8 text-center border-t border-border/40 mt-8">
        <p className="text-xs text-muted-foreground mb-6 font-semibold">
          BD Roamer v1.0.0
        </p>
        <div className="flex gap-6 justify-center">
          {['Privacy', 'Terms', 'Support'].map(link => (
            <button
              key={link}
              className="text-xs text-primary hover:text-primary-light font-semibold transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
