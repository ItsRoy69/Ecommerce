import React from "react";
import Header from "../components/constants/Header";
import ShopSection from "../components/home/ShopSection";
import ContactInfo from "../components/home/ContactInfo";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/constants/Footer";

const HomeScreen = ({ match }) => { 
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CallToAction />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;