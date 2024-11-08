import React, { useEffect, useState,useLocation } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spline from '@splinetool/react-spline';


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

 
  
   const capitalizeFirstLetter = (string) => {
    return string. charAt (0). toUpperCase() + string.slice (1);
    }
    //updating the news so that it can appear in the newsitem
  const updateNews = async ()=>{
    props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    props.setProgress(30)
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(false)
    settotalResults(parsedData.totalResults) 
    props.setProgress(100);
  }
    //Used to capitalize the first letter of the category.
    useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - Newsify`
      updateNews();
    }, []);

    

  const fetchMoreData = async () => {
  setPage(page+1)
  const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles))
  settotalResults(parsedData.totalResults)
  }; 

  const backToTop = ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


    
    return (
      
      <div className="container my-3">
        <h1 style={{marginTop:'50px', fontSize:'3rem', marginBottom:'30px'}}>Newsify- Latest News</h1>
        {loading && <Loader/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader/>}
        >
        <div className="row"> 
          {articles.map((element)=>{ // helps in displaying the articles based on the category
            return <div className="col-12 col-sm-6 col-md-4" key={element.url}>
            <Newsitem //Rendering newsitem component
              key ={element._id} title={element.title?element.title.slice(0,45):""} 
              description={element.description?element.description.slice(0,100):""} 
              imageUrl={element.urlToImage===null?"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=":element.urlToImage} 
              newsUrl={element.url} author={element.author?element.author:"unknown"} date={element.publishedAt} source={element.source.name} mode={props.mode} toggleMode={props.toggleMode}/>
          </div>
          })}
        </div>
        </InfiniteScroll>

        <button className="button" onClick={backToTop}>
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            ></path>
          </svg>
        </button>


      </div>
    );
  };




News.defaultProps = {
  country : 'us',
  pagesize : 24,
  category : 'general'

}
News.propTypes = {
  country : PropTypes.string,
  pagesize : PropTypes.number,
  category : PropTypes.string
}
export default News