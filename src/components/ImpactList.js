import { useContext, useEffect, useState } from "react";
import Overlay from "./Overlay";
import ProgressBar from "./ProgressBar";
import { MasterDataContext } from "../context/master-context";
import { getDataPerImpact } from "../apiBundle/api";


const ImpactList = (props) => {
    const { data, iconOption, impactTypes } = props;
    const [activeImpact, setActiveImpact] = useState(null);
    const [segments, setSegments] = useState({ segment: {}, otherSegment: [] });
    const ctx = useContext(MasterDataContext);
    const accesstoken = ctx.masterData.token;
    const contributionTypes = ctx.masterData.contributionTypes;
    const categories = ctx.masterData.categories;

    const clickHandler = (activeImpactId) => {
        if (activeImpactId === activeImpact) {
            setActiveImpact(null);
            setSegments({segment: {}, otherSegment: []});
        }
        else {
            setActiveImpact(activeImpactId);
        }
    };

    useEffect(() => {
        const callGetDataPerImpactApi = async () => {
            try{
            const resData = await getDataPerImpact(Number(activeImpact[0]), accesstoken);
            const [data, other] = resData;
            if (data) {
                let segment = {};
                for (let cat of categories.slice(1, 4)) {
                    const res2 = data.filter((d, i) => cat.catId === Number(d.contrib_id_type.split('#')[0]));
                    if (res2.length > 0) {
                        segment[`${res2[0]?.contrib_value}% ${cat['category']}`] = res2[0]?.contrib_value;
                    }
                    else {
                        segment[`${0}% ${cat['category']}`] = 0;
                    }
                }
                setSegments((state) => { return { ...state, ...{ otherSegment: other, segment: segment } } });

            }
        }
        catch(err){
            console.log("There is an error while calling per impact API: ", err);
            alert("Something went wrong");
        }
        }
        if (activeImpact) {
            callGetDataPerImpactApi();
        }
    }, [activeImpact, accesstoken, categories]);


    return data?.length > 0 ? (data?.map((opt, idx) => {
        const master = impactTypes.filter((data, idx) => data.type.toLowerCase() === opt.impact_type.toLowerCase());
        return <div key={idx}>
            <ProgressBar
                isClicked={activeImpact === ("" + opt.impact_id + opt.category_id)}
                onClick={() => { clickHandler("" + opt.impact_id + opt.category_id) }}
                impactId={"" + opt.impact_id + opt.category_id}
                color={master[0]?.color}
                value={opt.impact_percent}
                title={opt.impact_name}
                text={`${opt.impact_value} ${master[0].unit}`}
                icon={iconOption.filter((d, idx) => opt.impact_type.toLowerCase() === d.impactType.toLowerCase())[0]?.icon} />
            {activeImpact === ("" + opt.impact_id + opt.category_id) &&
                <div style={{ position: "absolute", zIndex: 3, left: 300, marginTop: -80, marginLeft: -120 }}>
                    <Overlay percentages={segments.segment} title={opt.impact_name}
                        contribData={segments.otherSegment}
                        categoryId={opt.category_id}
                        contributionTypes={contributionTypes}
                        dim={`${opt.impact_value} ${master[0].unit}`} />
                </div>}
        </div>
    })) : (
        <div style={{ fontWeight: "bold", color: 'GrayText' }}>
            <p>No impact for this category yet.</p>
        </div>
    )

};

export default ImpactList;