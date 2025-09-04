import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scan, Shield, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VerificationResult {
  isAiGenerated: boolean;
  confidence: number;
  blockchainHash: string;
  timestamp: string;
}

export default function Verify() {
  const [text, setText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!text.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate AI verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: VerificationResult = {
      isAiGenerated: Math.random() > 0.5,
      confidence: Math.floor(Math.random() * 30) + 70,
      blockchainHash: "0x" + Math.random().toString(16).substring(2, 42),
      timestamp: new Date().toISOString(),
    };
    
    setResult(mockResult);
    setIsVerifying(false);
  };

  const copyHash = () => {
    if (result?.blockchainHash) {
      navigator.clipboard.writeText(result.blockchainHash);
      toast({
        title: "Copied to clipboard",
        description: "Blockchain hash copied successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <Scan className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="holographic-text">Verify Content</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI detection with blockchain-verified authenticity records
            </p>
          </div>

          {/* Scanner Interface */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-panel p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    Content to Verify
                  </label>
                  <div className="relative">
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your text content here for AI detection analysis..."
                      className="min-h-[200px] bg-muted/50 border-primary/20 focus:border-primary/50 transition-colors"
                    />
                    {isVerifying && (
                      <div className="absolute inset-0 bg-primary/5 pointer-events-none">
                        <div className="scanner-line h-1 w-full absolute top-1/2" />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={handleVerify}
                  disabled={!text.trim() || isVerifying}
                  size="lg"
                  className="w-full neon-border bg-gradient-primary hover:shadow-neon transition-all duration-300"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-neural-pulse w-5 h-5 mr-2 rounded-full bg-primary-foreground" />
                      Scanning Content...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5 mr-2" />
                      Verify Authenticity
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Results */}
            {result && (
              <Card className="glass-panel p-8 animate-fade-in">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Verification Complete</h3>
                      <p className="text-muted-foreground">Analysis results below</p>
                    </div>
                  </div>

                  {/* AI Detection Result */}
                  <div className="flex items-center justify-between p-6 rounded-lg bg-muted/30 border border-primary/20">
                    <div className="flex items-center space-x-4">
                      {result.isAiGenerated ? (
                        <AlertCircle className="w-8 h-8 text-destructive" />
                      ) : (
                        <CheckCircle className="w-8 h-8 text-primary" />
                      )}
                      <div>
                        <p className="font-semibold text-lg">
                          {result.isAiGenerated ? "AI-Generated Content" : "Human-Written Content"}
                        </p>
                        <p className="text-muted-foreground">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={result.isAiGenerated ? "destructive" : "default"}
                      className="px-4 py-2 text-sm font-medium animate-hologram-flicker"
                    >
                      {result.isAiGenerated ? "AI Detected" : "Human Verified"}
                    </Badge>
                  </div>

                  {/* Blockchain Record */}
                  <div className="p-6 rounded-lg bg-gradient-glass border border-accent/30">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="font-semibold text-accent">Blockchain Verification</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {result.blockchainHash}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Verified: {new Date(result.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyHash}
                        className="border-accent/50 hover:bg-accent/10"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Hash
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}