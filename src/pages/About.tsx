import React from "react";
import { useGSAP, useStaggerAnimation } from "../hooks/useGSAP";
import { Award, Zap, Heart, Target, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const heroRef = useGSAP<HTMLDivElement>();
  const statsRef = useStaggerAnimation<HTMLDivElement>(".stat-card", 0.2);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('about.desc')}
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                5000+
              </div>
              <div className="text-gray-600">Products Printed</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                1200+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                50+
              </div>
              <div className="text-gray-600">Materials Available</div>
            </div>
            <div className="stat-card text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                99%
              </div>
              <div className="text-gray-600">Quality Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              {t('about.mission')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('about.innovation')}
                </h3>
                <p className="text-gray-600">
                  {t('about.innovation_desc')}
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('about.quality')}
                </h3>
                <p className="text-gray-600">
                  {t('about.quality_desc')}
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('about.customer_focus')}
                </h3>
                <p className="text-gray-600">
                  {t('about.customer_focus_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {t('about.story')}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                {t('about.story_desc1')}
              </p>
              <p className="mb-6">
                {t('about.story_desc2')}
              </p>
              <p>
                {t('about.story_desc3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t('about.team')}
          </h2>
          <div className="grid grid-cols-1 max-w-4xl mx-auto">
            <div className="team-member text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('about.team_member_name')}
              </h3>
              <p className="text-primary-600 mb-2">Fullstack Developer</p>
              <p className="text-gray-600 text-sm">
                {t('about.team_member_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {t('about.technology')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('about.advanced_printers')}
                </h3>
                <p className="text-gray-600">
                  {t('about.advanced_printers_desc')}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('about.global_reach')}
                </h3>
                <p className="text-gray-600">
                  {t('about.global_reach_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
