import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../Layout/Layout";
import BreadCrumb from "../Components/SharedComponents/BreadCrumb";
import ChatMainComponent from '../Components/Chat/ChatMainComponent'
const Chat = () => {
  const { t } = useTranslation();
  const { reciverId } = useParams();
  const navigate = useNavigate();
  // handle the normal case of getting the page from sidebar
  const handleInvalidUser = () => {
    navigate('/chat');
};
  return (
    <Layout>
      <div className="container">
        <BreadCrumb
          icon="TbBrandHipchat"
          listItem1={t("Messages_and_chats")}
          arrow={false}
        />
       <div>
        <ChatMainComponent 
         initialUserId={reciverId} 
         onInvalidUser={handleInvalidUser}/>
       </div>
      </div>
    </Layout>
  );
};

export default Chat;
