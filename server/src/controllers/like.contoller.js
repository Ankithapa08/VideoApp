import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * TOGGLE like on a video
 */
const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const existingLike = await Like.findOne({
        video: videoId,
        user: userId
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Video unliked")
        );
    }

    await Like.create({
        video: videoId,
        user: userId
    });

    return res.status(201).json(
        new ApiResponse(201, { liked: true }, "Video liked")
    );
});

/**
 * TOGGLE like on a comment
 */
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        user: userId
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Comment unliked")
        );
    }

    await Like.create({
        comment: commentId,
        user: userId
    });

    return res.status(201).json(
        new ApiResponse(201, { liked: true }, "Comment liked")
    );
});

/**
 * TOGGLE like on a tweet
 */
const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        user: userId
    });

    if (existingLike) {
        await existingLike.deleteOne();
        return res.status(200).json(
            new ApiResponse(200, { liked: false }, "Tweet unliked")
        );
    }

    await Like.create({
        tweet: tweetId,
        user: userId
    });

    return res.status(201).json(
        new ApiResponse(201, { liked: true }, "Tweet liked")
    );
});

/**
 * GET all liked videos of logged-in user
 */
const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const likedVideos = await Like.find({
        user: userId,
        video: { $exists: true }
    }).populate({
        path: "video",
        populate: {
            path: "owner",
            select: "username avatar"
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            likedVideos.map(like => like.video),
            "Liked videos fetched successfully"
        )
    );
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
};
