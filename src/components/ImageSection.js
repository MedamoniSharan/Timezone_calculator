import React from "react";

function ImageSection(){
    return(
       <div id="intro" className="bg-image" style={{ background: "url('https://getwallpapers.com/wallpaper/full/f/a/a/1490898-best-wallpapers-in-the-world-1920x1200-high-resolution.jpg')", width: '1450px', height: '800px', backgroundSize: 'cover' }}>
              <div className="mask" style={{ backgroundColor: 'rgba(250, 182, 162, 0.15)' }}>
                <div className="d-flex justify-content-center align-items-center vh-100">
                </div>
              </div>
            </div>
    );
}

export default ImageSection;