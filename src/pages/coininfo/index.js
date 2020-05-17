import React from 'react'
import Template from '../template'
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
