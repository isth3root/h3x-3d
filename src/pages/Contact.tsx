import React from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const ref = useGSAP<HTMLDivElement>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="min-h-screen bg-gray-50 pt-16" lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div ref={ref} className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Mail className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('contact.email_us')}
              </h3>
              <p className="text-gray-600 mb-2">info@3dprintstore.com</p>
              <p className="text-gray-600">support@3dprintstore.com</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Phone className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('contact.call_us')}
              </h3>
              <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
              <p className="text-gray-600">+1 (555) 123-4568</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <MapPin className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('contact.visit_us')}
              </h3>
              <p className="text-gray-600">123 Innovation Street</p>
              <p className="text-gray-600">Tech City, TC 12345</p>
              <p className="text-gray-600">United States</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('contact.business_hours')}
              </h3>
              <div className="space-y-1 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {t('contact.send_message')}
              </h2>
              <form className="space-y-6" lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.first_name')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder={t('contact.first_name_placeholder', 'John')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.last_name')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder={t('contact.last_name_placeholder', 'Doe')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email_address')}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder={t('contact.email_address_placeholder', 'john@example.com')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.phone_number')}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder={t('contact.phone_number_placeholder', '+1 (555) 123-4567')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.subject')}
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200">
                    <option>{t('contact.general_inquiry')}</option>
                    <option>{t('contact.custom_order')}</option>
                    <option>{t('contact.technical_support')}</option>
                    <option>{t('contact.partnership')}</option>
                    <option>{t('contact.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder={t('contact.message_placeholder', 'Tell us about your project or inquiry...')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t('contact.send')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {t('contact.find_us')}
            </h2>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">{t('contact.map_coming_soon')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
