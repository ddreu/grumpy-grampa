// components/ContactForm.js
"use client";

import { MapPin, Mail, Phone } from "lucide-react"; // <-- import icons

export default function ContactForm() {
  return (
    <div className="max-w-7xl mx-5 md:mx-auto p-12 md:p-22 bg-gray-50 border border-gray-300 rounded-xl shadow-md mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 sm:gap-y-0">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-500 text-lg mb-8">
            Talk to us before we start complaining about the weather.
          </p>

          <div className="space-y-5 ml-4">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-13 h-13 bg-neutral-200 text-neutral-950 rounded-full">
                <MapPin size={26} />
              </div>
              <div>
                <p className="font-semibold text-md mb-1">Address</p>
                <p className="text-gray-500 text-sm">
                  795 Timbercrest Road, Alaska - 99743
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-13 h-13 bg-neutral-200 text-neutral-950 rounded-full">
                <Mail size={26} />
              </div>
              <div>
                <p className="font-semibold text-md mb-1">Email</p>
                <p className="text-gray-500 text-sm">neytri@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-13 h-13 bg-neutral-200 text-neutral-950 rounded-full">
                <Phone size={26} />
              </div>
              <div>
                <p className="font-semibold text-md mb-1">Phone</p>
                <p className="text-gray-500 text-sm">+123 64 733</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black w-full"
          />
          <textarea
            placeholder="Comment"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black w-full h-32 resize-none"
          ></textarea>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="save" className="w-4 h-4" />
            <label htmlFor="save" className="text-gray-500 text-sm">
              Save my name and email to this browser
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-2xl hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
