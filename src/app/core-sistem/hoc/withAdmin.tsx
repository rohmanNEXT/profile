"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const withAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AdminComponent = (props: P) => {
    const router = useRouter();
    const { user } = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      // Check if user exists and has admin role
      if (!user || user.role !== 'admin') {
        // Redirect to home if not admin
        router.replace('/');
      } else {
        setIsAuthorized(true);
      }
    }, [user, router]);

    // Show nothing (or a loader) while checking authorization
    if (!isAuthorized) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
          <div className="font-['Space_Grotesk'] font-black uppercase text-2xl animate-pulse">
            Authenticating Admin...
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AdminComponent.displayName = `withAdmin(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AdminComponent;
};

export default withAdmin;

