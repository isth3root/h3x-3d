import React, { useState } from "react";
import { X, Phone } from "lucide-react";
import { saveUser } from "../utils/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      saveUser(phone);
      setIsLoading(false);
      onLogin();
      onClose();
      setPhone("");
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Required
          </h2>
          <p className="text-gray-600">Enter your phone number to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !phone.trim()}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          We'll send you a verification code to confirm your number
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
