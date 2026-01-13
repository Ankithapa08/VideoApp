import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getDashboardStats = async (req, res) => {
  const userId = req.user._id;

  const totalVideos = await Video.countDocuments({ owner: userId });
  const totalSubscribers = await Subscription.countDocuments({ channel: userId });
  const totalLikes = await Like.countDocuments({ likedBy: userId });

  return res.json(
    new ApiResponse(200, {
      totalVideos,
      totalSubscribers,
      totalLikes,
    })
  );
};

export const getDashboardVideos = async (req, res) => {
  const userId = req.user._id;

  const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });

  return res.json(
    new ApiResponse(200, videos)
  );
};
