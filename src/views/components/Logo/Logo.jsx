import React from 'react'

import logoImage from "../../../assets/img/logo/logo.svg";
import cl from "./Logo.module.scss";


export const Logo = () => {
  return (
    <div className={cl.logo}>
        <img className={cl.logoImage} src={logoImage} alt="Logotype" />
    </div>
  )
}
