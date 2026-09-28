import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  // Reusing the existing WhatsApp business number from the project: +91 8377056503
  const phoneNumber = '918377056503';
  const prefilledText = encodeURIComponent('Hi Nexus Devs, I want to discuss a project with you.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Nexus Devs"
      id="floating-whatsapp-btn"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1da851] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/35 hover:shadow-2xl hover:shadow-[#25D366]/60 border border-[#3cf181]/40 transition-all duration-300 ease-out hover:scale-110 active:scale-95 hover:rotate-3 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#06040d] group"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-105"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.13.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.12-.22-.19-.47-.31z" />
      </svg>
    </a>
  );
};
