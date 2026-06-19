import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Activity, Calendar, Clock, User } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/appointments/my-appointments`, config);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const upcomingCount = appointments.filter(a => a.status === 'pending' || a.status === 'approved').length;
  const pastCount = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled').length;
  const recentAppointments = appointments.slice(0, 3); // Get 3 most recent

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Manage your health and appointments from your dashboard.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Upcoming Appointments</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? '-' : upcomingCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Past Consultations</p>
            <p className="text-2xl font-bold text-gray-900">{loading ? '-' : pastCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <Link to="/appointments" className="text-sm text-primary font-medium hover:text-secondary">View all</Link>
        </div>
        
        {loading ? (
           <div className="p-12 flex justify-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
           </div>
        ) : recentAppointments.length === 0 ? (
          <div className="p-6 text-center text-gray-500 py-12">
            <p>No recent activity found. Book an appointment to get started.</p>
            <Link to="/doctors" className="inline-block mt-4 btn-primary">Find a Doctor</Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentAppointments.map((apt) => (
              <li key={apt._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Dr. {apt.doctor?.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {apt.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {apt.time}
                      </div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize 
                    ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      apt.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      apt.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'}`}>
                    {apt.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
