// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const withAuth = (WrappedComponent: any) => {
//   return (props: any) => {
//     const [isMounted, setIsMounted] = useState(false);
//     const pathname = usePathname(); // Use the appropriate router method for app directory

//     useEffect(() => {
//       setIsMounted(true); // Ensure component is mounted before continuing
//     }, []);

//     useEffect(() => {
//       if (isMounted) {
//         const isAuthenticated = localStorage.getItem('token');
//         if (!isAuthenticated) {
//           window.location.href = '/auth/login'; // Use window to handle navigation manually
//         }
//       }
//     }, [isMounted, pathname]);

//     if (!isMounted) {
//       return null; // Prevent rendering until mounted
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;


import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname(); // Use the appropriate router method for app directory

    useEffect(() => {
      setIsMounted(true); // Ensure component is mounted before continuing
    }, []);

    useEffect(() => {
      if (isMounted) {
        const isAuthenticated = localStorage.getItem('token');
        if (!isAuthenticated) {
          window.location.href = '/auth/login'; // Use window to handle navigation manually
        }
      }
    }, [isMounted, pathname]);

    if (!isMounted) {
      return null; // Prevent rendering until mounted
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
