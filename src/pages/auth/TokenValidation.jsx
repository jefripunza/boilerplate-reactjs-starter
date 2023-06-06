/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';

import { otpValidate } from '../../app/auth';

const TokenValidation = ({ mode, otp_secret }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp_code, setOtp] = React.useState('');

  const [isDisable, setDisable] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    if (String(otp_code).length == 6) {
      setDisable(true);
      setMessage(null);
      dispatch(otpValidate({ mode, otp_secret, otp_code }))
        .unwrap()
        .then(([is_error, error_message]) => {
          if (is_error) {
            setMessage(error_message);
            setDisable(false);
            setOtp('');
            return;
          }
          navigate('/panel/dashboard', { replace: true });
        });
    }
  }, [otp_code]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">OTP Validation</h1>
        <div className="mt-6">
          <div className="mb-2 grid place-items-center">
            <OtpInput
              value={otp_code}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ width: '8px' }}></span>}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                border: '1px solid #CFD3DB',
                borderRadius: '8px',
                width: '54px',
                height: '54px',
                fontSize: 16,
                color: '#000',
                fontWeight: '600',
                caretColor: 'blue',
              }}
              focusStyle={{
                border: '1px solid #CFD3DB',
                outline: 'none',
              }}
              renderInput={(props) => <input {...props} disabled={isDisable} />}
            />
            {message ? <span style={{ marginTop: 20, color: 'red' }}>{message}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenValidation;
