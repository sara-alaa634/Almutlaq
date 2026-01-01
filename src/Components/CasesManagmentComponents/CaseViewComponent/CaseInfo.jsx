import React from 'react'
import { useTranslation } from 'react-i18next';

const caseView= {
    id: 1,
    caseTitle: "رفع قضية خلع علي احمد محمد",
    caseStatus: "ongoing",
    caseDescription: "قضية الخلع هي دعوى قضائية تُرفع من قبل الزوجة، تهدف إلى إنهاء العلاقة الزوجية بينها وبين زوجها أحمد محمد. تتضمن الدعوى طلب الزوجة للطلاق مقابل التنازل عن حقوقها المالية، ويتم النظر فيها في المحكمة الشرعية المختصة.",

}
const CaseInfo = () => {
    const { t } = useTranslation();
    return (
        <div className="card">
            <div className="card-body">
                
            </div>
        </div>
    )
}

export default CaseInfo