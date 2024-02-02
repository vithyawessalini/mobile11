import React from 'react'
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import {Toaster} from "react-hot-toast";
const Layout = ({children,title,description,keywords,author}) => {
  return (
  <>
  <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
  <Header/>
  <main style={{ minHeight: "120vh" }}>
    <Toaster/>
    {children}</main>
  <Footer/>
  </>
  )
}

Layout.defaultProps = {
  title: "mobile",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "",
};
export default Layout
