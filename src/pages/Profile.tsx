import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogOut, Mail, Calendar, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get display name from metadata or Google profile
  const displayName = user.user_metadata?.full_name || user.user_metadata?.name || 'User';
  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-neural-pulse" />
              <Avatar className="w-24 h-24 border-2 border-primary/30">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="text-xl font-bold bg-gradient-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-bold holographic-text">
                Welcome, {displayName}
              </h1>
              <p className="text-muted-foreground mt-2">
                Your ScanIt account dashboard
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your profile details and authentication status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                  {user.email_confirmed_at ? "Verified" : "Pending"}
                </Badge>
              </div>

              {/* Account Created */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Authentication Provider */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Authentication Method</p>
                    <p className="text-sm text-muted-foreground">
                      {user.app_metadata?.provider === 'google' ? 'Google Account' : 'Email & Password'}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {user.app_metadata?.provider === 'google' ? 'OAuth' : 'Standard'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="glass-panel border-0">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>
                Manage your account settings and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleSignOut}
                variant="destructive"
                className="w-full group transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}