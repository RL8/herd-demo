'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { plansData, getPlansStats, getUniqueCategoriesFromPlans, getUniqueThemesFromPlans, getUniquePropsFromPlans } from '@/lib/admin/plans-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PlansDashboard() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('all');
  const [propsFilter, setPropsFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState<typeof plansData.combinations[0] | null>(null);

  const stats = getPlansStats();
  const categories = getUniqueCategoriesFromPlans();
  const themes = getUniqueThemesFromPlans();
  const props = getUniquePropsFromPlans();

  const filteredData = useMemo(() => {
    return plansData.combinations.filter(combo => {
      const matchCategory = categoryFilter === 'all' || combo.category === categoryFilter;
      const matchTheme = themeFilter === 'all' || combo.theme === themeFilter;
      const matchProps = propsFilter === 'all' || combo.props === propsFilter;
      const matchStatus = statusFilter === 'all' ||
        (statusFilter === 'exists' && combo.hasPlan) ||
        (statusFilter === 'missing' && !combo.hasPlan);
      const matchSearch = !searchFilter || 
        combo.planName.toLowerCase().includes(searchFilter.toLowerCase());

      return matchCategory && matchTheme && matchProps && matchStatus && matchSearch;
    });
  }, [categoryFilter, themeFilter, propsFilter, statusFilter, searchFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Session Plans Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage session plan combinations and coverage
        </p>
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
          <Card className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Total Combinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Existing Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.existing}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Missing Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.missing}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium opacity-90">Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.coverage}%</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Theme</label>
              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  {themes.map(theme => (
                    <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Props</label>
              <Select value={propsFilter} onValueChange={setPropsFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Props" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Props</SelectItem>
                  {props.map(prop => (
                    <SelectItem key={prop} value={prop}>{prop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="exists">Has Plan</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <Input
                type="text"
                placeholder="Search plans..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Grid/Table View */}
      <Tabs defaultValue="table" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Spreadsheet View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <Card>
            <CardHeader>
              <CardTitle>Plan Combinations Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 overflow-x-auto">
                {categories.map(category => (
                  <div key={category} className="mb-6">
                    <h3 className="text-lg font-semibold border-b-2 border-teal-600 pb-2 mb-4">
                      {category}
                    </h3>
                    <div className="grid grid-cols-[200px_repeat(4,1fr)] gap-2 text-sm">
                      <div className="font-bold bg-gray-100 p-2 rounded-md text-center">
                        Theme / Props
                      </div>
                      {props.map(prop => (
                        <div
                          key={prop}
                          className="font-bold bg-gray-100 p-2 rounded-md text-center text-xs"
                          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                        >
                          {prop}
                        </div>
                      ))}
                      {themes.map(theme => (
                        <div key={theme} className="contents">
                          <div className="font-semibold bg-gray-50 p-2 rounded-md flex items-center justify-center text-xs">
                            {theme}
                          </div>
                          {props.map(prop => {
                            const combo = filteredData.find(
                              c => c.category === category && c.theme === theme && c.props === prop
                            );
                            return (
                              <div
                                key={`${category}-${theme}-${prop}`}
                                className={`p-3 border-2 rounded-md flex flex-col items-center justify-center min-h-[80px] cursor-pointer transition-colors ${
                                  combo?.hasPlan
                                    ? 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100'
                                    : 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100'
                                }`}
                                onClick={() => setSelectedCombo(combo || null)}
                              >
                                <div className="font-bold text-lg">{combo?.count || 0}</div>
                                <div className="text-xs">{combo?.hasPlan ? 'Has Plan' : 'Missing'}</div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Session Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Folio</TableHead>
                      <TableHead className="w-[200px]">Plan Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Theme</TableHead>
                      <TableHead>Props</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="w-[60px]">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No plans match your filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((combo, index) => (
                        <motion.tr
                          key={combo.folio}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.01, duration: 0.2 }}
                          className="border-b hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedCombo(combo)}
                        >
                          <TableCell className="font-medium">{combo.folio}</TableCell>
                          <TableCell className="font-medium">{combo.planName}</TableCell>
                          <TableCell>{combo.category}</TableCell>
                          <TableCell>{combo.theme}</TableCell>
                          <TableCell>{combo.props}</TableCell>
                          <TableCell>
                            <Badge variant={combo.hasPlan ? 'default' : 'destructive'}>
                              {combo.hasPlan ? 'Has Plan' : 'Missing'}
                            </Badge>
                          </TableCell>
                          <TableCell>{combo.count}</TableCell>
                        </motion.tr>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredData.length} of {plansData.combinations.length} combinations
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Details Panel */}
      {selectedCombo && (
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-teal-600 mb-4">
              <div className="space-y-1 text-sm">
                <div><strong>Folio:</strong> {selectedCombo.folio}</div>
                <div><strong>Category:</strong> {selectedCombo.category}</div>
                <div><strong>Theme:</strong> {selectedCombo.theme}</div>
                <div><strong>Props:</strong> {selectedCombo.props}</div>
              </div>
            </div>

            {selectedCombo.hasPlan && selectedCombo.plans.length > 0 ? (
              <div className="space-y-4">
                {selectedCombo.plans.map(plan => (
                  <div key={plan.id} className="bg-white p-4 rounded-md border-l-4 border-green-500 shadow-sm">
                    <h4 className="text-lg font-semibold text-teal-700 mb-2">{plan.name}</h4>
                    <p className="text-sm text-gray-600 mb-2"><strong>ID:</strong> {plan.id}</p>
                    {plan.description && (
                      <p className="text-sm text-gray-700 mb-2">{plan.description.substring(0, 200)}...</p>
                    )}
                    {plan.focus && (
                      <p className="text-sm text-gray-700"><strong>Focus:</strong> {plan.focus}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500 text-yellow-800">
                <h4 className="font-semibold mb-2">No Plan Exists</h4>
                <p className="text-sm">This combination doesn't have a session plan yet. Consider creating one.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}

