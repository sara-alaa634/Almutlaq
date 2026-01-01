import React, { useEffect } from 'react';
import Header from '../Components/Layout/Header';
// import Footer from '../Components/Layout/Footer';
import { useTranslation } from 'react-i18next';
import Sidebar from '../Components/Layout/Sidebar';
import "../Services/i18n"
const Layout = ({ children }) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Update document title based on language
  useEffect(() => {
    document.title = t('app_name');
  }, [i18n.language, t]);
  return (
    <div className="mw-100 min-vh-100">
      <div className="container-fluid" dir={isRTL ? "rtl" : "ltr"}>
        <div className="row h-100">
          {/* Sidebar stays on the left */}
          <aside className={`col-0 col-lg-3 col-xl-2 p-0 bg-light d-flex flex-column min-vh-100 sidebar-wrapper`} >
            <Sidebar />
          </aside>

          {/* Main content area */}
          <main className={`col-12 col-lg-9 col-xl-10 d-flex flex-column h-100 px-sm-3 px-0`}>
            <Header />
            <div className="flex-grow-1 mt-4">
              {children}
            </div>
            {/* <Footer /> */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
