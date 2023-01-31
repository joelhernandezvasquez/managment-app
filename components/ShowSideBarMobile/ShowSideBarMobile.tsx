import navigation from '../../styles/navigation.module.css';

export const ShowSideBarMobile = () => {
  return (
   <div className={navigation.SideBar_mobile}>
    <p className={navigation.SideBar_mobile_headline}>Platform Launch</p>
    <svg className={navigation.SideBar_mobile_chevron_down} width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="#635FC7" stroke-width="2"/>
    </svg>
   </div>
  )
}
