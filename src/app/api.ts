import { baseUrl } from "config";

/**
 * 根据id获取news信息
 * @param id news id
 * @returns news meta data
 */
export const getStoryById = (id: number) => `${baseUrl}/v0/item/${id}.json`;

/**
 * 获取排行榜靠前的news id
 */
export const getTopStoriesIds = () => `${baseUrl}/v0/topstories.json`;
