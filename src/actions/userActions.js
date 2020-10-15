export const FETCH_REGISTRATION = 'FETCH_REGISTRATION';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const FETCH_COOKIE = 'FETCH_COOKIE';
export const FETCH_LOGIN_FAILED = 'FETCH_LOGIN_FAILED';
export const FETCH_PROFILE = 'FETCH_PROFILE';

const sendRegForm = (data) => {
    return {
      type: FETCH_REGISTRATION,
      payload: data,
    };
  };

const getDataFromCookie = () => {
    return {
      type: FETCH_COOKIE,
    };
  };

  const setLoader = () => {
    return {
      type: 'LOADER_ON',
    };
  };

  const offLoader = () => {
    return {
      type: 'LOADER_OFF',
    };
  };

  const editProfile = (data) => {
    return {
      type: FETCH_PROFILE,
      payload: data,
    };
  };
  
  const sendLogInForm = (data) => {
    return {
      type: FETCH_LOGIN,
      payload: data,
    };
  };

  const putLogInData = (data) => {
    return {
      type: 'FETCH_LOGIN_FINISHED',
      payload: data,
    };
  };
  
  const putErrorData = (data = {}) => {
    return {
      type: FETCH_LOGIN_FAILED,
      error: data,
    };
  };
  
  const logOutData = () => {
    document.cookie = `${document.cookie}; max-age=0`;
    return {
      type: 'LOG_OUT',
    };
  };
  
  const setVallidStatus = () => {
    return {
      type: 'CHANGE_VALID_STATUS',
    };
  };

  export {
  sendRegForm,
  setLoader,
  offLoader,
  putLogInData,
  sendLogInForm,
  logOutData,
  getDataFromCookie,
  putErrorData,
  setVallidStatus,
  editProfile,
  }