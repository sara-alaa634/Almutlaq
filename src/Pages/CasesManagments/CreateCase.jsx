import React from 'react'
import { useTranslation } from 'react-i18next';
import Layout from '../../Layout/Layout';
import BreadCrumb from '../../Components/SharedComponents/BreadCrumb';
import CaseForm from '../../Components/CasesManagmentComponents/CasesComponents/CaseForm'
const CreateCase = () => {

    const { t } = useTranslation();
    return (
        <Layout>
            <div className="container">
            <BreadCrumb header={t('create_case')} icon="TbFileDollar" listItem1={t("Case_Management")} listItem2={t("create_case")} />
            <CaseForm/>
            </div>
        </Layout>
    )
}

export default CreateCase