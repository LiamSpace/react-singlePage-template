import React from 'react'
import ReactDom from 'react-dom'
import imgUrl from "assets/images/img1.jpg"
import videoUrl from 'assets/media/productAnimate.mp4'
import '@/styles/index.scss'


export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>hello world</h1>
                <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur aliquid incidunt pariatur dolores repellat nobis mollitia, maiores, eos recusandae eveniet sed illum cumque. Dolore sapiente excepturi nam fugit magnam dolores.</h4>
                {/* <img src={require('./../assets/images/img1.jpg')} alt="" /> */}
                <div className="fillImg"></div>
                <img src={imgUrl} alt="" />
                <img src={require('assets/images/img3.jpeg')} alt="" />
                <video src={videoUrl} controls="controls"></video>
            </div>
        )
    }
}