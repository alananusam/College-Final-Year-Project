import React, { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (offset, color, amplitude) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let i = 0; i <= canvas.width; i++) {
        const wave1 = Math.sin(i * 0.01 + time + offset) * amplitude;
        const wave2 = Math.sin(i * 0.02 - time * 0.5 + offset) * amplitude * 0.5;
        const y = canvas.height/2 + wave1 + wave2;
        
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Multiple wave layers
      drawWave(0, 'rgba(66, 103, 178, 0.3)', 50);
      drawWave(2, 'rgba(59, 130, 246, 0.2)', 40);
      drawWave(4, 'rgba(99, 102, 241, 0.1)', 30);

      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0" />;
};

const LoginPage = () => {
  useEffect(() => {
    // Load the Google Client Library
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      return script;
    };

    const script = loadGoogleScript();
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = () => {
    // Initialize Google OAuth client
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '262796229480-barh86ehugq8vjos2tk43t6ini00jtha.apps.googleusercontent.com', // Replace with your actual Google Client ID
      scope: 'email profile openid https://www.googleapis.com/auth/photoslibrary.readonly',
      callback: async (response) => {
        if (response.access_token) {
          // Get user info using the access token
          const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }).then(res => res.json());

          // Handle successful login
          console.log('Logged in user:', userInfo);

          // Fetch Google Photos data
          const photosResponse = await fetch('https://photoslibrary.googleapis.com/v1/albums', {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }).then(res => res.json());

          console.log('Google Photos Albums:', photosResponse);

          // You can now store the user info and photos data in your app's state or redirect to another page
        }
      },
    });

    // Request the token
    client.requestAccessToken();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <WaveBackground />
      
      <div className="w-full max-w-md p-4 sm:p-8 space-y-4 sm:space-y-6 bg-white/50 backdrop-blur-lg rounded-xl sm:rounded-3xl shadow-xl relative z-10">
        <div className="space-y-2 sm:space-y-3 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">Welcome</h2>
          <p className="text-xl sm:text-3xl text-gray-500">Sign in</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full h-14 sm:h-20 flex items-center justify-center gap-2 sm:gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-full transition duration-200 hover:shadow-md"
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <div className="text-lg sm:text-2xl">Continue with Google</div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
