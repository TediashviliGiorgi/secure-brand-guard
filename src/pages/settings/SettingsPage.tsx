import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Upload, 
  Building,
  Shield,
  Bell,
  CreditCard,
  AlertTriangle
} from "lucide-react";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { GEORGIAN_REGIONS, INDUSTRIES } from "@/lib/validators";

const SettingsPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("company");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveCompany = () => {
    toast({
      title: t('common.save'),
      description: "Company profile has been updated successfully.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your preferences have been updated.",
    });
  };

  const handleExportData = (format: string) => {
    toast({
      title: "Export started",
      description: `Your data export in ${format.toUpperCase()} format will be ready shortly.`,
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === "DELETE") {
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      });
      navigate("/");
    } else {
      toast({
        title: "Confirmation failed",
        description: "Please type DELETE to confirm account deletion.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('common.back')}
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
                <p className="text-sm text-muted-foreground">Manage your company and preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-3xl">
            <TabsTrigger value="company">
              <Building className="w-4 h-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and logo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID</Label>
                    <Input id="tax-id" placeholder="Enter tax ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {GEORGIAN_REGIONS.map((region) => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter company address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+995 XXX XXX XXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="company@example.com" />
                  </div>
                </div>

                <Button onClick={handleSaveCompany}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password regularly for security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <PasswordStrengthIndicator password={newPassword} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button onClick={handleChangePassword}>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Use an authenticator app for login verification</p>
                  </div>
                  <Button variant="outline">Setup</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your logged in devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Current Device</p>
                    <p className="text-sm text-muted-foreground">Chrome on Windows • Tbilisi, Georgia</p>
                  </div>
                  <Button variant="ghost" size="sm" disabled>Current</Button>
                </div>
                <Button variant="outline" className="w-full">Log Out All Other Sessions</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what updates you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="batch-alerts">Batch Status Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about batch creation and status changes</p>
                  </div>
                  <Checkbox id="batch-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts about suspicious verification attempts</p>
                  </div>
                  <Checkbox id="security-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly analytics summaries via email</p>
                  </div>
                  <Checkbox id="weekly-reports" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive product updates and news</p>
                  </div>
                  <Checkbox id="marketing" />
                </div>
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Receive important alerts via SMS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-phone">Phone Number</Label>
                  <Input id="sms-phone" placeholder="+995 XXX XXX XXX" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="critical-sms">Critical Alerts Only</Label>
                    <p className="text-sm text-muted-foreground">Only receive SMS for critical security events</p>
                  </div>
                  <Checkbox id="critical-sms" defaultChecked />
                </div>
                <Button>Update Phone</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>You are currently on the Professional plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-lg">Professional Plan</p>
                    <p className="text-sm text-muted-foreground">Up to 10,000 products per month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">$99/mo</p>
                    <p className="text-sm text-muted-foreground">Billed monthly</p>
                  </div>
                </div>
                <Button variant="outline">Upgrade Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-8 h-8" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">January {i}, 2025 • $99.00</p>
                      </div>
                      <Button variant="ghost" size="sm">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
                <CardDescription>Download all your data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Export your complete data including batches, products, and analytics.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleExportData("json")}>
                    Export as JSON
                  </Button>
                  <Button variant="outline" onClick={() => handleExportData("csv")}>
                    Export as CSV
                  </Button>
                  <Button variant="outline" onClick={() => handleExportData("pdf")}>
                    Export as PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <div className="border-2 border-destructive rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Danger Zone</h3>
              </div>
              
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delete-confirm">Type DELETE to confirm</Label>
                    <Input 
                      id="delete-confirm" 
                      placeholder="DELETE"
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmation !== "DELETE"}
                  >
                    Delete Account Permanently
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
