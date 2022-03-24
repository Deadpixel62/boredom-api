export const getActiveUser = (user) => {
  return {
    type: "getActiveUser",
    payload: user,
  };
};

export const logout = () => {
  return {
    type: "logout",
  };
};

export const setFavCount = (user) => {
  return {
    type: "setFavCount",
    payload: user,
  };
};

export const setRandomActivity = (activity) => {
  return {
    type: "setRandomActivity",
    payload: activity,
  };
};

export const setTypeActivity = (activity) => {
  return {
    type: "setTypeActivity",
    payload: activity,
  };
};

export const setPriceActivity = (activity) => {
  return {
    type: "setPriceActivity",
    payload: activity,
  };
};

export const setFavoriteActivities = (activity) => {
  return {
    type: "setFavoriteActivities",
    payload: activity,
  };
};

export const removeFav = (activity) => {
  return {
    type: "removeFav",
    payload: activity,
  };
};

export const storageFav = (favList) => {
  return {
    type: "storageFav",
    payload: favList,
  };
};

export const setFavTypes = (favType) => {
  return {
    type: "setFavTypes",
    payload: favType,
  };
};
