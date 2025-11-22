import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QrCode, Radio, Shield, Check, X, Clock, Smartphone, Package, DollarSign, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';

const CheckIcon = () => <Check className="h-4 w-4 text-green-500" />;
const XIcon = () => <X className="h-4 w-4 text-red-500" />;

interface ComparisonModalProps {
  trigger?: ReactNode;
  quantity?: number;
}

export const ComparisonModal = ({ trigger, quantity = 5000 }: ComparisonModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Compare Options
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Protection Method Comparison</DialogTitle>
          <DialogDescription>
            Choose the authentication technology that best fits your product and budget
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Pricing Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">QR Only</h3>
              </div>
              <div className="text-2xl font-bold text-primary">6-10 ₾</div>
              <div className="text-xs text-muted-foreground">per unit</div>
              <Badge className="mt-2 bg-green-500">Most Affordable</Badge>
            </div>

            <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold">NFC Only</h3>
              </div>
              <div className="text-2xl font-bold text-amber-600">50-200 ₾</div>
              <div className="text-xs text-muted-foreground">per unit</div>
              <Badge className="mt-2 bg-amber-500">Maximum Security</Badge>
            </div>

            <div className="p-4 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-amber-500/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5" />
                <h3 className="font-semibold">QR + NFC</h3>
              </div>
              <div className="text-2xl font-bold">56-210 ₾</div>
              <div className="text-xs text-muted-foreground">per unit</div>
              <Badge className="mt-2 bg-gradient-to-r from-primary to-amber-500">Premium</Badge>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <QrCode className="h-4 w-4" />
                      <span className="text-xs">QR Only</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Radio className="h-4 w-4" />
                      <span className="text-xs">NFC Only</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">QR + NFC</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      Device Compatibility
                    </div>
                  </TableCell>
                  <TableCell className="text-center">100%</TableCell>
                  <TableCell className="text-center">~60%</TableCell>
                  <TableCell className="text-center">100%</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Deployment Time
                    </div>
                  </TableCell>
                  <TableCell className="text-center">1 day</TableCell>
                  <TableCell className="text-center">2-3 weeks</TableCell>
                  <TableCell className="text-center">2-3 weeks</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Security Level</TableCell>
                  <TableCell className="text-center">Medium</TableCell>
                  <TableCell className="text-center">Very High</TableCell>
                  <TableCell className="text-center">Maximum</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Cloning Resistance</TableCell>
                  <TableCell className="text-center">Medium</TableCell>
                  <TableCell className="text-center">Very High</TableCell>
                  <TableCell className="text-center">Maximum</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Easy to Apply</TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                  <TableCell className="text-center">Requires supplier</TableCell>
                  <TableCell className="text-center">Both methods</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Marketing QR Code</TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                  <TableCell className="text-center"><XIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Security QR Code</TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                  <TableCell className="text-center"><XIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Hardware Authentication</TableCell>
                  <TableCell className="text-center"><XIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Requires Special Equipment</TableCell>
                  <TableCell className="text-center"><XIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                  <TableCell className="text-center"><CheckIcon /></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Cost per {quantity.toLocaleString()} units
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-primary">
                    {(quantity * 8).toLocaleString()} ₾
                  </TableCell>
                  <TableCell className="text-center font-bold text-amber-600">
                    {(quantity * 100).toLocaleString()} ₾
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {(quantity * 108).toLocaleString()} ₾
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Use Case Recommendations */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-sm">Best For QR</h4>
              </div>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• High-volume production</li>
                <li>• Budget-conscious brands</li>
                <li>• Quick deployment needed</li>
                <li>• Marketing-focused products</li>
                <li>• Entry-level authentication</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-amber-600" />
                <h4 className="font-semibold text-sm">Best For NFC</h4>
              </div>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Premium/luxury products</li>
                <li>• High counterfeiting risk</li>
                <li>• Tech-savvy consumers</li>
                <li>• Small batch production</li>
                <li>• Export to EU/US markets</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4" />
                <h4 className="font-semibold text-sm">Best For Both</h4>
              </div>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Ultra-premium products</li>
                <li>• Maximum security needed</li>
                <li>• Redundant protection</li>
                <li>• High-value items (&gt;100₾)</li>
                <li>• International distribution</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
