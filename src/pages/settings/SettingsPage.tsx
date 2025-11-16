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
            <LanguageSelector />
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

          {/* Company Profile Tab */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>
                  Manage your company information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo */}
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG up to 2MB. Recommended: 512x512px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('auth.companyName')}</Label>
                  <Input id="companyName" defaultValue="Saperavi Winery" />
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.email')}</Label>
                    <Input id="email" type="email" defaultValue="info@saperavi.ge" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('auth.phone')}</Label>
                    <Input id="phone" defaultValue="+995 555 123 456" />
                  </div>
                </div>

                {/* Region & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">{t('auth.region')}</Label>
                    <Select defaultValue="kakheti">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {GEORGIAN_REGIONS.map((region) => (
                          <SelectItem key={region} value={region.toLowerCase()}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">{t('auth.industry')}</Label>
                    <Select defaultValue="wine">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry.toLowerCase()}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">{t('auth.address')}</Label>
                  <Input id="address" defaultValue="Tsinandali Village, Telavi" />
                </div>

                {/* Website & Social */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">{t('auth.website')}</Label>
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">{t('auth.instagram')}</Label>
                    <Input id="instagram" placeholder="@yourcompany" />
                  </div>
                </div>

                <Button onClick={handleSaveCompany}>{t('common.save')}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPassword && <PasswordStrengthIndicator password={newPassword} />}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>

                <Button onClick={handleChangePassword}>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your products and security alerts
                      </p>
                    </div>
                    <Checkbox id="emailNotifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified of suspicious activity immediately
                      </p>
                    </div>
                    <Checkbox id="securityAlerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly analytics summary
                      </p>
                    </div>
                    <Checkbox id="weeklyReports" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="productUpdates">Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new features are available
                      </p>
                    </div>
                    <Checkbox id="productUpdates" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive tips, best practices, and special offers
                      </p>
                    </div>
                    <Checkbox id="marketingEmails" />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>{t('common.save')}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription & Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">$49/month • Unlimited batches</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Batches Created</p>
                      <p className="text-2xl font-bold">12 / Unlimited</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">QR Codes Generated</p>
                      <p className="text-2xl font-bold">1,234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">Jan 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$49.00</p>
                        <Button variant="link" size="sm">Download</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Export */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Your Data</CardTitle>
                  <CardDescription>Download all your company data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExportData('json')}>
                      Export as JSON
                    </Button>
                    <Button variant="outline" onClick={() => handleExportData('csv')}>
                      Export as CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deleteConfirmation">
                      Type <strong>DELETE</strong> to confirm
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
