import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Calendar, Clock, MapPin, Star, Shield, Loader2 } from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/doctors/${id}`);
        setDoctor(data);
      } catch (error) {
        toast.error('Failed to fetch doctor details');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please login to book an appointment');
      navigate('/login');
      return;
    }

    if (!date || !time) {
      toast.error('Please select date and time');
      return;
    }

    setBooking(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post(`${import.meta.env.VITE_API_URL || ''}/api/appointments/book`, {
        doctorId: id,
        date,
        time
      }, config);
      
      toast.success('Appointment booked successfully!');
      navigate('/appointments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!doctor) return <div className="text-center py-20 text-gray-500">Doctor not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Doctor Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-primary font-medium mb-4">{doctor.specialty}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{doctor.bio}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{doctor.experience} Years Exp.</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>Medical Center, NY</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span>4.8 Rating</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book Appointment</h3>
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
              <span className="text-gray-600">Consultation Fee</span>
              <span className="text-2xl font-bold text-primary">${doctor.feesPerConsultation}</span>
            </div>
            
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field pl-10"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    className="input-field pl-10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Choose a slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={booking}
                className="w-full btn-primary flex justify-center items-center mt-6"
              >
                {booking ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;
