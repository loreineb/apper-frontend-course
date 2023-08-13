import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({value}) => {

    const getColor = () => {
        if (value < 40) {
            return "#ff0000";
        } else if (value < 70){
            return "#ffa500"
        } else {
            return "#2ecc71";
        }
    }

    return <div className='container'>
            <div className='progress-bar'>
                <div className='progress-bar-fill' 
                    style={{width : `${value}%`, backgroundColor: getColor() }}>
            </div>
        </div>
    </div>
}

export default ProgressBar;
