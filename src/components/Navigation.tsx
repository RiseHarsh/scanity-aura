import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scan, Shield, BarChart3, Blocks, Info, Brain, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Navigation = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Shield },
    { path: "/verify", label: "Verify", icon: Scan },
    { path: "/reports", label: "Reports", icon: BarChart3 },
    { path: "/explorer", label: "Explorer", icon: Blocks },
    { path: "/models", label: "Models", icon: Brain },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold holographic-text">ScanIt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button 
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm" 
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300">
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/verify">
              <Button className="neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300">
                Start Verification
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};