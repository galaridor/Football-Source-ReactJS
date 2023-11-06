import styles from './LiveScore.module.css';

const LiveScore = () => {
    return (
        <div className={`${styles['livescore-section']}`}>
            <h1 className={`${styles['center-title']}`}>Live Score</h1>
        </div>
    );
};

export default LiveScore;