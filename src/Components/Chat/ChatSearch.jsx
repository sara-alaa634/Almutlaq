import { useState ,useEffect} from "react";
import Search from "../SharedComponents/Search";
import useDebounce from "../../Hooks/useDebounce";
import { useUser } from "../../Context/userContext";
import { useTranslation } from "react-i18next";

const ChatSearch = ({onSearch }) => {
    const { userData } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 2000);
    const { t } = useTranslation();
  
    useEffect(() => {
        // Only call onSearch when debouncedSearchTerm changes
        onSearch(debouncedSearchTerm || null);
      }, [debouncedSearchTerm]); // Remove onSearch from dependencies
    
      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
  return (
    <div className="d-flex align-items-center flex-shrink-0 p-3 px-md-4 px-3 link-body-emphasis text-decoration-none border-bottomm">
      <div className="d-flex align-items-center justify-content-around gap-4 w-100">
        <div className="d-flex align-items-center">
          <div className=" admin-img position-relative">
            <img
              src={
                userData?.image ||
                process.env.PUBLIC_URL +
                  "/Assets/Images/human-placeholder-square.jpg"
              }
              className="position-relative"
              alt="image"
            />
            <span className={`active-user-crircle active d-none`}></span>
          </div>
        </div>
        <Search
         onSubmit={(e) => {
            e.preventDefault();
            handleSearch(e);
          }}
          onChange={handleSearch}
          value={searchTerm}
          buttonClass="chat-search"
          inputClass="chat-search"
          dir="ltr"
          placeholder="Search for any user"
        />
      </div>
    </div>
  );
};

export default ChatSearch;
