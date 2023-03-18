const Vote = require("../models/vote");
const asyncHandler = require("express-async-handler");
const {Types} = require("mongoose")
//@desc Upvoting post
//@access Protected
//@route /post
const upVotePost = asyncHandler(async (req, res) => {
  const { postId, up } = req.body;
  let result;
  if (!postId)
    return res.status(404).send("Please check the request body");
  const existingVote = await Vote.findOne({ postId });
  let existingVoteNumber = existingVote.vote;
  let upVotedUserId = existingVote.upVotedUserId
  let downVotedUserId = existingVote.downVotedUserId
  
  if (up) {
    let voteDuplication = existingVote.upVotedUserId.some(
      (user) => user == req.user._id.toString()
    );
    if (voteDuplication) {
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber - 1,
          upVotedUserId:upVotedUserId.filter((id) => id !== req.user._id.toString()),
        },
        {
          new: true,
        }
      );
    } else {
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber + 1,
          upVotedUserId:[...upVotedUserId, req.user._id.toString()],
        },
        {
          new: true,
        }
      );
     
    }
  } else {
    let voteDuplication = existingVote.downVotedUserId.some(
      (user) => user == req.user._id.toString()
    );
  
    if(voteDuplication){
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber + 1,
          downVotedUserId: downVotedUserId.filter(id => id !== req.user._id.toString()),
        },
        {
          new: true,
        }
      )
    }else{
      result = await Vote.findOneAndUpdate(
        { postId },
        {
          vote: existingVoteNumber - 1,
          downVotedUserId:[...downVotedUserId, req.user._id.toString()],
        },
        {
          new: true,
        }
      )
    }
  }
  return res.status(200).send(result)
})
 

module.exports = { upVotePost };
