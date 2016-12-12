import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = () => (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "100px"}}>
        <CircularProgress />
        <CircularProgress size={60} thickness={7} />
        <CircularProgress size={80} thickness={5} />
    </div>
);

export default Spinner;