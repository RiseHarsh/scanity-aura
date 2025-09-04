import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Eye, Calendar, TrendingUp } from "lucide-react";

interface Report {
  id: string;
  timestamp: string;
  content: string;
  isAiGenerated: boolean;
  confidence: number;
  blockchainHash: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:00Z",
    content: "Advanced machine learning algorithms for predictive analytics...",
    isAiGenerated: false,
    confidence: 92,
    blockchainHash: "0xa1b2c3d4e5f6789012345678901234567890abcd"
  },
  {
    id: "2",
    timestamp: "2024-01-14T15:45:00Z",
    content: "The integration of artificial intelligence in modern healthcare...",
    isAiGenerated: true,
    confidence: 87,
    blockchainHash: "0xb2c3d4e5f6789012345678901234567890abcde1"
  },
  {
    id: "3",
    timestamp: "2024-01-13T09:15:00Z",
    content: "Blockchain technology revolutionizes digital trust systems...",
    isAiGenerated: false,
    confidence: 94,
    blockchainHash: "0xc3d4e5f6789012345678901234567890abcde12f"
  }
];

export default function Reports() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Verification Reports</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Complete history of all content verifications with blockchain provenance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">156</h3>
              <p className="text-muted-foreground">Total Verifications</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">94.2%</h3>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </Card>
            
            <Card className="glass-panel p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">24</h3>
              <p className="text-muted-foreground">This Month</p>
            </Card>
          </div>

          {/* Reports Timeline */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Recent Verifications</h2>
              <Button variant="outline" className="border-primary/30">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            {mockReports.map((report, index) => (
              <Card key={report.id} className="glass-panel p-6 hover:shadow-neural transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-primary animate-neural-pulse" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(report.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Badge 
                        variant={report.isAiGenerated ? "destructive" : "default"}
                        className="animate-hologram-flicker"
                      >
                        {report.isAiGenerated ? "AI Generated" : "Human Written"}
                      </Badge>
                    </div>

                    {/* Content Preview */}
                    <div className="p-4 rounded-lg bg-muted/20 border border-primary/10">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.content}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div>
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-primary transition-all duration-500"
                                style={{ width: `${report.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{report.confidence}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground">Blockchain Hash</span>
                          <p className="text-sm font-mono text-accent mt-1">
                            {report.blockchainHash.substring(0, 20)}...
                          </p>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-primary/30">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}