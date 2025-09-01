import React, { useState } from 'react';
import { Plus, Search, AlertTriangle, Package, Calendar, MapPin } from 'lucide-react';
import { mockBloodInventory } from '../data/mockData';
import { BloodInventory as BloodInventoryType } from '../types';
import { format, differenceInDays, isAfter, addDays } from 'date-fns';

const BloodInventory: React.FC = () => {
  const [inventory] = useState<BloodInventoryType[]>(mockBloodInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodGroup, setFilterBloodGroup] = useState<string>('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBloodGroup === 'all' || item.bloodGroup === filterBloodGroup;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (item: BloodInventoryType) => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysUntilExpiry = differenceInDays(expiry, today);

    if (item.status === 'expired' || daysUntilExpiry < 0) {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Expired</span>;
    }
    
    if (daysUntilExpiry <= 7) {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">Expiring Soon</span>;
    }
    
    if (item.status === 'reserved') {
      return <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Reserved</span>;
    }
    
    return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Available</span>;
  };

  const getTotalByBloodGroup = () => {
    const totals: Record<string, number> = {};
    inventory.forEach(item => {
      if (item.status === 'available') {
        totals[item.bloodGroup] = (totals[item.bloodGroup] || 0) + item.quantity;
      }
    });
    return totals;
  };

  const bloodGroupTotals = getTotalByBloodGroup();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blood Inventory</h1>
          <p className="text-gray-600 mt-1">Monitor blood stock levels and manage inventory</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
          <Plus className="w-5 h-5" />
          <span>Add Collection</span>
        </button>
      </div>

      {/* Blood Group Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bloodGroup => (
          <div key={bloodGroup} className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-red-800 font-bold text-lg">{bloodGroup}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{bloodGroupTotals[bloodGroup] || 0}</p>
            <p className="text-sm text-gray-600">units</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by blood group or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <select
            value={filterBloodGroup}
            onChange={(e) => setFilterBloodGroup(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <div>
              <h3 className="font-semibold text-orange-900">Expiring Soon</h3>
              <p className="text-sm text-orange-700">
                {inventory.filter(item => {
                  const daysUntilExpiry = differenceInDays(new Date(item.expiryDate), new Date());
                  return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
                }).length} units expiring in the next 7 days
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Package className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Low Stock Alert</h3>
              <p className="text-sm text-red-700">
                {Object.entries(bloodGroupTotals).filter(([_, count]) => count < 10).length} blood groups below 10 units
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Blood Group</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Quantity</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Collection Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Expiry Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Test Results</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInventory.map((item) => {
                const daysUntilExpiry = differenceInDays(new Date(item.expiryDate), new Date());
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center justify-center w-16 h-12 bg-red-100 text-red-800 rounded-lg font-bold text-xl border border-red-200">
                        {item.bloodGroup}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-lg font-semibold text-gray-900">{item.quantity} units</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{format(new Date(item.collectionDate), 'MMM dd, yyyy')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`${daysUntilExpiry <= 7 ? 'text-orange-700 font-semibold' : 'text-gray-700'}`}>
                          {format(new Date(item.expiryDate), 'MMM dd, yyyy')}
                        </span>
                        {daysUntilExpiry <= 7 && (
                          <span className="text-xs text-orange-600">({daysUntilExpiry} days)</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(item)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {Object.entries(item.testResults).every(([_, result]) => !result) ? (
                          <span className="text-green-600 font-medium">All Clear ✓</span>
                        ) : (
                          <span className="text-red-600 font-medium">Review Required</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;