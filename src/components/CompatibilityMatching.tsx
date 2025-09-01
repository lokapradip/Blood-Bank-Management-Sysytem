import React, { useState } from 'react';
import { Search, Heart, ArrowRight, Users, Droplets } from 'lucide-react';
import { mockDonors, mockBloodInventory, bloodGroupCompatibility } from '../data/mockData';
import { BloodGroup } from '../types';

const CompatibilityMatching: React.FC = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup | ''>('');
  const [unitsNeeded, setUnitsNeeded] = useState<number>(1);

  const getCompatibleDonors = (recipientBloodGroup: BloodGroup) => {
    // Get blood groups that can donate to the recipient
    const compatibleGroups = Object.entries(bloodGroupCompatibility)
      .filter(([_, canDonateTo]) => canDonateTo.includes(recipientBloodGroup))
      .map(([bloodGroup]) => bloodGroup as BloodGroup);

    return mockDonors.filter(donor => 
      compatibleGroups.includes(donor.bloodGroup) && 
      donor.eligibilityStatus === 'eligible'
    );
  };

  const getAvailableInventory = (recipientBloodGroup: BloodGroup) => {
    const compatibleGroups = Object.entries(bloodGroupCompatibility)
      .filter(([_, canDonateTo]) => canDonateTo.includes(recipientBloodGroup))
      .map(([bloodGroup]) => bloodGroup as BloodGroup);

    return mockBloodInventory.filter(item => 
      compatibleGroups.includes(item.bloodGroup) && 
      item.status === 'available'
    );
  };

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Compatibility Matching</h1>
          <p className="text-gray-600 mt-1">Find compatible donors and blood units for recipients</p>
        </div>
      </div>

      {/* Blood Group Compatibility Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Group Compatibility Chart</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Donor Blood Group</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">A+</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">A-</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">B+</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">B-</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">AB+</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">AB-</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">O+</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-900">O-</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bloodGroups.map(donorGroup => (
                <tr key={donorGroup} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">{donorGroup}</td>
                  {bloodGroups.map(recipientGroup => (
                    <td key={recipientGroup} className="text-center py-3 px-2">
                      {bloodGroupCompatibility[donorGroup]?.includes(recipientGroup) ? (
                        <span className="inline-block w-6 h-6 bg-green-500 rounded-full text-white text-xs leading-6">✓</span>
                      ) : (
                        <span className="inline-block w-6 h-6 bg-red-500 rounded-full text-white text-xs leading-6">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Matching Tool */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Compatible Matches</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Blood Group</label>
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value as BloodGroup)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed</label>
            <input
              type="number"
              min="1"
              max="20"
              value={unitsNeeded}
              onChange={(e) => setUnitsNeeded(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
              <Search className="w-5 h-5" />
              <span>Find Matches</span>
            </button>
          </div>
        </div>

        {selectedBloodGroup && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compatible Donors */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>Compatible Donors ({getCompatibleDonors(selectedBloodGroup).length})</span>
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getCompatibleDonors(selectedBloodGroup).map(donor => (
                  <div key={donor.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 font-semibold text-sm">{donor.bloodGroup}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{donor.firstName} {donor.lastName}</p>
                          <p className="text-sm text-gray-600">{donor.email}</p>
                          <p className="text-xs text-gray-500">Total donations: {donor.totalDonations}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">
                          {donor.bloodGroup === selectedBloodGroup ? 'Exact Match' : 'Compatible'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Inventory */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-red-600" />
                <span>Available Inventory</span>
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getAvailableInventory(selectedBloodGroup).map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-800 font-semibold text-sm">{item.bloodGroup}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.quantity} units available</p>
                          <p className="text-sm text-gray-600">{item.location}</p>
                          <p className="text-xs text-gray-500">Expires: {format(new Date(item.expiryDate), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-700">
                          {item.bloodGroup === selectedBloodGroup ? 'Exact Match' : 'Compatible'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedBloodGroup && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Total compatible units available: {' '}
                  <span className="text-lg font-bold text-green-600">
                    {getAvailableInventory(selectedBloodGroup).reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Compatible donors: {getCompatibleDonors(selectedBloodGroup).length}
                </p>
              </div>
              <div className="text-right">
                {getAvailableInventory(selectedBloodGroup).reduce((total, item) => total + item.quantity, 0) >= unitsNeeded ? (
                  <span className="text-green-600 font-semibold">✓ Sufficient Supply</span>
                ) : (
                  <span className="text-red-600 font-semibold">⚠ Insufficient Supply</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityMatching;