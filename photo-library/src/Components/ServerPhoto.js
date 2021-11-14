import React from 'react'
import { Component } from "react";
import imageClick from '../Pages/PhotoLibrary'
const axios = require('axios');

export default class ServerPhoto extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        error: false
      };
    }
  
    componentDidMount() {
        //this.setState({updated:false});
        this.imageRender();
    }

    async imageRender() {
        let res = await axios.get('http://127.0.0.1:8183/api/photometadatalist/')
        let data = res.data;
        let photoIdArray = [];
        for(const element of data.result){
            photoIdArray.push('http://127.0.0.1:8183/api/photo/'+element.photo_id);
            //console.log(element.photo_id);
        }
        //console.log(data);
        this.setState({imageURLs: photoIdArray});
        //this.setState({updated:true});
    }
  
    render() {
        if(this.state.imageURLs==null){
            return <p>Loading</p>
        }
        else{
            return this.state.imageURLs.map(x => <img src={x}/>)
        }
    }
  }