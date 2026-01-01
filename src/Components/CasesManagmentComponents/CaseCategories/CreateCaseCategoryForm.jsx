import { useState, useEffect } from 'react';
import "../../../Assets/Css/CasesManagment.css"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import Button from "../../SharedComponents/Buttons/Button"
import UploadFeildCreate from '../../SharedComponents/Uploads/UploadInput/UploadFeildCreate'
import { useCasesCategories } from '../../../Hooks/useCasesCategories'
import {errorMessages} from '../../../helpers/messages'
import { useUser } from "../../../Context/userContext";

const CreateCaseCategoryForm = () => {
    const [validated, setValidated] = useState(false);
    const [caseCategoryName, setCaseCategoryName] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState(null);
    const [error, setError] = useState("")
    const { t,i18n  } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { addCaseCategories } = useCasesCategories();
  const { userData } = useUser();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || caseCategoryName === "") {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            setError("")
        } else if (uploadedFiles === null) {
            setValidated(true);
            setError(t(errorMessages.requiredFeild))
        } else {
            setValidated(false);
            setError("")
            try {
                // Call API to add case category
             await addCaseCategories(caseCategoryName, uploadedFiles);
                setCaseCategoryName('');
                setUploadedFiles(null);
            } catch (err) {
                // console.error("Error creating case category:", err);
            }
        }


    };
    const handleFileUpload = (fileData) => {
        setUploadedFiles(fileData);
    };
    return (
        <Form className='w-100' noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className=' mw-230px flex-grow-3 text-capitalize create-btn-clr fw-medium wide-img-feild' controlId="validationCustom01">

                    <UploadFeildCreate
                        onUpload={handleFileUpload}
                        allowVideos={false}
                        feildType='wide-input-feild' 
                        setError={setError}
                        setValidated={setValidated}
                        />

                    <div className='text-danger fw-semibold'>
                        {error}
                    </div>
                </Form.Group>
                <Form.Group as={Col} className='my-3  text-capitalize create-btn-clr fw-medium ' md="12" controlId="validationCustom01">
                    <Form.Label className={`w-100 ${isRTL?"text-end":"text-start"}`}>{t('category_name')}</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        className={`h-48 text-color2 fw-semibold ${isRTL?"text-end":"text-start"}`}
                        placeholder={t('write')}
                        value={caseCategoryName}
                        onChange={(e) => setCaseCategoryName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {t('please_choose_valid_case_name')}
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Button customClass="btn-h48-s15 btn-lg px-3" value={t('save')} icon="LuArrowRight" buttonType="submit" type="button" typeAttribute="submit" />
        </Form>
    )
}

export default CreateCaseCategoryForm