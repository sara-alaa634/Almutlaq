import React from "react";
import ClientsAndUsers from './ClientsAndUsers'
import CasesStatistics from './CasesStatistics'
import CommunityStatistics from './CommunityStatistics'
const HomeMainWrapper = ({statistics}) => {

  return (
    <div>
        <ClientsAndUsers statistics={statistics}/> 
        <CasesStatistics statistics={statistics}/> 
        <CommunityStatistics statistics={statistics}/> 
    </div>
  );
};

export default HomeMainWrapper;
