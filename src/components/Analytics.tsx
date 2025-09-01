import React from 'react';
import { TrendingUp, Users, Droplets, Building2, Calendar } from 'lucide-react';
import { mockDashboardStats } from '../data/mockData';

const Analytics: React.FC = () => {
  const stats = mockDashboardStats;

  const MetricCard: React.FC<{
    title: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    trend: string;
    trendUp: boolean;
  }> = ({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center mt-2">
            <TrendingUp className={`w-4 h-4 mr-1 ${trendUp ? 'text-green-600' : 'text-red-600'} ${!trendUp && 'transform rotate-180'}`} />
            <span className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
          </div>
        </div>
        <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="w-7 h-7 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights into blood bank operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Donation Rate"
          value="94.2%"
          icon={TrendingUp}
          trend="+5.4% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Donor Retention"
          value="87.8%"
          icon={Users}
          trend="+2.1% from last month"
          trendUp={true}
        />
        <MetricCard
          title="Inventory Turnover"
          value="24.5 days"
          icon={Droplets}
          trend="-1.2 days from last month"
          trendUp={true}
        />
        <MetricCard
          title="Request Fulfillment"
          value="96.7%"
          icon={Building2}
          trend="+1.8% from last month"
          trendUp={true}
        />
      </div>

      {/* Monthly Donations Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Donation Trends</h3>
        <div className="relative">
          <div className="flex items-end justify-between h-64 border-b border-gray-200">
            {stats.monthlyDonations.map((month, index) => {
              const maxDonations = Math.max(...stats.monthlyDonations.map(m => m.donations));
              const height = (month.donations / maxDonations) * 200;
              
              return (
                <div key={month.month} className="flex flex-col items-center space-y-2">
                  <div className="text-sm font-medium text-gray-900 mb-1">{month.donations}</div>
                  <div
                    className="w-12 bg-red-500 rounded-t-lg transition-all duration-500 hover:bg-red-600"
                    style={{ height: `${height}px` }}
                  ></div>
                  <div className="text-sm text-gray-600 font-medium">{month.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blood Group Distribution and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Group Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Distribution</h3>
          <div className="space-y-3">
            {Object.entries(stats.bloodGroupDistribution)
              .sort(([,a], [,b]) => b - a)
              .map(([bloodGroup, count]) => {
                const maxCount = Math.max(...Object.values(stats.bloodGroupDistribution));
                const percentage = (count / maxCount) * 100;
                
                return (
                  <div key={bloodGroup} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-800 font-semibold text-sm">{bloodGroup}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{bloodGroup}</span>
                        <span className="text-sm font-semibold text-gray-900">{count} units</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Quick Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
          <div className="space-y-3">
            {[
              { title: 'Monthly Donation Report', description: 'Detailed donor activity and collection statistics', icon: Calendar },
              { title: 'Inventory Status Report', description: 'Current stock levels and expiry analysis', icon: Droplets },
              { title: 'Hospital Request Analysis', description: 'Request patterns and fulfillment rates', icon: Building2 },
              { title: 'Donor Demographics', description: 'Age, location, and donation frequency analysis', icon: Users }
            ].map((report, index) => (
              <button key={index} className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <report.icon className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Generate Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;