import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { TbFileDollar } from "react-icons/tb";
import { LuFileCheck } from "react-icons/lu";
import { FiFileMinus } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { TbFileLike } from "react-icons/tb";
import { TbBrandHipchat } from "react-icons/tb";



const StatisticCard = ({color,backgroundColor,name,value,icon,className,href="#"}) => {
    return (
        <div className={`statistic-card-wrapper p-4 l-d-bg rounded ${className}`} >
            <a className="d-flex justify-content-between align-items-center" href={href}>
                <div className='statistic-card-content'>
                    <div className='fw-bold fs-5'>{value}</div>
                    <div className='text-capitalize statistic-card-header'>{name}</div>
                </div>
                <div className='statistic-card-icon d-flex justify-content-center align-items-center fs-5 fw-medium ms-2'
                    style={{ backgroundColor: backgroundColor, color:color }}>{
                        icon==="FaCheck"?<FaCheck/>:
                        icon==="MdClose"?<MdClose/>:
                        icon==="TbFileDollar"?<TbFileDollar/>:
                        icon==="FiFileMinus"?<FiFileMinus/>:
                        icon==="LuFileCheck"?<LuFileCheck/>:
                        icon==="FiUserCheck"?<FiUserCheck/>:
                        icon==="TbBrandHipchat"?<TbBrandHipchat/>:
                        icon==="TbFileLike"?<TbFileLike/>:""



                    }</div>
            </a>

        </div>
    )
}

export default StatisticCard