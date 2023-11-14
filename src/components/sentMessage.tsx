import React from 'react';
import image from '../images/user.png';

// the initial props that are need to populate the chart messages
type initialProps = {
  msgObject: {
    sentBy: string | null;
    message: string | null;
    sentTime: string | null;
  };
};

const SentMsg: React.FC<initialProps> = (props) => {
  /** using this component to handle the messaages that are sent by the user. this will render based
   * on the front end logic that has handled in the chat box component
   */
  return (
    <li className='d-flex justify-content-between mb-4'>
      <img
        src={image}
        alt='avatar'
        className='rounded-circle d-flex align-self-start me-3 shadow-1-strong'
        width='60'
      />
      <div className='card'>
        <div className='card-header d-flex justify-content-between p-3'>
          <p className='fw-bold mb-0'>{props.msgObject.sentBy}</p>
          <p className='text-muted small mb-0'>
            <i className='far fa-clock'></i> {props.msgObject.sentTime}
          </p>
        </div>
        <div className='card-body'>
          <p className='mb-0'>{props.msgObject.message}</p>
        </div>
      </div>
    </li>
  );
};

export default SentMsg;
