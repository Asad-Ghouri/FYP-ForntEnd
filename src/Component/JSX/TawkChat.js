import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    // Create Tawk_API if it doesn't exist
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Create and load the script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/677d8304af5bfec1dbe809a7/1ih14fj19';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the document
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Remove Tawk_API from window
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything
};

export default TawkChat;
