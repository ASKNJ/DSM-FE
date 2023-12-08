import PropTypes from 'prop-types';
import classes from '../css/ComponentDesign.module.css';

const KpiBoxes = (props) => {
    const { color, fpName, icon, kpiNumber, purpose, unit } = props;

    return (
        <div style={{ backgroundColor: color }} className={classes.footprintBox}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10 }}>
                <span style={{ color: "white", paddingTop: 10, fontSize: 14, fontWeight: "bold" }}>{fpName.toUpperCase()}</span>
                <p>{icon}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", paddingRight: 30 }}>
                <span style={{
                    color: "white", fontSize: 30,
                    fontWeight: "bolder", marginTop: 15
                }}>
                    {kpiNumber}
                </span>
                <span style={{ paddingTop: 5, color: "white", fontSize: 12 }}>{purpose}</span>
                <span style={{ paddingTop: 5, color: "white", fontSize: 12 }}>{unit}</span>
            </div>
        </div>
    );
};

KpiBoxes.propTypes = {
    color: PropTypes.string,
    fpName: PropTypes.string,
    icon: PropTypes.any,
    kpiNumber: PropTypes.number,
    purpose: PropTypes.string,
    unit: PropTypes.string
}

export default KpiBoxes;