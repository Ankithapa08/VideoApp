import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * CREATE a tweet
 */
const createTweet = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content || !content.trim()) {
        throw new ApiError(400, "Tweet content is required");
    }

    const tweet = await Tweet.create({
        content: content.trim(),
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(201, tweet, "Tweet created successfully")
    );
});

/**
 * GET tweets of a user (pagination)
 */
const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const tweets = await Tweet.find({ owner: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .populate("owner", "username avatar");

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                tweets,
                page: pageNumber,
                limit: limitNumber
            },
            "User tweets fetched successfully"
        )
    );
});

/**
 * UPDATE tweet (owner only)
 */
const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { content } = req.body;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    if (!content || !content.trim()) {
        throw new ApiError(400, "Updated content is required");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this tweet");
    }

    tweet.content = content.trim();
    await tweet.save();

    return res.status(200).json(
        new ApiResponse(200, tweet, "Tweet updated successfully")
    );
});

/**
 * DELETE tweet (owner only)
 */
const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    if (tweet.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to delete this tweet");
    }

    await tweet.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, "Tweet deleted successfully")
    );
});

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
};
