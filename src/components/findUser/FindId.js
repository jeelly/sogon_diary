import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FindId = () => {
  const authNum = 5421;
  const [userNum, setUserNum] = useState(null);
  const [authBtnDisable, setauthBtnDisable] = useState(false);
  const [authInputDisable, setAuthInputDisable] = useState(false);

  //타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(180);
  const timerId = useRef(null);

  const auth = useCallback(() => {
    setauthBtnDisable(true);
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    // return () => clearInterval(timerId.current)
  }, []);

  useEffect(() => {
    if (authNum == userNum) {
      clearInterval(timerId.current);
      setAuthInputDisable(true);
    }
  }, [userNum]);

  useEffect(() => {
    if (time.current <= -1) {
      console.log('타임 아웃');
      clearInterval(timerId.current);
      setMin(3);
      setSec(0);
      time.current = 180;
      timerId.current = null;
      setauthBtnDisable(false);
    }
  }, [sec]);

  return (
    <div>      
      <InputBox>
        <section>
          <label htmlFor=''>Certification</label>
          <input type='text' placeholder='전화번호' />
          <div className='authNum'>
            <div>
              <input
                type='text'
                onChange={(e) => {
                  setUserNum(e.target.value);
                }}
                disabled={authInputDisable}
              />
              <span>
                {min}분{sec}초
              </span>
            </div>
            <button onClick={auth} disabled={authBtnDisable}>
              인 증
            </button>
          </div>          
        </section>
      </InputBox>
      
    </div>
  );
};

const InputBox = styled.div`
  padding-bottom: 142px;
  section {
    display: flex;
    flex-direction: column;
    label {
      font-family: 'Niramit';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      padding-bottom: 8px;
      padding-left: 14px;
    }
    input {
      font-family: 'AppleSDGothicNeoL';
      font-size: 12px;
      line-height: 22px;
      padding: 13px 20px;
      background: var(--WHITE);
      border: 2px solid #eeeeee;
      border-radius: 50px;
      margin-bottom: 10px;      
      outline: none;
      ::placeholder {
        color: var(--DEFAULT);
      }
      :focus{
        border: 2px solid var(--LIGHTER);
      }
    }
    .authNum {
      display: flex;
      justify-content: space-between;
      div {
        position:relative;
        display: flex;
        align-items: center;
        input {
          width: 206px;
          margin-bottom:0;
          :disabled {
            background-color: #eee;
          }
        }
        span {
          position: absolute;
          right:18px;
          color: var(--ERROR);
          font-size: 12px;
          font-family: 'AppleSDGothicNeoM';
          line-height:22px;
        }
      }

      button {
        width: 110px;
        height: 48px;
        background: var(--INFO);
        border-radius: 50px;
        border: none;
        font-family: 'AppleSDGothicNeoM';
        color: var(--WHITE);
        :disabled {
          opacity: 0.3;
        }
      }
    }
    input {
    height: 48px;
  }
  }
`;

export default FindId;
