import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MessageSquare,
  Reply,
  Send,
  Flag,
  AlertTriangle,
  User,
} from "lucide-react";

const CommentsSection = (recipeId) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [reportingCommentId, setReportingCommentId] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user_id] = useState("66de1ec3768ba1927c9f0cd8");
  const [chef_id] = useState("66d775724924397e1179e5eb");
  const [recipe_id] = useState("66d7e3a4e175ed517bc023d7");

  const [is_chef] = useState(true);

  const reportReasons = [
    "Inappropriate content",
    "Spam",
    "Offensive language",
    "Off-topic",
  ];

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipes/comments/${recipe_id}`,
        {
          params: { chef_id },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      showAlertMessage("Failed to load comments. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipe_id, chef_id]);

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
      window.location.reload();
    }, 2000);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() !== "" && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post("http://localhost:3000/api/recipes/comments", {
          newComment,
          recipe_id,
          chef_id,
          user_id,
        });
        setNewComment("");
        showAlertMessage("Comment added successfully.");
      } catch (error) {
        console.error("Error adding comment:", error);
        showAlertMessage("Failed to add comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (newReply.trim() !== "" && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post(
          `http://localhost:3000/api/recipes/comments/${commentId}/replies`,
          {
            newReply,
            chef_id,
          }
        );
        setNewReply("");
        setReplyingToCommentId(null);
        showAlertMessage("Reply added successfully.");
      } catch (error) {
        console.error("Error adding reply:", error);
        showAlertMessage("Failed to add reply. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReportSubmit = async (commentId) => {
    if (reportReason && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await axios.post(
          `http://localhost:3000/api/recipes/comments/${commentId}/report`,
          {
            reportReason,
            user_id,
          }
        );
        setReportingCommentId(null);
        setReportReason("");
        showAlertMessage("Comment reported successfully.");
      } catch (error) {
        console.error("Error reporting comment:", error);
        showAlertMessage("Failed to report comment. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-white to-[#f8e5e1] rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#c98d83] flex items-center">
        <MessageSquare className="mr-3" size={28} />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c98d83] to-[#b67c73]">
          Comments
        </span>
      </h2>
      {alertMessage && (
        <div className="bg-white border-l-4 border-[#c98d83] text-[#c98d83] p-4 mb-6 rounded-r-xl shadow-md animate-fade-in-down flex items-center">
          <AlertTriangle size={20} className="mr-3 flex-shrink-0" />
          <p className="text-sm font-medium">{alertMessage}</p>
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 rounded-full border-2 border-[#c98d83] px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:ring-opacity-50 transition-all duration-300 ease-in-out"
          />
          <button
            onClick={handleCommentSubmit}
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-[#c98d83] to-[#b67c73] text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out text-sm flex items-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Send size={18} className="mr-2" /> Post
          </button>
        </div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#c98d83] to-[#b67c73]"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#c98d83] rounded-full p-2 mr-3">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#c98d83]">
                    {comment.userRating}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">commented:</span>
                </div>
              </div>
              <button
                onClick={() =>
                  setReportingCommentId(
                    comment._id === reportingCommentId ? null : comment._id
                  )
                }
                className="text-gray-400 hover:text-[#c98d83] transition-colors duration-300"
              >
                <Flag size={18} />
              </button>
            </div>
            <p className="text-sm ml-0 mb-4 text-gray-700">
              {comment.ratingComment}
            </p>
            {reportingCommentId === comment._id && (
              <div className="absolute right-4 top-12 mt-2 bg-white p-4 rounded-xl border border-[#c98d83] shadow-2xl w-56 z-10 transition-all duration-300 ease-in-out">
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full rounded-md border-2 border-[#c98d83] px-3 py-2 text-xs mb-3 focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:ring-opacity-50"
                >
                  <option value="">Select a reason</option>
                  {reportReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleReportSubmit(comment._id)}
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-[#c98d83] to-[#b67c73] text-white px-4 py-2 rounded-md hover:shadow-md transition-all duration-300 ease-in-out text-xs ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Submit Report
                </button>
              </div>
            )}
            <div className="space-y-3 ml-6">
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div
                    key={reply._id}
                    className="bg-[#f6f1ef] rounded-xl p-4 shadow-sm border-l-2 border-[#c98d83]"
                  >
                    <div className="flex items-center mb-2">
                      <div className="bg-[#b67c73] rounded-full p-1 mr-2">
                        <User size={14} className="text-white" />
                      </div>
                      <span className="font-semibold text-xs">
                        <span className="text-[#c98d83] font-bold">Chef</span>{" "}
                        {reply.replyAuthor}
                      </span>
                      <span className="text-gray-500 text-xs ml-2">
                        replied:
                      </span>
                    </div>
                    <p className="text-xs ml-6 text-gray-700">
                      {reply.replyMessage}
                    </p>
                  </div>
                ))}
              {replyingToCommentId === comment._id ? (
                <div className="flex items-center space-x-2 mt-3">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="flex-1 rounded-full border-2 border-[#c98d83] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:ring-opacity-50 text-xs transition-all duration-300 ease-in-out"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    disabled={isSubmitting}
                    className={`bg-gradient-to-r from-[#c98d83] to-[#b67c73] text-white px-4 py-2 rounded-full hover:shadow-md transition-all duration-300 ease-in-out text-xs flex items-center ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Send size={14} className="mr-1" /> Reply
                  </button>
                </div>
              ) : (
                is_chef && (
                  <button
                    onClick={() => setReplyingToCommentId(comment._id)}
                    className="text-[#c98d83] hover:text-[#b67c73] transition-colors duration-300 mt-3 text-xs flex items-center"
                  >
                    <Reply size={14} className="mr-1" /> Reply to this comment
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
