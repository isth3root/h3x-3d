import React from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Package, Clock, Users, Award, Mail, Phone } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CustomOrders: React.FC = () => {
  const ref = useGSAP<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div ref={ref} className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t('custom.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('custom.desc')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Package className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('custom.any_design')}
            </h3>
            <p className="text-gray-600">
              {t('custom.any_design_desc')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('custom.fast_turnaround')}
            </h3>
            <p className="text-gray-600">
              {t('custom.fast_turnaround_desc')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('custom.expert_support')}
            </h3>
            <p className="text-gray-600">
              {t('custom.expert_support_desc')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {t('custom.quality_guarantee')}
            </h3>
            <p className="text-gray-600">
              {t('custom.quality_guarantee_desc')}
            </p>
          </div>
        </div>

        {/* Process */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t('custom.how_it_works')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('custom.submit_your_design')}
              </h3>
              <p className="text-gray-600">
                {t('custom.submit_your_design_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('custom.get_quote_approve')}
              </h3>
              <p className="text-gray-600">
                {t('custom.get_quote_approve_desc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('custom.receive_your_product')}
              </h3>
              <p className="text-gray-600">
                {t('custom.receive_your_product_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t('custom.start_your_custom_order')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('custom.project_name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('custom.your_email')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('custom.project_description')}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('custom.upload_files')}
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
                  {t('custom.submit_custom_order_request')}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('custom.contact_information')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary-600 mr-3" />
                    <span className="text-gray-700">
                      {t('custom.email')}
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
                  {t('custom.supported_file_formats')}
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
                  {t('custom.available_materials')}
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
