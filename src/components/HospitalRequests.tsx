import React, { useState } from 'react';
import { Plus, Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockHospitalRequests } from '../data/mockData';
import { HospitalRequest } from '../types';
import { format } from 'date-fns';

const HospitalRequests: React.FC = () => {
  const [requests] = useState<HospitalRequest[]>(mockHospitalRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || request.urgency === filterUrgency;
    
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'fulfilled':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      approved: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Approved' },
      fulfilled: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Fulfilled' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {getStatusIcon(status)}
        <span>{config.label}</span>
      </span>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Low' },
      medium: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Medium' },
      high: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'High' },
      emergency: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Emergency' }
    };
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig] || urgencyConfig.low;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {urgency === 'emergency' && <AlertCircle className="w-3 h-3 inline mr-1" />}
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Requests</h1>
          <p className="text-gray-600 mt-1">Manage blood requests from hospitals and medical facilities</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="w-5 h-5" />
          <span>New Request</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Requests', value: requests.length, color: 'bg-blue-600' },
          { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, color: 'bg-yellow-600' },
          { label: 'Approved', value: requests.filter(r => r.status === 'approved').length, color: 'bg-green-600' },
          { label: 'Emergency', value: requests.filter(r => r.urgency === 'emergency').length, color: 'bg-red-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
            </div>
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
              placeholder="Search by hospital, doctor, or blood group..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="rejected">Rejected</option>
          </select>
          <select
            value={filterUrgency}
            onChange={(e) => setFilterUrgency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Request ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Hospital</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Blood Group</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Units Required</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Urgency</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Required By</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <span className="font-mono text-sm font-semibold text-gray-900">{request.id.toUpperCase()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-gray-900">{request.hospitalName}</p>
                      <p className="text-sm text-gray-600">{request.doctorName}</p>
                      <p className="text-sm text-gray-500">{request.contactPhone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-800 rounded-lg font-bold text-lg border border-red-200">
                      {request.bloodGroup}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-gray-900">{request.unitsRequired}</span>
                  </td>
                  <td className="py-4 px-6">
                    {getUrgencyBadge(request.urgency)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{format(new Date(request.requiredBy), 'MMM dd, yyyy')}</span>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200">
                            Reject
                          </button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200">
                          Fulfill
                        </button>
                      )}
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalRequests;