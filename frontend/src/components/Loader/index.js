import React from 'react';
import './style.css';

const Loader = props => (
    <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
);

export default Loader;