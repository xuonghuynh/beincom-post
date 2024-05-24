import React from 'react'

const PostPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId
  return (
    <div className='container pt-20'>
      {postId}
    </div>
  )
}

export default PostPage
