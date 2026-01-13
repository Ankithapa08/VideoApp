import { Router } from "express";
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * Public – get comments for a video
 */
router.get("/video/:videoId", getVideoComments);

/**
 * Protected – add a comment
 */
router.post("/video/:videoId", verifyJWT, addComment);

/**
 * Protected – update/delete own comment
 */
router
  .route("/:commentId")
  .patch(verifyJWT, updateComment)
  .delete(verifyJWT, deleteComment);

export default router;
