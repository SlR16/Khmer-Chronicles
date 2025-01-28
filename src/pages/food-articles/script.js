const contentType = 'foodArticle';
const spaceID = 'ntvh3j97dkce';
const accessToken = 'UC-xnFZuPk2OsBKWYLdZ8H6kwocji0aL37B5OvtH8HM';

// Fetch the articles from Contentful using their API
fetch(`https://cdn.contentful.com/spaces/${spaceID}/entries?access_token=${accessToken}&content_type=${contentType}`)
    .then(response => response.json())
    .then(data => {
      const articleList = document.getElementById('article-list');
      data.items.forEach(item => {
        // Use the item's sys.id to get the entryID
        let slug = item.fields.slug || item.fields.title.toLowerCase().replace(/\s+/g, '-'); // Use title if no slug
        const entryID = item.sys.id;  // Correctly access entry ID from the item
        
        // Create the article list item and link
        const articleItem = document.createElement('li');
        const articleLink = document.createElement('a');
        articleLink.href = `/.netlify/functions/foodArticle?slug=${slug}&entryID=${entryID}`;
        articleLink.textContent = item.fields.title;
        
        articleItem.appendChild(articleLink);
        articleList.appendChild(articleItem);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });