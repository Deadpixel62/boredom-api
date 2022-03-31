import {
  GETACTIVEUSER,
  LOGOUT,
  SETFAVCOUNT,
  SETRANDOMACTIVITY,
  SETTYPEACTIVITY,
  SETPRICEACTIVITY,
  SETFAVORITEACTIVITIES,
  REMOVEFAV,
  STORAGEFAV,
  SETFAVTYPES,
} from "../constants";

export const getActiveUser = (user) => {
  return {
    type: GETACTIVEUSER,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setFavCount = (user) => {
  return {
    type: SETFAVCOUNT,
    payload: user,
  };
};

export const setRandomActivity = (activity) => {
  return {
    type: SETRANDOMACTIVITY,
    payload: activity,
  };
};

export const setTypeActivity = (activity) => {
  return {
    type: SETTYPEACTIVITY,
    payload: activity,
  };
};

export const setPriceActivity = (activity) => {
  return {
    type: SETPRICEACTIVITY,
    payload: activity,
  };
};

export const setFavoriteActivities = (activity) => {
  return {
    type: SETFAVORITEACTIVITIES,
    payload: activity,
  };
};

export const removeFav = (activity) => {
  return {
    type: REMOVEFAV,
    payload: activity,
  };
};

export const storageFav = (favList) => {
  return {
    type: STORAGEFAV,
    payload: favList,
  };
};

export const setFavTypes = (favType) => {
  return {
    type: SETFAVTYPES,
    payload: favType,
  };
};
