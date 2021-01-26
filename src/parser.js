export default (response) => {
  const { data: { contents } } = response;
  const parser = new DOMParser();
  const document = parser.parseFromString(contents, 'application/xml');
  const error = document.querySelector('parsererror');
  if (error) {
    throw new Error(`${error.textContent}`);
  }
  const titleFeed = document.querySelector('title').textContent;
  const descriptionFeed = document.querySelector('description').textContent;
  const items = document.querySelectorAll('item');
  const feedsData = { title: titleFeed, description: descriptionFeed };

  const postsData = [...items].map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return {
      title,
      link,
      description,
    };
  });

  return ({
    feedsData,
    postsData,
  });
};
