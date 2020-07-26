import React, { useEffect } from 'react'
import Template from '../pages/template';
import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  const coininfoPages = posts
    .filter(({ node: post }) => post.frontmatter.templateKey == "coininfo-page")
    .filter(({ node: post }) => post.frontmatter.featured );
  const funFacts = posts.filter(({ node: post }) => post.frontmatter.templateKey == "funfacts");
  const randomFunFact = funFacts[Math.floor(Math.random() * Math.floor(funFacts.length))];

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


  var featuredCoinElements = coininfoPages.map(({ node: post }) => {
    // This is JSX! We need babel to translate this to JavaScript
    // usd/us-penny
    const backgroundImage = post.frontmatter.image && post.frontmatter.image.publicURL ? post.frontmatter.image.publicURL : undefined;
    return (
      <Carousel.Item style={{ textAlign: "center", minHeight: 500 }}>
        <img
          src = { backgroundImage }
          alt="Slide"
          style={{ width: "75%" }}
        />
        <div class="line1" style = {{ borderBottom: "4px solid black" }}></div>
        <Carousel.Caption style={{ position: 'initial' }}>
          <h3><a href={`${post.fields.slug}`} style = { { fontSize: "40px"}}>{post.frontmatter.title}</a></h3>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
  return (
    <Template>
      <section class="main-content">
      <h1><strong>Welcome to Coinnit!</strong></h1>
      <div class="line1"></div>
      <br />
      <li>What is Coinnit?: An accessible coin database for amateur coin collectors. Each coin has a detailed page.</li>
      <li>Who created Coinnit?: This website was created by Rishab Pangal (an ardent coin collector) under the guidance of a mentor from the Coder School.</li>
      <li>What if I have coins to add?: Coinnit offers a unique add-a-coin feature, where our users can add coins from their collection to our database!</li>
      <li>What types of coins are in the database?: We have coins from all around the world! (mostly coins in circulation)</li>
      <li>Is the database complete?: No! There are still thousands of coins to be added to the database over time. You can help by adding your own coins!</li>
      <h2>Featured Coins of the Day</h2>
      <div class="line"></div>
      <br />
      <Carousel style={{ border: "3px solid black",background: "grey"}}>
        {featuredCoinElements}
      </Carousel>
      <br />
      <h1><strong>Weekly Coin Fun Fact</strong></h1>
      <div class="line1"></div>
      <br />
      <p>{randomFunFact.node.frontmatter.fact}</p>
      <br />
      <h1><strong>Other Websites for Coin Enthusiasts</strong></h1>
      <div class="line1"></div>
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

export const indexQuery = graphql`
  query FeaturedCoinByPath {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { 
        frontmatter: { 
          templateKey: {in: ["coininfo-page", "funfacts"]}
        } 
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            templateKey
            fact
            featured
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
