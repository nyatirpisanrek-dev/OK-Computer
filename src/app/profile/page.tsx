'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Bell,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react'
import ProfileCard from '@/components/ProfileCard'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    bio: 'Passionate PC enthusiast and gamer. Love building custom rigs and exploring the latest tech.',
    joinDate: 'January 2023',
    avatar: '/api/placeholder/150/150'
  })

  const [editForm, setEditForm] = useState(profile)

  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your personal details and contact information
                      </p>
                    </div>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        {isEditing ? (
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{profile.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                            placeholder="Enter your email"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{profile.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        {isEditing ? (
                          <Input
                            value={editForm.phone}
                            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{profile.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        {isEditing ? (
                          <Input
                            value={editForm.location}
                            onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                            placeholder="Enter your location"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{profile.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      {isEditing ? (
                        <textarea
                          className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">
                          <p className="text-sm">{profile.bio}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Security Settings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage your password and security preferences
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <Input type="password" placeholder="Current password" />
                          <Input type="password" placeholder="New password" />
                          <Input type="password" placeholder="Confirm new password" />
                          <Button>Update Password</Button>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Login Sessions</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Manage your active login sessions
                        </p>
                        <Button variant="outline">View Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications">
                <Card>
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Choose what notifications you want to receive
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive updates via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Product Updates</h4>
                          <p className="text-sm text-muted-foreground">Get notified about new products</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Order Updates</h4>
                          <p className="text-sm text-muted-foreground">Track your order status</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">Receive promotional content</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Billing */}
              <TabsContent value="billing">
                <Card>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Manage your subscription and payment methods
                  </p>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Premium Plan</h4>
                          <Badge>Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Your premium subscription is active until Dec 31, 2024
                        </p>
                        <Button variant="outline" size="sm">Manage Subscription</Button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Payment Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5" />
                              <div>
                                <p className="font-medium">•••• •••• •••• 4242</p>
                                <p className="text-sm text-muted-foreground">Expires 12/26</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </div>
                        <Button variant="outline" className="mt-3">Add Payment Method</Button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Billing History</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">Premium Plan - Monthly</p>
                              <p className="text-sm text-muted-foreground">Nov 1, 2024</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$29.99</p>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
