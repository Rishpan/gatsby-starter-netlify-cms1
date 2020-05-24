import React from 'react'
import Template from '../template'
import { Link, graphql, StaticQuery } from 'gatsby'
// import imgurl from '../penny.jpg';

export default function CoinInfo() {
  // const { coin } = {};
  const coin = {};
  console.log(coin);
  return (
    <Template>
      <div>
        <h1>{coin.Title}</h1>
        <div class="information"></div>
        <table>
          <tr>
            <td>Value</td>
            <td>{coin.Value}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{coin.Country}</td>
          </tr>
          <tr>
            <td>History</td>
            <td>{coin.History}</td>
          </tr>
          <tr>
            <td>Composition</td>
            <td>{coin.Composition}</td>
          </tr>
        </table>
        <img class="fit-picture"
              src={""}
              alt="Penny picture">
        </img>
        </div>
    </Template>
  )
}
export default () => (
  <StaticQuery
    query={graphql`
      query CoinInfoQuery  {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                currency
                date(formatString: "MMMM DD, YYYY")
                country
                value
                history
                composition
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query CoinInfoQuery  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            currency
            date(formatString: "MMMM DD, YYYY")
            country
            value
            history
            composition
          }
        }
      }
    }
  }
  `)
  data.allMarkdownRemark.edges.forEach(edge => {
    const slug = edge.node.fields.slug
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/blog-post.js`),
      context: { slug: slug },
    })
  })
}

