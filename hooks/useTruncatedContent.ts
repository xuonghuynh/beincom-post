import React from 'react';

const useTruncatedContent = (content: string, maxLength = 20) => {
  const truncatedText = content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
  return truncatedText;
};

export default useTruncatedContent;