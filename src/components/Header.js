import React from 'react';
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Search from './Search';


export default function Header() {
    return (
        <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
        <header>
            <div class="header-top">
                <h1 class="header-item"><nav><Link to="/">Coinnit</Link></nav></h1>
                <img src="img/coinnitlogo.png" class="logo" alt="coinnit logo"/>
                <div id="search">
                  <Search searchIndex={data.siteSearchIndex.index} />
                </div>
                <div class="header-item header-add">
                  <button><a href="/admin">Add a Coin</a></button>
                </div>
            </div>
        </header>
    )}
  />
        
    )
}