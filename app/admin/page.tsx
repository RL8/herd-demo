'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, FileText, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const dashboards = [
    {
      title: 'Screens Dashboard',
      description: 'Analyze and optimize Adalo screen categorizations',
      href: '/admin/screens',
      icon: Monitor,
      stats: '242 Screens',
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Session Plans Dashboard',
      description: 'Manage session plan combinations and coverage',
      href: '/admin/plans',
      icon: FileText,
      stats: '100 Combinations',
      color: 'from-teal-600 to-teal-800',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage screens, session plans, and application data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboards.map((dashboard, index) => {
          const Icon = dashboard.icon;
          return (
            <Link key={dashboard.href} href={dashboard.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${dashboard.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="mt-4">{dashboard.title}</CardTitle>
                    <CardDescription>{dashboard.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      {dashboard.stats}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Screens</span>
                <span className="text-sm font-semibold">242</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Categories</span>
                <span className="text-sm font-semibold">13</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Optimization Potential</span>
                <span className="text-sm font-semibold text-red-600">-92 screens</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Existing Plans</span>
                <span className="text-sm font-semibold">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Coverage</span>
                <span className="text-sm font-semibold">27%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
              <div className="text-xs text-gray-500">Last updated: Just now</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

