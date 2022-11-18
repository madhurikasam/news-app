import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description, Imageurl, newsurl,author,date}=this.props;
    return (
      <div className="my-3">
        <div className="card" >
            <img src={Imageurl?Imageurl:"https://www.gizmodo.com.au/wp-content/uploads/sites/2/2022/11/18/79fb7f3815b7a3c02685f407bc678645.jpg?quality=80&resize=1280,720"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
         </div>
    </div>
      </div>
    )
  }
}

export default NewsItem
