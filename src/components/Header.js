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
        <header>
            <div class="header-top">
                <h1 class="header-item">Coinnit</h1>
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