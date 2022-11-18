import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
export default class News extends Component {
    static defaultProps={
       country:'in',
       pagesize: 6,
       category: 'general'
    }
    static propTypes={
      country: PropTypes.string,
      pagesize: PropTypes.number,
      category: PropTypes.string
    }
    constructor(props){
        super(props);
        this.state={
          articles:[],
          loading:false,
          page:1
        }
        document.title=`News - ${this.props.category}`
    }
     async updatenews (){
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ca2d2ae01f74154937b3b76b2177c7f&page=${this.props.page}&pageSize=${this.props.pagesize}`;
      this.setState({loading:true})
      let data= await  fetch(url);
      let parsedata=await data.json();
      this.setState({articles: parsedata.articles, 
        totalResults: parsedata.totalResults,
        loading: false
      })
    }
    async componentDidMount(){
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ca2d2ae01f74154937b3b76b2177c7f&page=1&pageSize=${this.props.pagesize}`;
      // this.setState({loading:true})
      // let data= await  fetch(url);
      // let parsedata=await data.json();
      // this.setState({articles: parsedata.articles, 
      //   totalResults: parsedata.totalResults,
      //   loading: false
      // })
      this.updatenews();

    }
     handlenextpage= async ()=>{
      // if(!(this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pagesize))){

      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ca2d2ae01f74154937b3b76b2177c7f&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
      // this.setState({loading:true})
      // let data= await  fetch(url);
      // let parsedata=await data.json();
      
      //  this.setState({
      //   page:this.state.page+1,
      //   articles: parsedata.articles,
      //   loading: false
      //  });
      // } 
      this.setState({
        page:this.state.page+1
      })
      this.updatenews();

    }
     handleprevious= async ()=>{
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ca2d2ae01f74154937b3b76b2177c7f&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
      // this.setState({loading:true})
      // let data= await  fetch(url);
      // let parsedata=await data.json();
      
      //  this.setState({
      //   page:this.state.page-1,
      //   articles: parsedata.articles,
      //   loading: false
      //  })
      this.setState({
        page:this.state.page - 1
      })
      this.updatenews();
    }
  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '35px 0px', marginTop:'90px'}}>{`Top ${this.props.category} HeadLines`}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((ele)=>{ 
          return <div className="col-md-4" key={ele.url}>
             <NewsItem  title={ele.title} Imageurl={ele.urlToImage} newsurl={ele.url} description={ele.description} author={ele.author} date={ele.publishedAt}/>
        </div>
         })}
            
            

        </div>
        <div className="container d-flex justify-content-between ">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil( this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark " onClick={this.handlenextpage}>Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}