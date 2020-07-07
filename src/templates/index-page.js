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
      <h1><strong>Welcome to Coinnit!</strong></h1>
      <body ><div class="line1"></div></body >
      <br />
      <li>What is Coinnit?: An accessible coin database for amateur coin collectors. Each coin has a detailed page.</li>
      <li>Who created Coinnit?: This website was created by Rishab Pangal (an ardent coin collector) under the guidance of a mentor from the Coder School.</li>
      <li>What if I have coins to add?: Coinnit offers a unique add-a-coin feature, where our users can add coins from their collection to our database!</li>
      <li>What types of coins are in the database?: We have coins from all around the world! (mostly coins in circulation)</li>
      <li>Is the database complete?: No! There are still thousands of coins to be added to the database over time. You can help by adding your own coins!</li>
      <h2>Featured Coins of the Day</h2>
      <body ><div class="line"></div></body >
      <div class="featured-coins">
        {featuredCoinElements}
      </div>
      <br />
      <h1><strong>Weekly Coin Fun Fact</strong></h1>
      <body ><div class="line1"></div></body >
      <br />
      <p>The USD was based on a Spanish Coin.</p>
      <br />
      <h1><strong>Other Websites for Coin Enthusiasts</strong></h1>
      <body ><div class="line1"></div></body >
      <br />
      <a href="https://www.pcgs.com/coinfacts">PCGS Coin Facts</a>
      <p><a href="https://www.thesprucecrafts.com/collecting-coins-4162970">The Spruce</a></p>
      <p><a href="https://www.usmint.gov">The US Mint</a></p>
      <p><a href="https://www.coinnews.net">CoinNews.net</a></p>
      <p><a href="https://coins.ha.com">Heritage Auctions</a></p>

      </section>
      <footer><center>Designed using React and Gatsby</center></footer>
      <footer><center>Created by Rishab Pangal under the guidance of Ryan Cheung</center></footer>
      <footer><center>If you have any questions, contact me at rishab.pangal@gmail.com</center></footer>
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
