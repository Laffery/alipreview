import { baseUrl } from "config";

/**
 * 根据id获取news信息
 * @param id news id
 * @returns news meta data
 */
export const getStoryByIdUrl = (id: number) => `${baseUrl}/v0/item/${id}.json`;

/**
 * 获取排行榜靠前的news id
 */
export const getTopStoriesIdsUrl = `${baseUrl}/v0/topstories.json`;

/**
 * 登录/新建账户接口
 */
export const submitAccountUrl = `${baseUrl}/submit`;
