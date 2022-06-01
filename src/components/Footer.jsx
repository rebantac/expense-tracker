import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

import '../index.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Rebanta Chakraborty All rights reserved</p>
      <p>
        <InstagramIcon className='icons'/>
        <TwitterIcon className='icons'/>
        <a href='https://github.com/rebantac/expense-tracker'>
            <GitHubIcon className='icons'/>
        </a>
      </p>
    </div>
  )
}

export default Footer