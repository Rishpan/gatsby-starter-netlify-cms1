import React from 'react'
import Template from '../pages/template'
import { Link, graphql, StaticQuery } from 'gatsby'
// import imgurl from '../penny.jpg';

// const BlogPost = ({ data }) => {
//  const { markdownRemark: post } = data

export default function CoinInfo({ data }) {
  const { markdownRemark: coin } = data;
  const c = coin.frontmatter;
  return (
    <Template>
      <div>
        <h1>{c.title}</h1>
        <div class="information"></div>
        <table>
          <tbody>
          <tr>
            <td><b>Value</b></td>
            <td>{c.value}</td>
          </tr>
          <tr>
            <td><b>Country</b></td>
            <td>{c.country}</td>
          </tr>
          <tr>
            <td><b>History</b></td>
            <td>{c.history}</td>
          </tr>
          <tr>
            <td><b>Composition</b></td>
            <td>{c.composition}</td>
          </tr>
          </tbody>
        </table>
        {c.image && c.image.publicURL && 
        <img class="fit-picture"
              src={c.image.publicURL}>
        </img>}
        </div>
    </Template>
  )
}

export const coinInfoQuery = graphql`
  query CoinInfoByPath($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        currency
        title
        country
        value
        history
        composition
        image {
          publicURL
        }
      }
    }
  }
`