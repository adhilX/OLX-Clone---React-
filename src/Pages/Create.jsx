import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import Footer from '../Components/Footer/Footer';

const CreatePage = () => {
  return (
    <Fragment>
      <Header />
      <Create/>
      <Footer/>
    </Fragment>
  );
};

export default CreatePage;
