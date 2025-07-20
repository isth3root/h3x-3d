import React from "react";
import { useGSAP, useStaggerAnimation } from "../hooks/useGSAP";
import { Award, Zap, Heart, Target, Globe } from "lucide-react";

const About: React.FC = () => {
  const heroRef = useGSAP();
  const statsRef = useStaggerAnimation(".stat-card", 0.2);
  const teamRef = useStaggerAnimation(".team-member", 0.15);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About 3D Print Store
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're passionate about bringing innovation to life through
              precision 3D printing. Since our founding, we've been dedicated to
              creating high-quality, custom products that exceed expectations
              and push the boundaries of what's possible.
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
              Our Mission & Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  Constantly pushing the boundaries of 3D printing technology to
                  deliver cutting-edge solutions.
                </p>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Quality
                </h3>
                <p className="text-gray-600">
                  Uncompromising commitment to excellence in every product we
                  create and service we provide.
                </p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Customer Focus
                </h3>
                <p className="text-gray-600">
                  Your success is our success. We're dedicated to exceeding your
                  expectations every time.
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
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                Founded in 2020 by a team of engineers and designers passionate
                about 3D printing technology, 3D Print Store began as a small
                workshop with a big vision: to make high-quality 3D printing
                accessible to everyone.
              </p>
              <p className="mb-6">
                What started as a hobby project quickly grew into a full-service
                3D printing company. We've invested in state-of-the-art
                equipment and developed partnerships with leading material
                suppliers to ensure we can handle projects of any size and
                complexity.
              </p>
              <p>
                Today, we're proud to serve customers worldwide, from individual
                hobbyists to Fortune 500 companies. Our commitment to quality,
                innovation, and customer service remains at the heart of
                everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Meet Our Team
          </h2>
          <div
            ref={teamRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="team-member text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Sarah Johnson
              </h3>
              <p className="text-primary-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Mechanical Engineer with 10+ years in additive manufacturing
              </p>
            </div>
            <div className="team-member text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Mike Chen
              </h3>
              <p className="text-primary-600 mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Expert in production optimization and quality control
              </p>
            </div>
            <div className="team-member text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Emily Rodriguez
              </h3>
              <p className="text-primary-600 mb-2">Lead Designer</p>
              <p className="text-gray-600 text-sm">
                Industrial designer specializing in product development
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
              Our Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Zap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Advanced Printers
                </h3>
                <p className="text-gray-600">
                  State-of-the-art FDM, SLA, and SLS printers for any project
                  requirement
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Global Reach
                </h3>
                <p className="text-gray-600">
                  Worldwide shipping with tracking and insurance for peace of
                  mind
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
