import React from 'react'

export default function Footer() {
  return (
    <footer className="page-footer font-small cyan darken-3">
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5">
          <div className=" flex-center text-center">

            <a href='https://www.facebook.com/' className="fb-ic">
              <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
         
            <a href='https://twitter.com/' className="tw-ic">
              <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>
    
            <a href='https://plus.google.com/' className="gplus-ic">
              <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>

            <a  href='https://www.linkedin.com/'className="li-ic">
              <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>

            <a href='https://www.instagram.com/' className="ins-ic">
              <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
            </a>

            <a href='https://www.pinterest.com/' className="pin-ic">
              <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright text-center py-3">© 2019 Copyright:
      <span> Alexander Tiunchik</span>
    </div>
  </footer>
  )
}
