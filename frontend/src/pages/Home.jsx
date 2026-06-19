import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Calendar, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 pb-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 mt-32 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
              Find the right doctor, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">right now.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Book appointments with the best doctors in your area. Quick, easy, and hassle-free healthcare access at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/doctors" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
                Find a Doctor <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow text-lg flex items-center justify-center">
                Join as Patient
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why choose Affordmed?</h2>
            <p className="mt-4 text-lg text-gray-600">We make healthcare accessible and straightforward.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Doctors</h3>
              <p className="text-gray-600">Access to highly qualified and experienced medical professionals across various specialties.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
              <p className="text-gray-600">Schedule appointments instantly. No more waiting in long queues or holding on calls.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Records</h3>
              <p className="text-gray-600">Your medical history and appointment details are stored securely with complete privacy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
