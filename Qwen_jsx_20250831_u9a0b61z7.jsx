import React, { useState } from "react";

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    kingdomName: '',
    title: 'lord',
    avatar: null,
    primaryColor: '#FFD700',
    secondaryColor: '#8B4513',
    symbol: 'lion',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const colorOptions = [
    { name: 'Gold', value: '#FFD700' },
    { name: 'Crimson', value: '#DC143C' },
    { name: 'Royal Blue', value: '#4169E1' },
    { name: 'Emerald', value: '#50C878' },
    { name: 'Silver', value: '#C0C0C0' },
    { name: 'Purple', value: '#800080' }
  ];

  const avatarOptions = [
    { id: 'noble', emoji: '🤴', name: 'Noble Lord', desc: 'Regal and commanding' },
    { id: 'warrior', emoji: '⚔️', name: 'Warrior King', desc: 'Strong and fearless' },
    { id: 'wise', emoji: '🧙', name: 'Wise Ruler', desc: 'Calm and intelligent' },
    { id: 'queen', emoji: '👸', name: 'Graceful Lady', desc: 'Elegant and kind' },
    { id: 'warrior_queen', emoji: '🛡️', name: 'Warrior Queen', desc: 'Fierce protector' },
    { id: 'mystic', emoji: '🔮', name: 'Mystic Seer', desc: 'Mysterious and wise' }
  ];

  const symbolOptions = [
    { id: 'lion', emoji: '🦁', name: 'Lion' },
    { id: 'eagle', emoji: '🦅', name: 'Eagle' },
    { id: 'dragon', emoji: '🐉', name: 'Dragon' },
    { id: 'crown', emoji: '👑', name: 'Crown' },
    { id: 'sword', emoji: '⚔️', name: 'Sword' },
    { id: 'shield', emoji: '🛡️', name: 'Shield' },
    { id: 'castle', emoji: '🏰', name: 'Castle' },
    { id: 'griffin', emoji: '🦁鹫', name: 'Griffin' }
  ];

  const validateStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.kingdomName.trim()) {
          newErrors.kingdomName = 'Kingdom name is required';
        }
        break;
      case 2:
        if (!formData.avatar) {
          newErrors.avatar = 'Please select an avatar';
        }
        break;
      case 3:
        if (!formData.email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      kingdomName: '',
      title: 'lord',
      avatar: null,
      primaryColor: '#FFD700',
      secondaryColor: '#8B4513',
      symbol: 'lion',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/old-wall.png')",
        }}
      />
      
      {/* Animated castle construction */}
      <div className="fixed top-10 left-10 opacity-20 animate-pulse">
        <div className="text-6xl">🏰</div>
      </div>
      <div className="fixed top-20 right-20 opacity-20 animate-bounce">
        <div className="text-5xl">🏰</div>
      </div>
      <div className="fixed bottom-20 left-20 opacity-20 animate-pulse">
        <div className="text-7xl">🏰</div>
      </div>

      {/* Crown sparkle animation */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2">
        <div className="text-4xl animate-pulse">👑</div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4 drop-shadow-lg">
            🏰 Medieval Kingdom Builder
          </h1>
          <p className="text-xl text-amber-800 font-serif italic">
            Register and build your royal legacy
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-amber-200 text-amber-800'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 bg-amber-400 mx-2 transition-all duration-300 ${
                    currentStep > step ? 'opacity-100' : 'opacity-30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {!isSuccess ? (
            <>
              {currentStep === 1 && (
                <div className="bg-amber-50 bg-opacity-90 backdrop-blur-sm border-4 border-amber-200 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">Found Your Kingdom</h2>
                    <div className="text-6xl mb-4">🏰</div>
                    <p className="text-amber-800 text-lg">Choose a majestic name for your realm</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-amber-900 font-bold mb-3 text-lg">Kingdom Name *</label>
                      <input
                        type="text"
                        value={formData.kingdomName}
                        onChange={(e) => handleChange('kingdomName', e.target.value)}
                        placeholder="Enter your kingdom's name..."
                        className={`w-full px-6 py-4 text-lg border-4 rounded-xl bg-white focus:outline-none shadow-lg ${
                          errors.kingdomName 
                            ? 'border-red-500' 
                            : 'border-amber-300 focus:border-amber-600'
                        }`}
                      />
                      {errors.kingdomName && (
                        <p className="text-red-500 text-sm mt-1">{errors.kingdomName}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="text-amber-900 font-bold text-lg">Title:</label>
                      <button
                        onClick={() => handleChange('title', 'lord')}
                        className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                          formData.title === 'lord'
                            ? "bg-blue-600 text-white shadow-lg transform scale-105"
                            : "bg-amber-200 text-amber-900 hover:bg-amber-300"
                        }`}
                      >
                        Lord
                      </button>
                      <button
                        onClick={() => handleChange('title', 'lady')}
                        className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                          formData.title === 'lady'
                            ? "bg-pink-600 text-white shadow-lg transform scale-105"
                            : "bg-amber-200 text-amber-900 hover:bg-amber-300"
                        }`}
                      >
                        Lady
                      </button>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Next: Choose Your Avatar →
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-amber-50 bg-opacity-90 backdrop-blur-sm border-4 border-amber-200 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">Choose Your Royal Avatar</h2>
                    <div className="text-6xl mb-4">👑</div>
                    <p className="text-amber-800 text-lg">Select how your subjects will see you</p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {avatarOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleChange('avatar', option)}
                        className={`p-6 rounded-xl border-4 transition-all duration-300 text-center ${
                          formData.avatar?.id === option.id
                            ? "border-amber-900 bg-amber-100 scale-105 shadow-lg"
                            : "border-amber-300 hover:border-amber-500 hover:bg-amber-50"
                        }`}
                      >
                        <div className="text-6xl mb-3">{option.emoji}</div>
                        <h3 className="text-xl font-bold text-amber-900 mb-2">{option.name}</h3>
                        <p className="text-amber-800 text-sm">{option.desc}</p>
                      </button>
                    ))}
                  </div>

                  {errors.avatar && (
                    <p className="text-red-500 text-center mb-6">{errors.avatar}</p>
                  )}

                  <div className="flex justify-between">
                    <button
                      onClick={handleBack}
                      className="px-6 py-3 bg-amber-200 text-amber-900 font-bold rounded-xl hover:bg-amber-300 transition-all duration-300 shadow"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Next: Account Details →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-amber-50 bg-opacity-90 backdrop-blur-sm border-4 border-amber-200 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-amber-900 mb-4">Create Your Royal Account</h2>
                    <div className="text-6xl mb-4">🔐</div>
                    <p className="text-amber-800 text-lg">Secure your kingdom's records</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-amber-900 font-bold mb-3 text-lg">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Enter your email address..."
                        className={`w-full px-6 py-4 text-lg border-4 rounded-xl bg-white focus:outline-none shadow-lg ${
                          errors.email 
                            ? 'border-red-500' 
                            : 'border-amber-300 focus:border-amber-600'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-amber-900 font-bold mb-3 text-lg">Password *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Create a strong password..."
                        className={`w-full px-6 py-4 text-lg border-4 rounded-xl bg-white focus:outline-none shadow-lg ${
                          errors.password 
                            ? 'border-red-500' 
                            : 'border-amber-300 focus:border-amber-600'
                        }`}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-amber-900 font-bold mb-3 text-lg">Confirm Password *</label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password..."
                        className={`w-full px-6 py-4 text-lg border-4 rounded-xl bg-white focus:outline-none shadow-lg ${
                          errors.confirmPassword 
                            ? 'border-red-500' 
                            : 'border-amber-300 focus:border-amber-600'
                        }`}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>

                    <div className="bg-amber-100 border-2 border-amber-300 rounded-xl p-4">
                      <p className="text-amber-800 text-sm">
                        🔐 Your password should be at least 6 characters long and contain a mix of letters and numbers for maximum security.
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-amber-200 text-amber-900 font-bold rounded-xl hover:bg-amber-300 transition-all duration-300 shadow"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Creating Your Kingdom...
                          </div>
                        ) : (
                          'Claim Your Throne! 👑'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-2xl p-8 shadow-2xl border-4 border-amber-400">
              <div className="text-center">
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome, {formData.title === 'lord' ? 'Lord' : 'Lady'}!</h2>
                <h3 className="text-3xl font-bold mb-6 drop-shadow">{formData.kingdomName}</h3>
                
                <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 backdrop-blur-sm">
                  <p className="text-xl mb-4">Your royal avatar:</p>
                  <div className="text-8xl mb-4">{formData.avatar?.emoji}</div>
                  <p className="text-lg">{formData.avatar?.name}</p>
                </div>

                <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 backdrop-blur-sm">
                  <p className="text-xl mb-4">Account successfully created!</p>
                  <p className="text-lg">Your kingdom is now registered in the royal archives.</p>
                </div>

                <div className="space-y-4">
                  <p className="text-lg">You will receive a confirmation email shortly.</p>
                  <p className="text-lg">May your reign be long and prosperous!</p>
                </div>

                <button
                  onClick={resetForm}
                  className="mt-8 px-8 py-4 bg-white text-amber-800 font-bold text-lg rounded-xl hover:bg-amber-100 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Create Another Kingdom
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-amber-800 text-sm">
          <p>© {new Date().getFullYear()} Medieval Kingdom Builder | All rights reserved</p>
          <p className="text-xs mt-1">By registering, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default App;