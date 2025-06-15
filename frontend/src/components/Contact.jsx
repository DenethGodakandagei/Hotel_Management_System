import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import api from "../services/api";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
     // const response = await axios.post("http://localhost:5000/api/send-email",
       const response = await api.post("/send-email", 
        {
        from: email,
        to: "contact.deneth@gmail.com", // Replace with actual email
        subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send email. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="container my-24 mx-auto md:px-6 pt-16" id="contact">
      <h1 className="text-3xl lg:text-4xl text-primary1 font-extrabold text-center p-6">
        Explore our current promotions and exclusive deals to make the most of
        your stay with us.
      </h1>

      <section className="mb-32 text-center">
        <div className="py-12 md:px-12">
          <div className="mx-auto xl:px-32">
            <div className="grid items-center lg:grid-cols-2">
              <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-2 py-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-gray-60 dark:shadow-black/20 md:px-12 lg:-mr-14 m-6">
                  <h2 className="mb-12 text-3xl font-bold text-primary1">Contact us</h2>
                  <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-1 mb-1">
                      <div className="w-full px-1">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          E-mail
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Subject
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Message
                        </label>
                        <textarea
                          className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-18 resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/3">
                        <button
                          className="shadow bg-primary1 hover:bg-primary1 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Send
                        </button>
                      </div>
                      <div className="md:w-2/3"></div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="md:mb-12 lg:mb-0 m-5">
                <div className="relative h-[400px] sm:h-[600px] rounded-lg shadow-lg dark:shadow-black/20">
                  <iframe
                    src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="absolute left-0 top-0 h-full w-full rounded-lg sm:w-30"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
