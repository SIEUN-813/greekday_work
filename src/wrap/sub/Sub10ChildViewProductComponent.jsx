import React from 'react';
import './scss/sub10.scss';
import ViewProductComponent from '../ViewProductComponent';

export default function Sub10ChildViewProductComponent(){

    return (
        <div className="viewProduct"> 
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>최근본상품</h2>
                </div>
                <ViewProductComponent />
            </div>
        </div>
    );
};

