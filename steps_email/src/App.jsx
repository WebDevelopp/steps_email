import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./App.css";
import Interior1 from "../src/assets/interior1.jpeg";
import Interior2 from "../src/assets/interior2.jpeg";
import Interior3 from "../src/assets/interior3.jpeg";
import Exterior1 from "../src/assets/exterior1.jpeg";
import Exterior2 from "../src/assets/exterior2.jpeg";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    propertyType: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const [language, setLanguage] = useState("en");

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Validate function to check form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?([0-9]{1,3})?([0-9]{10})$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const dataToSend = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      propertyType: formData.propertyType,
    };

    try {
      await axios.post("http://localhost:5001/send-email", dataToSend);
      alert(language === "en" ? "Email sent successfully!" : "تم إرسال البريد الإلكتروني بنجاح!");
      setFormData({
        fullName: "",
        phone: "",
        propertyType: "",
        email: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      alert(language === "en" ? "An error occurred while sending the email." : "حدث خطأ أثناء إرسال البريد الإلكتروني.");
    }
  };

  // Handle validation on keyup
  const handleKeyUp = (e) => {
    handleChange(e);
    validate();
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-black">
          {language === "en" ? "Villas For Rent in Qatar" : "فلل للايجار في قطر"}
        </h1>
        <p className="mt-2 text-lg font-medium text-gray-600">
          {language === "en" ? "- Register Your Interest -" : "- سجل اهتمامك -"}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {language === "en"
            ? "Please provide us with the following details to register interest."
            : "يرجى تقديم التفاصيل التالية لتسجيل اهتمامك."}
        </p>
      </div>

      <form
        className="w-full max-w-lg mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-gray-700 text-center w-full ml-10">
            {language === "en" ? "Contact Form" : "نموذج الاتصال"}
          </h2>

          <select
            className="appearance-none w-32 px-4 py-2 rounded-lg bg-orange-500 text-white text-center hover:bg-orange-600 focus:outline-none cursor-pointer"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleKeyUp} // Trigger validation on keyup
            placeholder={language === "en" ? "Full Name" : "الاسم الكامل"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div className="mb-6">
          <PhoneInput
            international
            defaultCountry="QA"
            value={formData.phone}
            onChange={handlePhoneChange}
            onKeyUp={handleKeyUp} // Trigger validation on keyup for phone
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder={language === "en" ? "Enter phone number" : "ادخل رقم الهاتف"}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <input
            type="text"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleKeyUp} // Trigger validation on keyup
            placeholder={language === "en" ? "Property Type" : "نوع العقار"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleKeyUp} // Trigger validation on keyup
            placeholder={language === "en" ? "Email Address" : "عنوان البريد الإلكتروني"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out"
        >
          {language === "en" ? "Submit" : "إرسال"}
        </button>
      </form>

      <div className="w-full max-w-4xl mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <img src={Interior1} alt="Interior 1" className="w-full h-auto rounded shadow" />
        <img src={Interior2} alt="Interior 2" className="w-full h-auto rounded shadow" />
        <img src={Interior3} alt="Interior 3" className="w-full h-auto rounded shadow" />
        <img src={Exterior1} alt="Exterior 1" className="w-full h-auto rounded shadow" />
        <img src={Exterior2} alt="Exterior 2" className="w-full h-auto rounded shadow" />
      </div>

      <div className="w-full max-w-4xl mt-8 text-gray-600 text-center text-sm">
        <p>
          {language === "en"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            : "نص تجريبي لتوضيح المظهر."}
        </p>
        <p className="mt-4">
          {language === "en"
            ? "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat..."
            : "المزيد من النصوص باللغة العربية."}
        </p>
      </div>
    </div>
  );
}

export default App;
