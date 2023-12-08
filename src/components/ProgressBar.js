import PropTypes from 'prop-types';
import './css/ProgressBar.css';

const ProgressBar = (props) => {
    const { color, icon, value, title, text, impactId, onClick, isClicked } = props;

    const clickHandler = () => {
        onClick(impactId);
    };
    return (
        <div style={{backgroundColor: isClicked ? '#ADD8E6': '#ffff'}} className="container" onClick={onClick ? clickHandler : () => { }}>
            {icon && <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>{icon}</p>
            </div>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                {title && <span style={{
                    fontSize: 15,
                    paddingBottom: 5,
                    fontWeight: "bold", marginTop: 10
                }}>
                    {title}
                </span>}
                <div className="progress-bar-container" style={{ width: window.screen.width/5, borderColor: color }}>
                    <div className="progress-bar" style={{ width: `${value}%`, backgroundColor: color }}>
                        {text && <div className="progress-text">{text}</div>}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: "center", paddingLeft: 5, color: color, fontWeight: "bold" }}>
                <p>{value}%</p>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    color: PropTypes.string,
    value: PropTypes.number,
    icon: PropTypes.any,
    title: PropTypes.string,
    text: PropTypes.string,
    impactId: PropTypes.string,
    onClick: PropTypes.func,
    isClicked: PropTypes.bool
}

export default ProgressBar;