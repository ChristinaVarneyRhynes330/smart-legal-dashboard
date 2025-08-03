import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Users, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter,
  Plus,
  Bell,
  Shield,
  ChevronRight,
  Database,
  Scale,
  UserCheck,
  BookOpen,
  TrendingUp,
  Settings,
  Home,
  MessageCircle,
  Upload
} from 'lucide-react';

const ChildWelfareDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cases, setCases] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data initialization
  useEffect(() => {
    // Initialize with sample cases based on your database schema
    setCases([
      {
        case_id: 1,
        client_last_name: 'Varney',
        client_first_name: 'Christina',
        case_number: '05-2024-DP-000587-XXDP-BC',
        court_jurisdiction: '18th Judicial Circuit, FL',
        assigned_judge: 'Hon. McKibben',
        case_status: 'Active',
        date_opened: '2024-01-23',
        priority_level: 5,
        constitutional_issues: 'Unlawful removal; No exigency; Fourteenth Amendment violations',
        next_hearing_date: '2025-08-20',
        children: [
          {
            child_name: 'Lyllian Varney',
            date_of_birth: '2010-05-14',
            current_placement: 'Dell B Angels Group Home',
            special_needs: 'High anxiety and PTSD'
          }
        ]
      },
      {
        case_id: 2,
        client_last_name: 'Johnson',
        client_first_name: 'Maria',
        case_number: '05-2024-DP-000623-XXDP-BC',
        court_jurisdiction: '18th Judicial Circuit, FL',
        assigned_judge: 'Hon. Rodriguez',
        case_status: 'Active',
        date_opened: '2024-03-15',
        priority_level: 3,
        constitutional_issues: 'Due process concerns',
        next_hearing_date: '2025-08-25',
        children: [
          {
            child_name: 'Carlos Johnson',
            date_of_birth: '2012-08-20',
            current_placement: 'Kinship Care - Grandmother',
            special_needs: 'None reported'
          }
        ]
      }
    ]);

    // Initialize alerts
    setAlerts([
      {
        id: 1,
        type: 'deadline',
        priority: 'high',
        message: 'TPR hearing in 7 days - Varney case',
        case_id: 1,
        days_until: 7
      },
      {
        id: 2,
        type: 'document',
        priority: 'medium',
        message: 'Missing expert witness report - Johnson case',
        case_id: 2,
        days_until: 14
      },
      {
        id: 3,
        type: 'constitutional',
        priority: 'high',
        message: 'Due process violation flagged - Review required',
        case_id: 1,
        days_until: 3
      }
    ]);
  }, []);

  const getPriorityColor = (level) => {
    if (level >= 4) return 'bg-red-100 text-red-800 border-red-200';
    if (level >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getAlertColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const filteredCases = cases.filter(case_ => 
    case_.client_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    case_.case_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Scale className="w-6 h-6" />
          Child Welfare Legal
        </h1>
        <p className="text-slate-400 text-sm">Case Management System</p>
      </div>
      
      <nav className="space-y-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'cases', label: 'Cases', icon: FileText },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'clients', label: 'Clients', icon: Users },
          { id: 'experts', label: 'Expert Witnesses', icon: UserCheck },
          { id: 'research', label: 'Legal Research', icon: BookOpen },
          { id: 'analytics', label: 'Predictive Analytics', icon: TrendingUp },
          { id: 'documents', label: 'Document Management', icon: Database },
          { id: 'communications', label: 'Client Portal', icon: MessageCircle },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cases</p>
              <p className="text-2xl font-bold text-gray-900">{cases.length}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Urgent Alerts</p>
              <p className="text-2xl font-bold text-red-600">{alerts.filter(a => a.priority === 'high').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Hearings</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">87%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Recent Alerts
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-medium">{alert.message}</span>
                  </div>
                  <span className="text-sm">{alert.days_until} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Cases */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Cases</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {cases.slice(0, 3).map(case_ => (
              <div key={case_.case_id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {case_.client_first_name} {case_.client_last_name}
                    </h3>
                    <p className="text-sm text-gray-600">{case_.case_number}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(case_.priority_level)}`}>
                        Priority {case_.priority_level}
                      </span>
                      <span className="text-xs text-gray-500">{case_.assigned_judge}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CasesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Case Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Case
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search cases by name or case number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Cases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Case Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Hearing
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map(case_ => (
                <tr key={case_.case_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {case_.client_first_name} {case_.client_last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {case_.children.length} child{case_.children.length !== 1 ? 'ren' : ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.case_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.assigned_judge}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(case_.priority_level)}`}>
                      Level {case_.priority_level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {case_.next_hearing_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 border border-green-200">
                      {case_.case_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ExpertsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Expert Witness Directory</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Expert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            name: "Dr. Monique Hale, PsyD",
            specialties: ["Child Psychiatry", "Trauma Evaluation"],
            experience: "112 cases testified",
            jurisdictions: ["FL", "GA", "TX"],
            rating: 4.8,
            availability: "Available"
          },
          {
            name: "Dr. Sarah Johnson, MD",
            specialties: ["Child Abuse Pediatrics", "Forensic Medicine"],
            experience: "150 cases testified",
            jurisdictions: ["FL", "AL", "GA"],
            rating: 4.9,
            availability: "Booked until Sep"
          },
          {
            name: "Dr. Michael Chen, PhD",
            specialties: ["Developmental Psychology", "Assessment"],
            experience: "88 cases testified",
            jurisdictions: ["FL", "NC", "SC"],
            rating: 4.7,
            availability: "Available"
          }
        ].map((expert, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{expert.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600">{expert.rating}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                expert.availability === 'Available' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {expert.availability}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Specialties</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {expert.specialties.map((specialty, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Experience</p>
                <p className="text-sm text-gray-600">{expert.experience}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Jurisdictions</p>
                <p className="text-sm text-gray-600">{expert.jurisdictions.join(', ')}</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Contact
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DocumentsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { type: 'Court Orders', count: 23, icon: Scale, color: 'blue' },
          { type: 'Expert Reports', count: 15, icon: UserCheck, color: 'green' },
          { type: 'Case Plans', count: 8, icon: FileText, color: 'yellow' },
          { type: 'Evidence', count: 34, icon: Shield, color: 'red' }
        ].map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{category.type}</p>
                <p className="text-2xl font-bold text-gray-900">{category.count}</p>
              </div>
              <category.icon className={`w-8 h-8 text-${category.color}-600`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'TPR Motion - Varney Case', type: 'Court Filing', date: '2025-08-01', status: 'Pending Review' },
              { name: 'Psychological Evaluation - Johnson', type: 'Expert Report', date: '2025-07-30', status: 'Approved' },
              { name: 'Case Plan Update - Varney', type: 'Service Plan', date: '2025-07-28', status: 'Draft' },
              { name: 'Shelter Hearing Order', type: 'Court Order', date: '2025-07-25', status: 'Final' }
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    doc.status === 'Final' ? 'bg-green-100 text-green-800' :
                    doc.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                    doc.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'cases': return <CasesView />;
      case 'experts': return <ExpertsView />;
      case 'documents': return <DocumentsView />;
      default: 
        return (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-gray-600">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default ChildWelfareDashboard;