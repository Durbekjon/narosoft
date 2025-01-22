import { redis } from "../../common/config/redis.config.js";

const createCache = (key, value) => {
  return redis.set(key, JSON.stringify(value));
};
const deleteCache = (key) => {
  return redis.del(key);
};

const getCache = async (key) => {
  const cache = await redis.get(key);
  console.log(cache);
  if (cache) {
    return JSON.parse(cache);
  }
};

export { createCache, deleteCache, getCache };
