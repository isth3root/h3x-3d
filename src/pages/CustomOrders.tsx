import React from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Package, Clock, Users, Award, Mail, Phone } from "lucide-react";

const CustomOrders: React.FC = () => {
  const ref = useGSAP();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div ref={ref} className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Custom 3D Printing Orders
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bring your unique ideas to life with our professional custom 3D
            printing services. From prototypes to personalized products, we make
            it happen.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Package className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Any Design
            </h3>
            <p className="text-gray-600">
              Upload your files or work with our designers
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Fast Turnaround
            </h3>
            <p className="text-gray-600">
              Most orders completed within 3-7 business days
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Expert Support
            </h3>
            <p className="text-gray-600">
              Dedicated team to help with your project
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Quality Guarantee
            </h3>
            <p className="text-gray-600">
              100% satisfaction or we'll make it right
            </p>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Submit Your Design
              </h3>
              <p className="text-gray-600">
                Upload your 3D files or describe your project requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Get Quote & Approve
              </h3>
              <p className="text-gray-600">
                Receive detailed quote and timeline for your project
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Receive Your Product
              </h3>
              <p className="text-gray-600">
                We print, finish, and ship your custom creation
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Start Your Custom Order
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Files (Optional)
                  </label>
                  <input
                    type="file"
                    multiple
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  Submit Custom Order Request
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">
                      custom@3dprintstore.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Supported File Formats
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>• STL</span>
                  <span>• OBJ</span>
                  <span>• 3MF</span>
                  <span>• PLY</span>
                  <span>• STEP</span>
                  <span>• IGES</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Available Materials
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>• PLA</span>
                  <span>• ABS</span>
                  <span>• PETG</span>
                  <span>• TPU</span>
                  <span>• Wood PLA</span>
                  <span>• Metal PLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrders;
