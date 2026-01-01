import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const ChatFilterList = ({ onFilterChange, currentFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState(currentFilter || 'all');
    const { t } = useTranslation();
  

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <ul className="users-categories d-flex align-items-center justify-content-center gap-4 w-100  p-0 my-md-4 my-3 ">
     <li>
     <a 
        className={`user-category cursor-pointer ${selectedFilter === 'all' ? 'active' : ''}`}
        onClick={() => handleFilterClick('all')}
      >
        {t("all")}
      </a>
     </li>
     <li>
     <a 
        className={`user-category cursor-pointer ${selectedFilter === 'client' ? 'active' : ''}`}
        onClick={() => handleFilterClick('client')}
      >
        {t("the_clients")}
      </a>
     </li>

     <li>
     <a 
        className={`user-category cursor-pointer ${selectedFilter === 'user' ? 'active' : ''}`}
        onClick={() => handleFilterClick('user')}
      >
        {t("non_clients")}
      </a>
     </li>
    </ul>
  );
};

export default ChatFilterList;