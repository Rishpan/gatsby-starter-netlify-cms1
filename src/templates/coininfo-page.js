import React from 'react'
import Template from '../pages/template'
import { Link, graphql, StaticQuery } from 'gatsby'
// import imgurl from '../penny.jpg';

// const BlogPost = ({ data }) => {
//  const { markdownRemark: post } = data

export default function CoinInfo({ data }) {
  // console.log("#####", something);
  const { markdownRemark: coin } = data;
  const c = coin.frontmatter;
  return (
    <Template>
      <div>
        <h1>{c.title}</h1>
        <div class="information"></div>
        <table>
          <tr>
            <td>Value</td>
            <td>{c.value}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{c.country}</td>
          </tr>
          <tr>
            <td>History</td>
            <td>{c.history}</td>
          </tr>
          <tr>
            <td>Composition</td>
            <td>{c.composition}</td>
          </tr>
        </table>
        <img class="fit-picture"
              src={c.image.image}>
        </img>
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
        image{
          image
        }
      }
    }
  }
`