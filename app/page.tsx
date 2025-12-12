'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Play, BarChart3, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingRoute, setLoadingRoute] = useState<'demo' | 'admin' | null>(null);

  const handleNavigation = (route: 'demo' | 'admin') => {
    setLoadingRoute(route);
    startTransition(() => {
      router.push(`/${route}`);
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            HERDMind App Evolution Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Welcome! This platform helps visualize the future of HERDMind while optimizing the current Adalo infrastructure. 
            <span className="block mt-2 font-medium text-gray-700">
              Choose your path below to explore different aspects of the project.
            </span>
          </p>
        </motion.div>

        {/* Two Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card 
              onClick={() => handleNavigation('demo')}
              className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300 group"
            >
                <CardHeader className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-t-lg pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Play className="h-8 w-8" />
                    </div>
                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Interactive Demo</CardTitle>
                  <CardDescription className="text-purple-100 text-base">
                    Experience three design variants for the HERDMind session planning flow
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    See what the rebuilt app could look like with modern UX patterns. 
                    Compare different approaches to session planning.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Current Approach (v1)</span>
                        <p className="text-sm text-gray-600">Traditional form-based interface</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Progressive Wizard (v2)</span>
                        <p className="text-sm text-gray-600">Step-by-step guided experience</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Conversational Interface (v3)</span>
                        <p className="text-sm text-gray-600">AI-powered chat experience</p>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg group-hover:from-purple-700 group-hover:to-purple-800 transition-all">
                    {loadingRoute === 'demo' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Explore Demo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
          </motion.div>

          {/* Admin Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card 
              onClick={() => handleNavigation('admin')}
              className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-teal-300 group"
            >
                <CardHeader className="bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-t-lg pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <BarChart3 className="h-8 w-8" />
                    </div>
                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Admin Dashboard</CardTitle>
                  <CardDescription className="text-teal-100 text-base">
                    Analyze and optimize the existing Adalo app infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 pb-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Make data-driven decisions about screen consolidation and session plan coverage. 
                    Understand what exists and what can be streamlined.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">242 Adalo Screens Analyzed</span>
                        <p className="text-sm text-gray-600">Complete categorization with confidence metrics</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">92-Screen Reduction Potential</span>
                        <p className="text-sm text-gray-600">Identified duplicates and consolidation opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">100 Session Plan Combinations</span>
                        <p className="text-sm text-gray-600">Track coverage across categories, themes, and props</p>
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg group-hover:from-teal-700 group-hover:to-teal-800 transition-all">
                    {loadingRoute === 'admin' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Open Admin Dashboard
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
          </motion.div>
        </div>

        {/* Footer Status Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="py-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700">Project Status</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-white">27% Coverage</Badge>
                  <span>Session Plan Combinations</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-white">38% Potential</Badge>
                  <span>Screen Optimization</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
