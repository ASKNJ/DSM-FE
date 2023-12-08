import PropTypes from 'prop-types';
import InfoIcon from '../assets/icons/InfoIcon';
import './css/Overlay.css';
import PieChart from './PieChart';
import SmallProgressBar from './SmallProgressBar';

const Overlay = (props) => {
    const { percentages, title, contributionTypes, dim, contribData, categoryId } = props;
    console.log("contribData: ",contribData);

    return (
        <div className='overlay-container'>
            <div style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center", marginRight: 10 }}>
                <span style={{ display: "flex", }}>{title}</span>
                <InfoIcon width={30} height={30} />
            </div>
            <div style={{ display: "flex" }}>
                <span className='text-bold-huge'>
                    {dim}
                </span>
            </div>
            <div style={{ display: "flex" }}>
                <span className='text-bold'>
                    Contribution per category
                </span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", flex: 1, justifyContent: "center", paddingTop: 10 }}>
                <PieChart stats={percentages} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span className='text-bold'>
                    Detailed contribution
                </span>
                {contributionTypes.map((data, idx) => {
                    const contrib = contribData?.filter((d, i) => 
                    Number(d.contrib_id_type.split('#')[0]) === categoryId &&
                    Number(d.contrib_id_type.split('#')[1]) === data.contribId);
                    return <div key={idx} className='x-axis-container'>
                        <div style={{ minWidth: "50%", maxWidth: "50%" }} className='x-axis-text'>{data.contribType}</div>
                        <SmallProgressBar value={contrib?.length > 0 ? contrib[0]?.contrib_value : 0} color={'#0070BA'} />
                    </div>
                })}
            </div>

        </div>
    )
}

Overlay.propTypes = {
    percentages: PropTypes.object,
    title: PropTypes.string,
    contributionTypes: PropTypes.any,
    dim: PropTypes.string, //dimensions
    contribData: PropTypes.array,
    categoryId: PropTypes.number
}
export default Overlay;