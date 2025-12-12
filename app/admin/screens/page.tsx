'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { screensData, getScreensStats, getUniqueCategories } from '@/lib/admin/screens-data';
import { consolidationData, getConsolidationStats, getQuickWins } from '@/lib/admin/consolidation-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, TrendingDown, Zap, Target, Lightbulb, AlertTriangle } from 'lucide-react';

export default function ScreensDashboard() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [insightsExpanded, setInsightsExpanded] = useState(true);
  const [heatmapExpanded, setHeatmapExpanded] = useState(false);

  const stats = getScreensStats();
  const categories = getUniqueCategories();
  const consolidationStats = getConsolidationStats();
  const quickWins = getQuickWins();

  // Filter data
  const filteredData = useMemo(() => {
    return screensData.filter(screen => {
      const matchCategory = categoryFilter === 'all' || screen.assigned_category === categoryFilter;
      const matchSearch = !searchFilter || 
        screen.screen_name.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [categoryFilter, searchFilter]);

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.85) return 'default';
    if (confidence >= 0.70) return 'secondary';
    return 'destructive';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Adalo Screens Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Analyze and optimize your Adalo app&apos;s 242 screens
        </p>
      </div>

      {/* Optimization Insights */}
      <div className="mb-6">
        <div
          className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors flex items-center justify-between"
          onClick={() => setInsightsExpanded(!insightsExpanded)}
        >
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <span className="font-semibold text-gray-900">
              🎯 Optimization Insights
            </span>
            <Badge variant="destructive" className="bg-red-500">
              {consolidationStats.totalSavings} screens can be eliminated
            </Badge>
          </div>
          {insightsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>

        <AnimatePresence>
          {insightsExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Consolidation Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{consolidationStats.savingsPercent}%</div>
                    <div className="text-sm opacity-90 mt-1">
                      {consolidationStats.totalScreens} → {consolidationStats.potentialScreens} screens (-{consolidationStats.totalSavings})
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Wins Available
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{consolidationStats.phase1Savings}</div>
                    <div className="text-sm opacity-90 mt-1">
                      Phase 1: {consolidationStats.phase1Weeks} weeks
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium opacity-90 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Maintenance Reduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{consolidationStats.maintenanceReduction}</div>
                    <div className="text-sm opacity-90 mt-1">
                      Long-term savings
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Top 4 Quick Wins (Start Here)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickWins.map((win, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{win.action}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="font-mono">{win.from} screens → {win.to} screens</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-500">{win.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={win.complexity === 'low' ? 'default' : 'secondary'}
                            className={win.complexity === 'low' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'}
                          >
                            {win.complexity === 'low' ? 'Low' : 'Med'} complexity
                          </Badge>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">-{win.saves}</div>
                            <div className="text-xs text-gray-500">screens</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Heatmap */}
      <div className="mb-6">
        <div
          className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-between"
          onClick={() => setHeatmapExpanded(!heatmapExpanded)}
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-gray-600" />
            <span className="font-semibold text-gray-700">
              🔥 Category Consolidation Heat Map
            </span>
          </div>
          {heatmapExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>

        <AnimatePresence>
          {heatmapExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {consolidationData.map((data) => {
                      const getHeatColor = (priority: string) => {
                        if (priority === 'extreme') return 'bg-red-500';
                        if (priority === 'high') return 'bg-orange-500';
                        if (priority === 'moderate') return 'bg-yellow-500';
                        return 'bg-green-500';
                      };

                      const getHeatBars = (priority: string) => {
                        if (priority === 'extreme') return 4;
                        if (priority === 'high') return 3;
                        if (priority === 'moderate') return 2;
                        return 1;
                      };

                      return (
                        <div 
                          key={data.category}
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setCategoryFilter(data.category)}
                        >
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{data.category}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {data.currentScreens} screens → {data.potentialScreens} screens
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            {/* Heat indicator */}
                            <div className="flex space-x-1">
                              {[...Array(getHeatBars(data.priority))].map((_, i) => (
                                <div key={i} className={`w-2 h-8 ${getHeatColor(data.priority)} rounded`} />
                              ))}
                            </div>
                            
                            {/* Complexity badge */}
                            <Badge variant={data.complexity === 'low' ? 'default' : 'secondary'}>
                              {data.complexity} effort
                            </Badge>
                            
                            {/* Savings */}
                            <div className="text-right min-w-[80px]">
                              <div className="text-xl font-bold text-red-600">-{data.savings}</div>
                              <div className="text-xs text-gray-500">({data.savingsPercent}%)</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between text-sm flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-700">Priority:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-6 bg-red-500 rounded"></div>
                          <span className="text-gray-600">Extreme</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-6 bg-orange-500 rounded"></div>
                          <span className="text-gray-600">High</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-6 bg-yellow-500 rounded"></div>
                          <span className="text-gray-600">Moderate</span>
                        </div>
                      </div>
                      <div className="text-gray-500">
                        💡 Click any category to filter screens below
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Toggle */}
      <div
        className="mb-6 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-between"
        onClick={() => setStatsExpanded(!statsExpanded)}
      >
        <span className="font-semibold text-gray-700">
          📊 Summary Stats
        </span>
        {statsExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>

      {/* Stats Grid */}
      {statsExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Total Screens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.categories}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Avg Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgConfidence}%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">High Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.highConfidence}%</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Category {categoryFilter !== 'all' && `(${filteredData.length} results)`}
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Search Screen {searchFilter && `(${filteredData.length} results)`}
              </label>
              <Input
                type="text"
                placeholder="Type to search..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Screen Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      No screens match your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((screen, index) => (
                    <motion.tr
                      key={screen.screen_name}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01, duration: 0.2 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <TableCell className="font-medium max-w-xs">
                        {screen.screen_name}
                      </TableCell>
                      <TableCell className="text-purple-600 font-semibold">
                        {screen.assigned_category}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getConfidenceBadge(screen.confidence)}>
                          {(screen.confidence * 100).toFixed(0)}%
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredData.length} of {screensData.length} screens
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

