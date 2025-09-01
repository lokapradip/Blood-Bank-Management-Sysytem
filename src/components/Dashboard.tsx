import React from 'react';
import { Users, Droplets, Building2, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { mockDashboardStats } from '../data/mockData';
import { format, addDays } from 'date-fns';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: string;
  }> = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </div>
  );

  const BloodGroupCard: React.FC<{ bloodGroup: string; units: number }> = ({ bloodGroup, units }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">{bloodGroup}</p>
          <p className="text-sm text-gray-600">Blood Group</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-600">{units}</p>
          <p className="text-sm text-gray-500">units</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-red-600 h-2 rounded-full" 
            style={{ width: `${Math.min((units / 50) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Capacity: {units}/50 units</p>
      </div>
    </div>
  );

  const recentActivity = [
    { type: 'donation', message: 'John Smith donated 1 unit of O+ blood', time: '2 hours ago' },
    { type: 'request', message: 'General Hospital requested 4 units of A+ blood', time: '4 hours ago' },
    { type: 'approval', message: 'Request #REQ-2024-156 approved for City Medical', time: '6 hours ago' },
    { type: 'alert', message: '5 units of AB- blood expiring in 3 days', time: '8 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, here's what's happening today</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
          <p className="text-xs text-gray-400">{format(new Date(), 'h:mm a')}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donors"
          value={stats.totalDonors}
          icon={Users}
          color="bg-blue-600"
          trend="+12% this month"
        />
        <StatCard
          title="Blood Units"
          value={stats.totalBloodUnits}
          icon={Droplets}
          color="bg-red-600"
          trend="+8% this week"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={Building2}
          color="bg-amber-600"
        />
        <StatCard
          title="Expiring Soon"
          value={stats.expiringUnits}
          icon={AlertTriangle}
          color="bg-orange-600"
        />
      </div>

      {/* Blood Group Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Inventory</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.bloodGroupDistribution).map(([bloodGroup, units]) => (
                <BloodGroupCard key={bloodGroup} bloodGroup={bloodGroup} units={units} />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'donation' ? 'bg-green-500' :
                  activity.type === 'request' ? 'bg-blue-500' :
                  activity.type === 'approval' ? 'bg-emerald-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts and Additional Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Donations Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donations</h3>
          <div className="space-y-3">
            {stats.monthlyDonations.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{month.month} 2024</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.donations / 60) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8">{month.donations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Register New Donor</p>
                  <p className="text-sm text-red-600">Add a new blood donor to the system</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Droplets className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Add Blood Collection</p>
                  <p className="text-sm text-blue-600">Record new blood collection</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-4 bg-amber-50 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-900">Process Hospital Request</p>
                  <p className="text-sm text-amber-600">Review pending blood requests</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;