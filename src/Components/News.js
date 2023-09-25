import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {

  constructor(){
        super();
        this.state = {
             articles: [],
             loading: false,
             page: 1
        }
    }

    async componentDidMount(){
        let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=ea782b4badb846a691a961d478b32995&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.articles.totalResults
        });
      }

       
          handlePrevClick = async()=>{
          console.log('previous')
          let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=ea782b4badb846a691a961d478b32995&page=${this.state.page - 1}&pageSize=20`;
          let data = await fetch(url);
          let parsedData = await data.json();
          console.log(parsedData);
          this.setState({
                page: this.state.page - 1,
                articles: parsedData.articles
          })
           
      }

      handleNextClick= async()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=ea782b4badb846a691a961d478b32995&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
              page: this.state.page + 1,
              articles: parsedData.articles
        });
      }
        
    }

  render() {
    return (
        
      <div className='container my-3'>
      
        <h1>Top Headings</h1>
        
        <div className="row">
        {this.state.articles.map((elements)=>{
            return <div className="col-md-4" key={elements.url}>
                     <NewsItem  title={elements.title} description={elements.description} imageUrl={elements.urlToImage} newsUrl={elements.newsUrl}/>
                  </div>
        })}  
           
        </div>

        <div className="container d-flex justify-content-between">
        <button type='button' disabled={this.state.page<=1} className=" btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type='button' className=" btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  
        </div>

      </div>
    )
  }
}

export default News