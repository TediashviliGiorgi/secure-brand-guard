import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, TrendingDown, Users, Eye, MousePointerClick, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock data for charts
  const timeSeriesData = [
    { date: 'Jan 1', qr1: 420, qr2: 185, cvr: 44 },
    { date: 'Jan 5', qr1: 510, qr2: 225, cvr: 44 },
    { date: 'Jan 10', qr1: 680, qr2: 310, cvr: 46 },
    { date: 'Jan 15', qr1: 750, qr2: 340, cvr: 45 },
    { date: 'Jan 20', qr1: 890, qr2: 410, cvr: 46 },
    { date: 'Jan 25', qr1: 950, qr2: 445, cvr: 47 },
    { date: 'Jan 30', qr1: 1050, qr2: 490, cvr: 47 },
  ];

  const deviceData = [
    { name: 'Mobile', value: 78, color: 'hsl(var(--primary))' },
    { name: 'Desktop', value: 18, color: 'hsl(var(--secondary))' },
    { name: 'Tablet', value: 4, color: 'hsl(var(--accent))' },
  ];

  const osData = [
    { name: 'iOS', value: 52, color: 'hsl(var(--primary))' },
    { name: 'Android', value: 44, color: 'hsl(var(--secondary))' },
    { name: 'Other', value: 4, color: 'hsl(var(--muted))' },
  ];

  const topProducts = [
    { rank: 1, name: 'Saperavi Reserve 2020', category: 'Wine', qr1: 2450, qr2: 1120, cvr: 45.7 },
    { rank: 2, name: 'Rkatsiteli Qvevri 2019', category: 'Wine', qr1: 1890, qr2: 890, cvr: 47.1 },
    { rank: 3, name: 'Chacha Premium', category: 'Spirits', qr1: 1650, qr2: 720, cvr: 43.6 },
    { rank: 4, name: 'Kindzmarauli 2021', category: 'Wine', qr1: 1420, qr2: 640, cvr: 45.1 },
    { rank: 5, name: 'Georgian Honey', category: 'Other', qr1: 980, qr2: 410, cvr: 41.8 },
  ];

  const peakHoursData = [
    { day: 'Mon', hours: [2, 3, 4, 8, 12, 18, 25, 32, 28, 22, 18, 15, 14, 16, 22, 30, 38, 42, 35, 28, 20, 12, 8, 4] },
    { day: 'Tue', hours: [3, 4, 5, 9, 14, 20, 28, 35, 30, 24, 20, 17, 16, 18, 25, 34, 42, 45, 38, 30, 22, 14, 9, 5] },
    { day: 'Wed', hours: [2, 3, 5, 10, 15, 22, 30, 38, 32, 26, 22, 18, 17, 20, 27, 36, 44, 48, 40, 32, 24, 16, 10, 6] },
    { day: 'Thu', hours: [3, 4, 6, 11, 16, 24, 32, 40, 35, 28, 24, 20, 19, 22, 29, 38, 46, 50, 42, 34, 26, 18, 11, 7] },
    { day: 'Fri', hours: [4, 5, 7, 13, 18, 26, 35, 45, 40, 32, 28, 24, 22, 26, 34, 44, 52, 58, 48, 38, 30, 22, 14, 9] },
    { day: 'Sat', hours: [5, 6, 8, 15, 22, 32, 42, 52, 48, 40, 35, 30, 28, 32, 40, 50, 58, 62, 52, 42, 34, 26, 18, 12] },
    { day: 'Sun', hours: [4, 5, 7, 12, 18, 28, 38, 48, 42, 35, 30, 26, 24, 28, 36, 45, 52, 56, 46, 36, 28, 20, 14, 10] },
  ];

  const getHeatColor = (value: number) => {
    const intensity = Math.min(value / 60, 1);
    return `hsl(var(--primary) / ${0.1 + intensity * 0.9})`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Analytics</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Overview</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              PDF Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total QR #1 Scans</CardDescription>
              <CardTitle className="text-3xl">12,450</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">+23%</span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total QR #2 Verifications</CardDescription>
              <CardTitle className="text-3xl">5,680</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">+18%</span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Conversion Rate</CardDescription>
              <CardTitle className="text-3xl">45.6%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">+2.1%</span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg Engagement Time</CardDescription>
              <CardTitle className="text-3xl">2m 35s</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success font-medium">+15s</span>
                <span className="text-muted-foreground">vs previous</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scans Over Time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scans Over Time</CardTitle>
            <CardDescription>QR scans and conversion rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorQr1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQr2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="qr1" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorQr1)"
                  name="QR #1 Scans"
                />
                <Area 
                  type="monotone" 
                  dataKey="qr2" 
                  stroke="hsl(var(--secondary))" 
                  fillOpacity={1} 
                  fill="url(#colorQr2)"
                  name="QR #2 Verifications"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device & Browser + Top Products */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Device & Browser Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device & OS Distribution</CardTitle>
              <CardDescription>How consumers access your products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-4 text-center">Device Type</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {deviceData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-4 text-center">Operating System</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={osData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {osData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {osData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best performing products by scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground pb-2 border-b">
                  <div className="col-span-1">#</div>
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-right">QR1</div>
                  <div className="col-span-2 text-right">QR2</div>
                  <div className="col-span-2 text-right">CVR</div>
                </div>
                
                {topProducts.map((product) => (
                  <div key={product.rank} className="grid grid-cols-12 gap-2 text-sm items-center">
                    <div className="col-span-1 font-bold text-primary">{product.rank}</div>
                    <div className="col-span-5">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.category}</div>
                    </div>
                    <div className="col-span-2 text-right">{product.qr1.toLocaleString()}</div>
                    <div className="col-span-2 text-right">{product.qr2.toLocaleString()}</div>
                    <div className="col-span-2 text-right font-medium">{product.cvr}%</div>
                  </div>
                ))}
              </div>
              
              <Button variant="link" className="w-full mt-4">View All Products →</Button>
            </CardContent>
          </Card>
        </div>

        {/* Peak Hours Heatmap */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Peak Hours Heatmap</CardTitle>
            <CardDescription>Scan activity by day and hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                <div className="flex gap-1 mb-2">
                  <div className="w-12"></div>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="w-8 text-xs text-center text-muted-foreground">
                      {i}
                    </div>
                  ))}
                </div>
                
                {peakHoursData.map((row) => (
                  <div key={row.day} className="flex gap-1 mb-1">
                    <div className="w-12 text-xs text-muted-foreground flex items-center">
                      {row.day}
                    </div>
                    {row.hours.map((value, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: getHeatColor(value) }}
                        title={`${row.day} ${i}:00 - ${value} scans`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consumer Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Consumer Engagement Metrics</CardTitle>
            <CardDescription>How consumers interact with product pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl font-bold">2m 35s</div>
                <div className="text-sm text-muted-foreground">Avg Page Time</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Users className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl font-bold">35%</div>
                <div className="text-sm text-muted-foreground">Bounce Rate</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <MousePointerClick className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl font-bold">42%</div>
                <div className="text-sm text-muted-foreground">Video Play Rate</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Eye className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl font-bold">68%</div>
                <div className="text-sm text-muted-foreground">Gallery Views</div>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl font-bold">12%</div>
                <div className="text-sm text-muted-foreground">Share Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAnalyticsPage;
