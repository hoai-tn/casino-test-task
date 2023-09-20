import axios from "axios";

const instance = axios.create({
  baseURL: "https://stage.whgstage.com/front-end-test/",
});

export const getGamesFeed = async () => {
  try {
    const { data } = await instance.get("/games.php");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getJackpots = async () => {
  try {
    const { data } = await instance.get("/jackpots.php");
    return data;
  } catch (error) {
    throw error;
  }
};
