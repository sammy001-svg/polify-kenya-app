"use client"

import { Settings, Shield, Bell, Database, Globe, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Global Settings</h1>
         <p className="text-brand-text-muted text-sm">Configure system-wide parameters and administrative protocols.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <div className="flex items-center gap-2 text-brand-primary">
                  <Shield className="w-5 h-5" />
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">Security & Access</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Strict Verification Mode</Label>
                     <p className="text-[10px] text-brand-text-muted">Require manual approval for all professional roles.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Two-Factor Enforcement</Label>
                     <p className="text-[10px] text-brand-text-muted">Force 2FA for all administrative accounts.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">IP Whitelisting</Label>
                     <p className="text-[10px] text-brand-text-muted">Restrict admin access to known trusted networks.</p>
                  </div>
                  <Switch />
               </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <div className="flex items-center gap-2 text-blue-500">
                  <Globe className="w-5 h-5" />
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">Platform Modules</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Justice Portal</Label>
                     <p className="text-[10px] text-brand-text-muted">Enable/Disable legal aid and advocate search.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Parliament Watch</Label>
                     <p className="text-[10px] text-brand-text-muted">BETA: Legislative tracking and citizen voting.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">AI Civic Feed</Label>
                     <p className="text-[10px] text-brand-text-muted">Automated content aggregation and scanning.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <div className="flex items-center gap-2 text-purple-500">
                  <Database className="w-5 h-5" />
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">Data Infrastructure</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Real-time Analytics</Label>
                     <p className="text-[10px] text-brand-text-muted">Toggle background tracking for engagement pulse.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Auto-Cleanup Logs</Label>
                     <p className="text-[10px] text-brand-text-muted">Rotate internal system logs every 30 days.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <div className="flex items-center gap-2 text-kenya-red">
                  <Bell className="w-5 h-5" />
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-white">Notifications</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Email Critical Alerts</Label>
                     <p className="text-[10px] text-brand-text-muted">Notify admins immediately of system failures.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-sm font-bold text-white">Weekly Platform Report</Label>
                     <p className="text-[10px] text-brand-text-muted">Send automated summary of civic engagement.</p>
                  </div>
                  <Switch defaultChecked />
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="flex justify-end pt-4">
         <Button className="bg-brand-primary text-black font-bold uppercase tracking-widest px-8">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
         </Button>
      </div>
    </div>
  );
}
