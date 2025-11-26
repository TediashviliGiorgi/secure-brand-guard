import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle2, AlertTriangle, XCircle, Share2, 
  MapPin, Calendar, Clock, Smartphone, Upload, Nfc, QrCode 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';

type VerificationStatus = 'authentic' | 'suspicious' | 'invalid';

interface VerificationResult {
  status: VerificationStatus;
  productName: string;
  batchId: string;
  producerName: string;
  productionDate: string;
  verificationMethod: 'qr' | 'nfc';
  firstScan?: {
    date: string;
    location: string;
    device: string;
    method: 'qr' | 'nfc';
  };
  currentScan: {
    timestamp: string;
    location: string;
    distance?: string;
    method: 'qr' | 'nfc';
  };
}

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [reportComment, setReportComment] = useState('');

  useEffect(() => {
    // Mock verification logic
    setTimeout(() => {
      const random = Math.random();
      let status: VerificationStatus;
      
      if (random < 0.7) {
        status = 'authentic';
      } else if (random < 0.9) {
        status = 'suspicious';
      } else {
        status = 'invalid';
      }

      // Determine verification method from URL or randomly
      const method = searchParams.get('method') as 'qr' | 'nfc' || (Math.random() > 0.5 ? 'nfc' : 'qr');

      const mockResult: VerificationResult = {
        status,
        productName: 'Saperavi Reserve 2021',
        batchId: 'AUTH-2024-001',
        producerName: 'Kakheti Wine Estate',
        productionDate: 'September 15, 2021',
        verificationMethod: method,
        firstScan: status === 'suspicious' ? {
          date: 'January 10, 2024, 14:30',
          location: 'Batumi, Georgia',
          device: 'iPhone 13 Pro',
          method: method,
        } : undefined,
        currentScan: {
          timestamp: new Date().toLocaleString(),
          location: status === 'suspicious' ? 'Tbilisi, Georgia' : 'Kakheti, Georgia',
          distance: status === 'suspicious' ? '350 km' : undefined,
          method: method,
        },
      };

      setResult(mockResult);
      setLoading(false);
    }, 1000);
  }, [token]);

  const handleReport = () => {
    console.log('Reporting counterfeit:', reportComment);
    alert('Thank you for your report. We will investigate.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Invalid Token</h1>
          <p className="text-muted-foreground">The verification token is missing or invalid.</p>
        </Card>
      </div>
    );
  }

  // Scenario A: Authentic
  if (result.status === 'authentic') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block p-4 rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 className="h-20 w-20 text-green-600 dark:text-green-400 animate-scale-in" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                Authentic Product
              </h1>
              <p className="text-lg text-muted-foreground">
                This product is genuine and verified for the first time
              </p>
            </div>

            <Card className="p-6 text-left space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📦</span>
                  <div>
                    <p className="font-medium">{result.productName}</p>
                    <p className="text-sm text-muted-foreground">Batch ID: {result.batchId}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏢</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Producer</p>
                    <p className="font-medium">{result.producerName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Production Date</p>
                    <p className="font-medium">{result.productionDate}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/30">
              <h3 className="font-semibold mb-3">Verification Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {result.verificationMethod === 'nfc' ? (
                    <Nfc className="h-4 w-4 text-primary" />
                  ) : (
                    <QrCode className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-muted-foreground">Method:</span>
                  <Badge variant="outline" className="font-medium">
                    {result.verificationMethod === 'nfc' ? 'NFC Tag' : 'QR Code'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Verified at:</span>
                  <span className="font-medium">{result.currentScan.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{result.currentScan.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Status:</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">VERIFIED</Badge>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" onClick={() => window.location.href = `/product/${result.batchId}`}>
                View Full Story
              </Button>
              <Button variant="secondary" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <footer className="text-center mt-12 text-sm text-muted-foreground">
            Protected by <span className="font-semibold">AuthIt</span>
          </footer>
        </div>
      </div>
    );
  }

  // Scenario B: Suspicious
  if (result.status === 'suspicious') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-block p-4 rounded-full bg-amber-100 dark:bg-amber-900">
              <AlertTriangle className="h-20 w-20 text-amber-600 dark:text-amber-400 animate-scale-in" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                Warning!
              </h1>
              <p className="text-lg text-foreground">
                This product has already been verified. This may indicate a counterfeit!
              </p>
            </div>

            <Card className="p-6 text-left space-y-4 border-amber-200 dark:border-amber-800">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  First Verification
                </h3>
                <div className="space-y-2 text-sm bg-muted/50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium flex items-center gap-1">
                      {result.firstScan?.method === 'nfc' ? (
                        <><Nfc className="h-3 w-3" /> NFC Tag</>
                      ) : (
                        <><QrCode className="h-3 w-3" /> QR Code</>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{result.firstScan?.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{result.firstScan?.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Device:</span>
                    <span className="font-medium">{result.firstScan?.device}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Current Scan
                </h3>
                <div className="space-y-2 text-sm bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-medium flex items-center gap-1">
                      {result.currentScan.method === 'nfc' ? (
                        <><Nfc className="h-3 w-3" /> NFC Tag</>
                      ) : (
                        <><QrCode className="h-3 w-3" /> QR Code</>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Now:</span>
                    <span className="font-medium">{result.currentScan.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{result.currentScan.location}</span>
                  </div>
                  {result.currentScan.distance && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-medium text-amber-600">{result.currentScan.distance} from first scan</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="border-amber-600 text-amber-600">
                      ⚠️ SUSPICIOUS
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-background">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-between font-semibold"
              >
                <span>What Should I Do?</span>
                <span className="text-muted-foreground">{showDetails ? '−' : '+'}</span>
              </button>
              
              {showDetails && (
                <div className="mt-4 space-y-3 text-sm text-left">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p><strong>If you opened this:</strong> Everything is okay. This is your first time opening.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium mb-2">If product should be new:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Contact the seller immediately</li>
                        <li>Ask for explanation about previous scan</li>
                        <li>Report to AuthIt support</li>
                        <li>Do not consume if suspicious</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <div className="flex flex-col gap-3">
              <Button className="w-full" onClick={() => window.location.href = `mailto:${result.producerName}`}>
                Contact Producer
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleReport}>
                Report Counterfeit
              </Button>
              <Button variant="outline" className="w-full" onClick={() => window.location.href = `/product/${result.batchId}`}>
                View Details
              </Button>
            </div>
          </div>

          <footer className="text-center mt-12 text-sm text-muted-foreground">
            Protected by <span className="font-semibold">AuthIt</span>
          </footer>
        </div>
      </div>
    );
  }

  // Scenario C: Invalid
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900">
            <XCircle className="h-20 w-20 text-red-600 dark:text-red-400 animate-scale-in" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
              Invalid Code
            </h1>
            <p className="text-lg text-foreground">
              This code does not exist in AuthIt system. This product is likely counterfeit.
            </p>
          </div>

          <Card className="p-6 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div className="text-left space-y-2">
                <p className="font-semibold text-red-600">This product may not be genuine</p>
                <p className="text-sm text-muted-foreground">Do not consume if suspicious</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 text-left">
            <h3 className="font-semibold mb-4">Recommendations</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-semibold">1</span>
                <div>
                  <p className="font-medium">Do not accept the product</p>
                  <p className="text-sm text-muted-foreground">This code is not recognized</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-semibold">2</span>
                <div>
                  <p className="font-medium">Contact the seller</p>
                  <p className="text-sm text-muted-foreground">Ask where they obtained this product</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-semibold">3</span>
                <div>
                  <p className="font-medium">Ask for explanation</p>
                  <p className="text-sm text-muted-foreground">Request documentation or proof of authenticity</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-semibold">4</span>
                <div>
                  <p className="font-medium">Report to AuthIt</p>
                  <p className="text-sm text-muted-foreground">Help us fight counterfeiting</p>
                </div>
              </li>
            </ol>
          </Card>

          <Card className="p-6 text-left">
            <h3 className="font-semibold mb-4">Report This Product</h3>
            <div className="space-y-4">
              <div>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </div>
              
              <Textarea
                placeholder="Add any additional comments..."
                value={reportComment}
                onChange={(e) => setReportComment(e.target.value)}
                rows={4}
              />
              
              <Button variant="destructive" className="w-full" onClick={handleReport}>
                Report Fake
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-muted/30">
            <p className="font-medium mb-2">ℹ️ Need help?</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>📧 Email: support@authit.ge</p>
              <p>📱 Phone: +995 555 000 111</p>
            </div>
          </Card>
        </div>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          Protected by <span className="font-semibold">AuthIt</span>
        </footer>
      </div>
    </div>
  );
}
