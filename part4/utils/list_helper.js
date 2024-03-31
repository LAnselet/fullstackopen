const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const blogsLikes = blogs.map((blogs) => blogs.likes);

  return blogsLikes.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const blogsLikes = blogs.map((blogs) => blogs.likes);
  const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes));
  const favoriteBlog = blogs[largestIndex];

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlog = (blogs) => {
  const blogsAuthor = blogs.map((blogs) => blogs.author);

  let mode = _.chain(blogsAuthor)
    .countBy()
    .entries()
    .maxBy(_.last)
    .thru(_.head)
    .value();

  let count = 0;

  blogsAuthor.forEach((element) => {
    if (element === mode) {
      count += 1;
    }
  });

  return {
    author: mode,
    blogs: count,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
