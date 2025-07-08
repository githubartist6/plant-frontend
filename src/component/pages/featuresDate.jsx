import {
    FaShippingFast,
    FaMoneyBillWave,
    FaLock,
    FaHeadset,
} from 'react-icons/fa';
import "../CSS/featuresDate.css";
import WebsiteRunTime from './websiteRunTime';
// import features from "../Api/multipalData.json";
import { useAuth } from "../store/auth";
import Loading from '../Loding/loding';

const iconMap = {
    FaShippingFast: FaShippingFast,
    FaMoneyBillWave: FaMoneyBillWave,
    FaLock: FaLock,
    FaHeadset: FaHeadset,
};

export const FeaturesDate = () => {

    const {
        multipaldata,
        isLoggedIn,
        isLoading
    } = useAuth();
    const featuresData = multipaldata?.message?.[0]?.featuresDate || [];


    if (isLoading || featuresData.length === 0) {
    return <h2 className="loading"><Loading /></h2>;
  }

    return (
        <>
            <div className="date-container">
                {featuresData?.map((item, i) => {
                    const Icon = iconMap[item.icon];
                    return (
                        <div key={i} className="feature-item">
                            {Icon && <Icon className="feature-icon" />}
                            <div className="feature-text">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <WebsiteRunTime />
        </>
    );
};
