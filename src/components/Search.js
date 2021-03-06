import React, { Component } from 'react'
import { Index } from "elasticlunr"
import { Link } from "gatsby"

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
          query: ``,
          results: [],
        }
     }

    render() {
        return (
            <div>
                <input type="text" placeholder="Search for a coin" value={this.state.query} onChange={this.search} />
                {this.state.results.length > 0 && <ul>
                    {this.state.results.map(page => (
                        <li key={page.id}>
                            <Link to={page.path}>{page.title}</Link>
                        </li>
                    ))}
                </ul>}
            </div>
        )
    } 

    getOrCreateIndex = () => {
        console.log("searchIndex", this.props.searchIndex);
        return this.index
        ? this.index
        : // Create an elastic lunr index and hydrate with graphql query results
            Index.load(this.props.searchIndex)
    }

    search = evt => {
        const query = evt.target.value
        console.log("~~~ query", query);
        this.index = this.getOrCreateIndex()
        this.setState({
        query,
        // Query the index with search string to get an [] of IDs
        results: this.index
            .search(query, {})
            // Map over each ID and return the full document
            .map(({ ref }) => this.index.documentStore.getDoc(ref)),
        })
    }
}