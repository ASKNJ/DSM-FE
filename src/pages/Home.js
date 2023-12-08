import PropTypes from 'prop-types';
import classes from '../css/AppDesign.module.css';
import KpiBoxes from '../components/KpiBoxes';
import AirIcon from '../assets/icons/AirIcon';
import LandIcon from '../assets/icons/LandIcon';
import HumanIcon from '../assets/icons/HumanIcon';
import WaterIcon from '../assets/icons/WaterIcon';
import Dropdown from '../components/Dropdown';
import ImpactList from '../components/ImpactList';
import { useContext, useState } from 'react';
import { MasterDataContext } from '../context/master-context';
import Loader from '../components/Loader';

const HomePage = (props) => {
    const ctx = useContext(MasterDataContext);
    const [impactsData, setImpactsData] = useState([]);
    const [loader, setLoader] = useState(false);
    const impactTypes = ctx.masterData.impactTypes;
    const categories = ctx.masterData.categories;
    const iconToImpactType = [
        {
            icon: <AirIcon width={50} height={50} />,
            impactType: 'air'
        },
        {
            icon: <LandIcon width={50} height={50} />,
            impactType: 'land'
        },
        {
            icon: <HumanIcon width={50} height={50} />,
            impactType: 'human'
        },
        {
            icon: <WaterIcon width={50} height={50} />,
            impactType: 'water'
        }
    ];

    const iconToImpactTypeKpi = [
        {
            icon: <AirIcon width={50} height={50} isKpi={true} />,
            impactType: 'air'
        },
        {
            icon: <LandIcon width={50} height={50} isKpi={true} />,
            impactType: 'land'
        },
        {
            icon: <HumanIcon width={50} height={50} isKpi={true} />,
            impactType: 'human'
        },
        {
            icon: <WaterIcon width={50} height={50} isKpi={true} />,
            impactType: 'water'
        }
    ]


    const getCategoryDataHandler = (categoryData) => {
        if (!categoryData) {
            setLoader(true);
        }
        else {
            setLoader(false);
            setImpactsData(categoryData);
        }
    }

    return (
        <>
            <header className={classes.content}>
                <div className={classes.card}>
                    <div className={classes.path}>
                        <p className={classes.headText}>Home</p>
                        &nbsp;
                        <p>/</p>
                        &nbsp;
                        <p className={classes.headText}>My Feeds</p>
                        &nbsp;
                        <p>/</p>
                        &nbsp;
                        <p className={classes.headText}>Boilers Feed</p>
                        &nbsp;
                        <p>/</p>
                        &nbsp;
                        <p className={classes.headText}>FootPrint</p>
                    </div>
                    <div className={classes.container}>
                        <span className={classes.pText}>Boilers Feed footprint</span>
                        <p style={{ marginTop: 10 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed nunc nibh. Nulla cursus neque sed ex suscipit, at porta elit molestie. In sit amet vulputate arcu.
                        </p>
                        <div style={{
                            display: "flex", flex: 1, flexDirection: "row",
                            flexBasis: "25%",
                            flexWrap: "wrap",
                            paddingTop: 20,
                            paddingBottom: 20
                        }}>
                            {impactTypes.map((data, idx) => {
                                return (<KpiBoxes
                                    key={data.id}
                                    color={data.color}
                                    fpName={data.type}
                                    icon={iconToImpactTypeKpi.filter((icons, idx) => icons.impactType === data.type)[0]?.icon}
                                    kpiNumber={data.kpiValue}
                                    purpose={data.purpose}
                                    unit={data.unit}
                                />)
                            })}
                        </div>
                        <p style={{ marginBottom: 10 }} className={classes.pText}>Detailed footprint</p>
                        <span>
                            This text should explain what the footprint is and how it is calculated. Click on a category below to see more details.
                        </span>
                        <Dropdown defaultOption={"Select category"} header={"Show impact from"} options={categories} getCategoryData={getCategoryDataHandler} />
                        {!loader ? <ImpactList data={impactsData} iconOption={iconToImpactType} impactTypes={impactTypes} /> :
                            <Loader />}
                    </div>
                </div>
            </header>
        </>
    );
};

HomePage.propTypes = {
    theme: PropTypes.string
}

export default HomePage;