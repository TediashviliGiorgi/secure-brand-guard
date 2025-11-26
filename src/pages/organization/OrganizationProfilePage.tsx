import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Building2, Upload, Users, Shield, CreditCard, CheckCircle2,
  Mail, Phone, MapPin, Globe, Instagram, Facebook, UserPlus,
  MoreVertical, ArrowLeft
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

export default function OrganizationProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showWelcome = searchParams.get('welcome') === 'true';
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Mock organization data
  const organization = {
    name: 'Kakheti Wine Estate',
    type: 'Producer',
    email: 'info@kakheti-wine.ge',
    phone: '+995 555 123 456',
    address: 'Tsinandali Village, Telavi, Kakheti, Georgia',
    website: 'https://kakheti-wine.ge',
    instagram: '@kakhetiwine',
    facebook: 'KakhetiWineEstate',
    status: 'Active',
    plan: 'Professional',
    memberCount: 3,
    logo: null,
  };

  const teamMembers = [
    { id: 1, name: 'Giorgi Meladze', email: 'giorgi@kakheti-wine.ge', role: 'Owner', status: 'Active', lastActive: '2024-01-15' },
    { id: 2, name: 'Nino Kavtaradze', email: 'nino@kakheti-wine.ge', role: 'Admin', status: 'Active', lastActive: '2024-01-14' },
    { id: 3, name: 'Luka Beridze', email: 'luka@kakheti-wine.ge', role: 'Member', status: 'Active', lastActive: '2024-01-10' },
  ];

  const permissions = [
    { id: 1, name: 'View Total Scans', enabled: true },
    { id: 2, name: 'View Geographic Data', enabled: true },
    { id: 3, name: 'View Individual Bottles', enabled: false },
    { id: 4, name: 'View Engagement Metrics', enabled: true },
    { id: 5, name: 'View Security Alerts', enabled: true },
    { id: 6, name: 'View Production Volumes', enabled: false },
  ];

  const handleChecklistItem = (item: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(item)) {
      newCompleted.delete(item);
    } else {
      newCompleted.add(item);
    }
    setCompletedSteps(newCompleted);
  };

  const handleSave = () => {
    toast({
      title: 'Changes saved',
      description: 'Your organization profile has been updated.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {showWelcome && (
          <Alert className="mb-6 border-primary bg-info-bg">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription className="ml-2">
              <strong>Welcome to AuthIt!</strong> Please complete your organization profile to get started.
              
              <div className="mt-4 space-y-2">
                <p className="font-semibold text-sm mb-2">Onboarding Checklist:</p>
                {[
                  { id: 'logo', label: 'Upload company logo' },
                  { id: 'website', label: 'Add website URL' },
                  { id: 'address', label: 'Add company address' },
                  { id: 'team', label: 'Invite team members' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={completedSteps.has(item.id)}
                      onChange={() => handleChecklistItem(item.id)}
                      className="rounded border-gray-300"
                    />
                    <label className="text-sm">{item.label}</label>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Organization Profile</h1>
          <p className="text-muted-foreground">Manage your organization settings and team</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">
              <Building2 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="mr-2 h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <Shield className="mr-2 h-4 w-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Update your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center">
                      {organization.logo ? (
                        <img src={organization.logo} alt="Logo" className="h-full w-full object-cover rounded-lg" />
                      ) : (
                        <Building2 className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{organization.name}</h3>
                      <Badge variant="outline">{organization.type}</Badge>
                      <Badge className="bg-success text-success-foreground">{organization.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Plan: {organization.plan}</p>
                    <p className="text-sm text-muted-foreground">{organization.memberCount} team members</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input defaultValue={organization.name} />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.email} className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.phone} className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.website} className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.address} className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.instagram} className="pl-9" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Facebook</Label>
                    <div className="relative">
                      <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input defaultValue={organization.facebook} className="pl-9" />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Manage your team and their roles</CardDescription>
                  </div>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-success text-success-foreground">{member.status}</Badge>
                        </TableCell>
                        <TableCell>{member.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Role</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Permissions</CardTitle>
                <CardDescription>Control what data can be accessed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{permission.name}</p>
                    </div>
                    <Switch defaultChecked={permission.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between p-6 border rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">{organization.plan}</h3>
                    <p className="text-2xl font-bold mt-2">8 ₾ <span className="text-base font-normal text-muted-foreground">per unit</span></p>
                    <p className="text-sm text-muted-foreground mt-1">Billed monthly</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Usage This Month</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Units Used</p>
                      <p className="text-2xl font-bold">12,450 <span className="text-sm font-normal">/ 15,000</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Storage</p>
                      <p className="text-2xl font-bold">8.2 GB <span className="text-sm font-normal">/ 20 GB</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Members</p>
                      <p className="text-2xl font-bold">3 <span className="text-sm font-normal">/ 5</span></p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Billing History</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Jan 1, 2024</TableCell>
                        <TableCell>Professional Plan - Monthly</TableCell>
                        <TableCell>99,600 ₾</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dec 1, 2023</TableCell>
                        <TableCell>Professional Plan - Monthly</TableCell>
                        <TableCell>96,400 ₾</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Download</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
