import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Pagination from './component/Pagination';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      totalPosts:100,
      postsPerPage:10,
    };
  }

  componentDidMount() {
    axios.get("https://hn.algolia.com/api/v1/search").then((res) => {
      const newsdata = res.data.hits;
      this.setState({
        items: newsdata,
      });
    });
  }

GetDomain = (url) => {
  const url1 = /\.(.*?)\//g;
  const match = url1.exec(url) || [];
  return match[1];
}

paginate = (number) => { 
  this.setState({ currentPage: number }, () => {
    console.log(this.state.currentPage) ;
    axios.get("https://hn.algolia.com/api/v1/search?page="+this.state.currentPage).then((res) => {
      const newsdata = res.data.hits;
      this.setState({
        items: newsdata,
      });
    });
  }); 
}


TableData = () => {
    return this.state.items.map((item, index) => {
      const { title, num_comments, points, url } = item; //destructuring
      let urlshow = this.GetDomain(url) ;

      return (
        <div className="row offset-2" key={index}>
          <div className="col-md-1">{num_comments}</div>
          <div className="col-md-1">{points}</div>
          <div className="col-md-1 votearrow backgroudcenter">
          </div>
          <div className="col-md-8">
            {title}
            <span className="comhead">  ( <a href="from?site="><span>{urlshow}</span></a>)</span>
          </div>
        </div>
      );
    });
  };

  render() {
  
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="row rowheader offset-2">
              <div className="col-md-1">Comment</div>
              <div className="col-md-1">Vote Count</div>
              <div className="col-md-1 ">Upvote</div>
              <div className="col-md-6">News</div>
            </div>

            {this.TableData()}

            <Pagination
              currentPage={this.state.currentPage}
              paginate={this.paginate}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
