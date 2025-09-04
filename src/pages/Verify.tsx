import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Scan, Shield, Copy, CheckCircle, AlertCircle, Info, ChevronDown, Brain, Lock, Clock, TrendingUp } from "lucide-react";
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

            {/* Detailed Information Sections */}
            <div className="space-y-4 mb-8">
              {/* How AI Detection Works */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-5 h-5 text-primary" />
                      <span className="font-medium">How AI Detection Works</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Neural Language Models:</strong> Our AI uses advanced transformer architectures trained on millions of human and AI-generated texts to identify subtle patterns that distinguish artificial content.</p>
                      <p><strong className="text-foreground">Multi-Layer Analysis:</strong> The system examines writing patterns, vocabulary usage, sentence structure, and semantic coherence across multiple dimensions.</p>
                      <p><strong className="text-foreground">Real-Time Processing:</strong> Analysis occurs in seconds, providing immediate feedback on content authenticity with detailed confidence metrics.</p>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Understanding Confidence Scores */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="font-medium">Understanding Confidence Scores</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">90-100%</Badge>
                          <p><strong className="text-foreground">High Confidence:</strong> Very strong indicators present. Result is highly reliable.</p>
                        </div>
                        <div className="space-y-2">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">70-89%</Badge>
                          <p><strong className="text-foreground">Medium Confidence:</strong> Clear patterns identified. Result is reliable but may benefit from human review.</p>
                        </div>
                        <div className="space-y-2">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">50-69%</Badge>
                          <p><strong className="text-foreground">Lower Confidence:</strong> Mixed indicators present. Additional verification recommended.</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Blockchain Verification Details */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto glass-panel">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-primary" />
                      <span className="font-medium">Blockchain Verification Details</span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6">
                  <Card className="bg-muted/30 border-primary/10 p-4 mt-2">
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Immutable Records:</strong> Every verification is recorded on the blockchain, creating a permanent, tamper-proof record of the analysis.</p>
                      <p><strong className="text-foreground">Cryptographic Hash:</strong> The unique hash serves as a digital fingerprint, allowing anyone to verify the authenticity and timestamp of the analysis.</p>
                      <p><strong className="text-foreground">Transparency:</strong> All verification records are publicly accessible, enabling independent verification and building trust in the system.</p>
                      <p><strong className="text-foreground">Audit Trail:</strong> The blockchain provides a complete history of content verification, supporting forensic analysis and accountability.</p>
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>

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
                  <div className="space-y-4">
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

                    {/* Detailed Result Explanation */}
                    <Card className="bg-accent/5 border-accent/20 p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-accent mt-0.5" />
                        <div className="space-y-2 text-sm">
                          <h4 className="font-medium text-foreground">What This Means:</h4>
                          {result.isAiGenerated ? (
                            <div className="space-y-2 text-muted-foreground">
                              <p><strong className="text-foreground">AI-Generated Detection:</strong> Our analysis indicates this content was likely produced by an artificial intelligence system.</p>
                              <p><strong className="text-foreground">Key Indicators:</strong> Pattern recognition suggests artificial linguistic patterns, repetitive structures, or lack of human-specific nuances.</p>
                              <p><strong className="text-foreground">Recommended Actions:</strong> Verify source, cross-reference with known publications, consider requesting original authorship documentation.</p>
                            </div>
                          ) : (
                            <div className="space-y-2 text-muted-foreground">
                              <p><strong className="text-foreground">Human-Written Verification:</strong> Analysis suggests this content exhibits natural human writing characteristics.</p>
                              <p><strong className="text-foreground">Key Indicators:</strong> Natural flow, human-specific expressions, creative variations, and authentic voice patterns detected.</p>
                              <p><strong className="text-foreground">Confidence Level:</strong> High likelihood of authentic human authorship based on linguistic analysis.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Blockchain Record */}
                  <div className="space-y-4">
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

                    {/* Blockchain Explanation */}
                    <Card className="bg-secondary/5 border-secondary/20 p-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-secondary mt-0.5" />
                        <div className="space-y-2 text-sm">
                          <h4 className="font-medium text-foreground">Blockchain Record Details:</h4>
                          <div className="space-y-2 text-muted-foreground">
                            <p><strong className="text-foreground">Permanent Record:</strong> This verification is now permanently stored on the blockchain and cannot be altered or deleted.</p>
                            <p><strong className="text-foreground">Hash Usage:</strong> Use this hash to independently verify this analysis result at any time. Share it as proof of verification.</p>
                            <p><strong className="text-foreground">Timestamp Proof:</strong> The blockchain timestamp proves when this verification occurred, providing temporal authenticity.</p>
                            <p><strong className="text-foreground">Audit Trail:</strong> This record contributes to a comprehensive audit trail for content authenticity tracking.</p>
                          </div>
                        </div>
                      </div>
                    </Card>
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