import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, Info, Brain, ChevronDown, Menu, Blocks } from "lucide-react";
import { SignInButton, SignUpButton, useUser, UserButton } from "@clerk/clerk-react";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Info dropdown items
  const infoItems = [
    { path: "/about", label: "About", icon: Info },
    { path: "/models", label: "Models", icon: Brain }
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Home */}
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm" 
                className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10"
              >
                <Shield className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>

            {/* Info Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10">
                  <Info className="w-4 h-4" />
                  <span>Info</span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="glass-panel border-primary/20">
                {infoItems.map(({ path, label, icon: Icon }) => (
                  <DropdownMenuItem key={path} asChild>
                    <Link to={path} className="flex items-center space-x-2 w-full">
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Explore Blockchain - Only for logged in users */}
            {isSignedIn && (
              <Link to="/explorer">
                <Button 
                  variant={location.pathname === "/explorer" ? "default" : "ghost"}
                  size="sm" 
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-primary/10"
                >
                  <Blocks className="w-4 h-4" />
                  <span>Explore Blockchain</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-panel border-primary/20">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    <Button 
                      variant={location.pathname === "/" ? "default" : "ghost"}
                      size="sm" 
                      className="w-full justify-start space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Home</span>
                    </Button>
                  </Link>
                  
                  <div className="py-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Information</p>
                    {infoItems.map(({ path, label, icon: Icon }) => (
                      <Link key={path} to={path} onClick={() => setMobileOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full justify-start space-x-2 ml-4">
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </Button>
                      </Link>
                    ))}
                  </div>

                  {isSignedIn && (
                    <Link to="/explorer" onClick={() => setMobileOpen(false)}>
                      <Button 
                        variant={location.pathname === "/explorer" ? "default" : "ghost"}
                        size="sm" 
                        className="w-full justify-start space-x-2"
                      >
                        <Blocks className="w-4 h-4" />
                        <span>Explore Blockchain</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="outline" size="sm">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};