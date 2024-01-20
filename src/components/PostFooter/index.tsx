import PostBio from "@components/PostBio";
import Giscus from "@components/Giscus";
import SpecialThanks from "@components/SpecialThanks";
import React from "react";

interface PostFooterProps {
  tags?: [string];
  comment?: boolean;
}

const PostFooter = ({ tags, comment }: PostFooterProps) => {
  return (
    <>
      <div id="page-footer">
        {tags && (
          <div id="tags">
            {tags.map(tag => (
              <div className="tag" key={tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>

      <PostBio />

      <SpecialThanks />

      {comment && (
        <>
          <div id="comments">
            <Giscus repo="kciter/kciter.github.io" theme="light" />
          </div>

          {/* <script
            async
            dangerouslySetInnerHTML={{
              __html: `
$(function() {
  $('#comment-button').click(function () {
    $('#comments').toggle();

    if ($('#comments').css('display') === 'block') {
      $('#comment-button').text('댓글 닫기');
    } else {
      $('#comment-button').text('댓글 열기');
    }
  });
});
`,
            }}
          /> */}
        </>
      )}
    </>
  );
};

export default PostFooter;
