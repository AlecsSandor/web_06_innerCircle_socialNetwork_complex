import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
// import Friend from "../../components/Friend";
import WidgetWrapper from '../../components/WidgetWrapper'
import UserImage from '../../components/UserImage'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../state'
import { useNavigate } from 'react-router-dom'
import { setPosts } from "../../state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
}) => {
  const dispatch = useDispatch()
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length
  const navigate = useNavigate()
  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8080/posts/${postId}/like`, {
      method: 'PATCH',
      body: JSON.stringify({ userId: loggedInUserId}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }
  
  const rePost = async () => {
    const formData = new FormData();
    formData.append("userId", loggedInUserId);
    formData.append("description", description);
    if (picturePath) {
      formData.append("picturePath", picturePath);
    }

    const response = await fetch(`http://localhost:8080/posts`, {
      method: "POST",
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    // setPost("");
  };

  return (
    <WidgetWrapper mb='2rem'>
      <FlexBetween>
        <FlexBetween gap='1rem' p='0.3rem' borderRadius='32px'
          onClick={() => {
            navigate(`/profile/${postUserId}`)
            navigate(0)
          }}
          sx={{
            transition: 'all 0.3s',
            '&:hover': {
              background: palette.neutral.light,
              cursor: 'pointer',
            },
          }}
        >
          <UserImage image={userPicturePath} size='55px' />
          <Box>
            <Typography
              color={main}
              variant='h5'
              fontWeight='500'
            >
              {name}
            </Typography>
            <Typography fontSize='0.75rem'></Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:8080/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: palette.whiteWash }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: palette.whiteWash }} />
              )}
            </IconButton>
            <Typography sx={{ color: palette.whiteWash }} >{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined sx={{ color: palette.whiteWash }} onClick={rePost} />
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default PostWidget
