import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';



const Newsitem = (props) => {
    let {title, description,imageUrl,newsUrl,author,date,source,mode,category} = props;
   
    return (
      <div id='news-section' style={{marginBottom:'20px'}}>
      <div style={{border:'2px solid',borderRadius: "18px", minHeight:'auto'}}>
        <div>
        <div className={`card${props.mode}`} style={{width:'auto',position:'relative'}}>
        <div style={{display:'flex',
          justifyContent:'flex-end',
          position:'absolute',
          right:'1%'}}>
        <span className=" badge rounded-pill bg-danger">
         {source}
        </span>
  </div>
  </div>
  <img src={imageUrl} className="card-img-top" style={{borderRadius:'15px 15px 0 0'}}alt="..."/>
  <div className="card-body">
    <h5 className="card-title my-2" style={{marginLeft:'5px'}}>{title}</h5>
    <p className="card-description" style={{marginLeft:'5px'}}>{description}</p>
    <p className="card-text" style={{marginLeft:'3px'}}><small className="text-body-"> By {author} on {new Date(date).toGMTString()}</small></p>
    {/*<a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-outline-primary" style={{marginLeft:'10px',marginBottom:'7px'}}>Read Me </a>*/}
    <a rel='noreferrer' href={newsUrl} target="_blank">
    <button className="cta">
      <span>Read Me</span>
      <svg width="15px" height="10px" viewBox="0 0 13 10">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
        </a>
  </div>
  </div>
</div>
</div>


   
    )
}

export default Newsitem