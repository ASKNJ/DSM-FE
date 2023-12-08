import PropTypes from 'prop-types';
import './css/ProgressBar.css';
import './css/Overlay.css';

const SmallProgressBar = (props) => {
    const { color, value } = props;

    return (
        <div className="small-progress-bar-container">
            <div className="small-progress-bar" style={{ width: `${value}%`, backgroundColor: color }}>
            </div>
            <div className='small-progress-bar-text'>
                <p style={{ fontWeight: "bold" }} className='x-axis-text'>{value}%</p>
            </div>
        </div>
    );
};

SmallProgressBar.propTypes = {
    color: PropTypes.string,
    value: PropTypes.number
}

export default SmallProgressBar;