import React, { useEffect } from 'react'
import Template from '../pages/template';
import Data from '../pages/coins-data.json';

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  useEffect(() => {
    const script = document.createElement('script');

    script.innerHTML = `
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
            window.netlifyIdentity.on("login", () => {
              document.location.href = "/admin/";
          })
        }
      });
    }
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);


  var featuredCoinElements = posts.map(({ node: post }) => {
    // This is JSX! We need babel to translate this to JavaScript
    // usd/us-penny
    const backgroundImage = post.frontmatter.image && post.frontmatter.image.publicURL ? post.frontmatter.image.publicURL : undefined;
    return (
      <div className="featured-coin rounded-corners" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <p>
          <a href={`${post.fields.slug}`}> 
            {post.frontmatter.title}
          </a>
        </p>
      </div>
    );
  });
  return (
    <Template>
      <section class="main-content">
      <h2>Featured</h2>
      <div class="featured-coins">
        {featuredCoinElements}
      </div>
    </section>
    </Template>
  );
}

export const coinInfoQuery = graphql`
  query FeaturedCoinByPath {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { 
        frontmatter: { 
          featured: { eq: true } 
          templateKey: {eq: "coininfo-page"}
        } 
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
