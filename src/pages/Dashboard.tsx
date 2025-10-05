import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Scan, 
  FileText, 
  Share2, 
  GitCompare,
  BarChart3,
  Users,
  Cloud,
  Search,
  Grid3x3,
  Download,
  Upload as UploadIcon,
  RefreshCw,
  Trash2,
  Edit,
  Filter,
  AlertCircle,
  FolderOpen,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";

const sidebarItems = [
  { id: "new-scan", label: "New Scan", icon: Plus, path: "/verify" },
  { id: "my-scans", label: "My Scans", icon: Scan, path: "/dashboard" },
  { id: "shared", label: "Shared With Me", icon: Share2, path: "/dashboard/shared" },
  { id: "compare", label: "Text Compare", icon: GitCompare, path: "/dashboard/compare" },
];

const organizationItems = [
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { id: "members", label: "Members", icon: Users, badge: "1 Free", path: "/dashboard/members" },
  { id: "cloud", label: "Private Cloud Hubs", icon: Cloud, path: "/dashboard/cloud" },
];

const mockScans = [
  {
    id: 1,
    name: "New Scans 6:55 AM",
    date: "Oct 5, 2025",
    type: "alert",
    plagiarismScore: "85%",
    aiContent: "High"
  },
  {
    id: 2,
    name: "New Folder",
    date: "Oct 3, 2025",
    type: "folder",
    plagiarismScore: "-",
    aiContent: "-"
  },
];

export default function Dashboard() {
  const location = useLocation();
  const [selectedScan, setSelectedScan] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-panel border-r border-primary/20 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Main Navigation */}
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link key={item.id} to={item.path}>
                  <Button
                    variant={location.pathname === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start space-x-3 hover:bg-primary/10"
                    size="sm"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Organization Section */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                Organization
              </h3>
              <nav className="space-y-1">
                {organizationItems.map((item) => (
                  <Link key={item.id} to={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start space-x-3 hover:bg-primary/10"
                      size="sm"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Learn More Section */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                Learn More
              </h3>
              <nav className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-primary/10">
                  Support
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-primary/10">
                  Blog
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-primary/10">
                  Manage Cookies
                </Button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">My Scans</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">0 Credits left</span>
                <Button className="neon-border bg-gradient-primary hover:shadow-neon">
                  <span className="mr-2">👑</span> Upgrade
                </Button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="glass-panel p-4 rounded-lg mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <UploadIcon className="w-4 h-4" />
                </Button>
                <Link to="/verify">
                  <Button className="neon-border bg-gradient-primary hover:shadow-neon">
                    <Plus className="w-4 h-4 mr-2" />
                    New Scan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-primary">
                      Date ↓
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plagiarism Score</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Content Detected</th>
                  </tr>
                </thead>
                <tbody>
                  {mockScans.map((scan) => (
                    <tr
                      key={scan.id}
                      className={`border-b border-border hover:bg-primary/5 cursor-pointer transition-colors ${
                        selectedScan === scan.id ? 'bg-primary/10' : ''
                      }`}
                      onClick={() => setSelectedScan(scan.id)}
                    >
                      <td className="p-4">
                        {scan.type === 'alert' ? (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        ) : (
                          <FolderOpen className="w-5 h-5 text-accent" />
                        )}
                      </td>
                      <td className="p-4 font-medium">{scan.name}</td>
                      <td className="p-4 text-muted-foreground">{scan.date}</td>
                      <td className="p-4">
                        {scan.plagiarismScore !== '-' ? (
                          <Badge variant="destructive">{scan.plagiarismScore}</Badge>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="p-4">
                        {scan.aiContent !== '-' ? (
                          <Badge variant="secondary">{scan.aiContent}</Badge>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
