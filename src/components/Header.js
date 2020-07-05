import React from 'react';
import { StaticQuery, graphql } from "gatsby"
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
        <header class="rounded-corners">
            <div class="header-top">
                <h1>Coinnit</h1>
                <button><a href="/admin">Add a Coin</a></button>
            </div>
            <div id="search">
                <Search searchIndex={data.siteSearchIndex.index} />
            </div>
        </header>
    )}
  />
        
    )
}