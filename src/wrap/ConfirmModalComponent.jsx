import React from 'react';
import './scss/ConfirmModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { confirmModal } from '../reducer/confirmModal';

export default function ConfirmModalComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        const obj = {                
            isConfirmModal: false,
            confirmMsg: '',
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.remove('on');
    }

    return (
        <div id='confirmModal'>
            <div className="container">
                <div className="confirm-box">
                    <ul>
                        <li>
                            <div className='message-box'>   
                                {selector.confirmModal.confirmMsg.split('\n').map((item)=>{
                                    return(
                                        <p>
                                            {item}
                                        </p>
                                    )
                                })}
                            </div>
                        </li>
                        <li>
                            <div className='button-box'>
                                <button onClick={onClickCloseBtn}>확인</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};