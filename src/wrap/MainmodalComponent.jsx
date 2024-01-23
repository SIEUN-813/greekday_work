import React from 'react';
import './scss/MainModal.scss'
import { useDispatch } from 'react-redux';
import { mainModal } from '../reducer/mainModal';

export default function MainModalComponent() {

    const dispatch = useDispatch();
    
    const onClickCloseOneDayBtn=(e)=>{
        e.preventDefault();
        let expires = 1;
        let toDay = new Date();
        toDay.setDate(toDay.getDate() + expires);
        const obj = {
            id: `TOP202311080${expires}`,
            expires: toDay.getTime()
        }
        localStorage.setItem('GREEKDAY_MAIN_MODAL', JSON.stringify(obj));
        dispatch(mainModal(false));
    }

    const onClickCloseBtn=(e)=>{
        e.preventDefault();  
        dispatch(mainModal(false));
    }

    return (
        <div id = "mainModal">
            <div className="wrap">
                <div className="container">
                    <div className="content">
                        <div className="img-box">                      
                            <img src="./images/intro/mainmodal/4070b7bc7d49329e685c87a44eb87e4b.png" alt="" />
                            <div className="btn-box">
                                <button onClick={onClickCloseOneDayBtn}>오늘 하루 보지 않기</button>
                                <button onClick={onClickCloseBtn}>닫기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
