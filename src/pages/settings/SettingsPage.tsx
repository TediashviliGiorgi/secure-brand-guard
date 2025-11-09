import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Upload, 
  AlertTriangle,
  User,
  Building,
  Bell,
  Shield
} from "lucide-react";
import { PasswordStrengthIndicator } from "@/components/auth/PasswordStrengthIndicator";

const SettingsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleSaveCompany = () => {
    toast({
      title: "Company details updated",
      description: "Your company information has been saved.",
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
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company">
              <Building className="w-4 h-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="danger">
              <Shield className="w-4 h-4 mr-2" />
              Danger Zone
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2">
                      <Input id="email" type="email" defaultValue="john@example.com" />
                      <Button variant="outline" size="sm">Verified</Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+995 555 000111" />
                  </div>

                  <div>
                    <Label htmlFor="language">Language Preference</Label>
                    <select 
                      id="language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option>English</option>
                      <option>ქართული (Georgian)</option>
                      <option>Русский (Russian)</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Ensure your account is secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                  <PasswordStrengthIndicator password="" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button onClick={handleChangePassword}>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox id="2fa" />
                  <Label htmlFor="2fa">Enable two-factor authentication</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center">
                    <Building className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      500×500px recommended. PNG or SVG.
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="My Company Ltd." />
                  </div>

                  <div>
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input id="businessEmail" type="email" defaultValue="info@mycompany.com" />
                  </div>

                  <div>
                    <Label htmlFor="companyPhone">Phone</Label>
                    <Input id="companyPhone" defaultValue="+995 555 000111" />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main St, Tbilisi" />
                  </div>

                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" defaultValue="Tbilisi" />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://mycompany.com" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input id="instagram" placeholder="@mycompany" />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input id="facebook" placeholder="@mycompany" />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveCompany}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what you want to be notified about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate notifications for security issues</p>
                  </div>
                  <Checkbox id="securityAlerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklySummary">Weekly summary</Label>
                    <p className="text-sm text-muted-foreground">Analytics and activity digest</p>
                  </div>
                  <Checkbox id="weeklySummary" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="monthlyReport">Monthly report</Label>
                    <p className="text-sm text-muted-foreground">Comprehensive monthly analytics</p>
                  </div>
                  <Checkbox id="monthlyReport" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="productUpdates">Product updates</Label>
                    <p className="text-sm text-muted-foreground">New features and improvements</p>
                  </div>
                  <Checkbox id="productUpdates" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing">Marketing emails</Label>
                    <p className="text-sm text-muted-foreground">Tips, case studies, and promotions</p>
                  </div>
                  <Checkbox id="marketing" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Critical alerts via text message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="criticalSMS">Critical alerts only</Label>
                    <p className="text-sm text-muted-foreground">High-priority security notifications</p>
                  </div>
                  <Checkbox id="criticalSMS" defaultChecked />
                </div>

                <div>
                  <Label htmlFor="smsPhone">SMS Phone Number</Label>
                  <Input id="smsPhone" defaultValue="+995 555 000111" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Notifications</CardTitle>
                <CardDescription>In-app notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="realtimeBadge">Real-time badge count</Label>
                    <p className="text-sm text-muted-foreground">Show notification counter</p>
                  </div>
                  <Checkbox id="realtimeBadge" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="popupCritical">Pop-up for critical alerts</Label>
                    <p className="text-sm text-muted-foreground">Immediate on-screen notifications</p>
                  </div>
                  <Checkbox id="popupCritical" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="soundAlerts">Sound alerts</Label>
                    <p className="text-sm text-muted-foreground">Audio notification for events</p>
                  </div>
                  <Checkbox id="soundAlerts" />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSaveNotifications}>Save Settings</Button>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download all your data (GDPR compliance)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download a copy of all your data including batches, analytics, and settings.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleExportData("json")}>
                    Export JSON
                  </Button>
                  <Button variant="outline" onClick={() => handleExportData("csv")}>
                    Export CSV
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deactivate Account</CardTitle>
                <CardDescription>Temporarily disable your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Deactivate your account temporarily. You can reactivate it at any time by logging in.
                </p>
                <div>
                  <Label htmlFor="deactivatePassword">Confirm with password</Label>
                  <Input id="deactivatePassword" type="password" />
                </div>
                <Button variant="outline">Deactivate Account</Button>
              </CardContent>
            </Card>

            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                  Delete Account
                </CardTitle>
                <CardDescription>Permanently delete your account and all data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <p className="text-sm text-destructive font-medium mb-2">
                    ⚠️ Warning: This action cannot be undone!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This will permanently delete your account, all batches, analytics data, and settings.
                  </p>
                </div>
                <div>
                  <Label htmlFor="deleteConfirmation">
                    Type <span className="font-mono font-bold">DELETE</span> to confirm
                  </Label>
                  <Input 
                    id="deleteConfirmation" 
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="DELETE"
                  />
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== "DELETE"}
                >
                  Delete My Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
