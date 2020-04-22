import React, { memo, useState } from 'react'
import { Redirect } from 'react-router';

const Navbar = ({toogleSideBar}) => {

		const [is_visible_submenu, toogleSubMenu] = useState(false);
		const [is_clicked_logout, setLogoutClicked] = useState(false);

		return(
			<div class="header-container fixed-top" style={{backgroundColor:"black"}}> {/* <!--  BEGIN NAVBAR  --> */}
				<header class="header navbar navbar-expand-sm">

				{ is_clicked_logout ? <Redirect to='login'/>  : null }

					<ul class="navbar-nav theme-brand flex-row  text-center">
						<li class="nav-item theme-logo">
							<a href="index.html">
								<img src="/PS/logo3.png" class="navbar-logo" alt="logo"/>
							</a>
						</li>
						<li class="nav-item theme-text">
							<a href="index.html" class="nav-link"> Bubble Town </a>
						</li>
						<li class="nav-item toggle-sidebar" onClick={() => {toogleSideBar(true)}}>
							<a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg></a>
						</li>
					</ul>

					<ul class="navbar-item flex-row navbar-dropdown" onClick={() => {toogleSubMenu(!is_visible_submenu)}} style={{position:"absolute", right:"0"}}>
						<li class="nav-item dropdown user-profile-dropdown order-lg-0 order-1">
							<a href="javascript:void(0);" class="nav-link dropdown-toggle user" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
							</a>
							<div class={`dropdown-menu position-absolute animated fadeInUp ${is_visible_submenu ? "show" : null}`} aria-labelledby="userProfileDropdown">
								<div class="user-profile-section">
									<div class="media mx-auto">
										<img src="/PS/logo3.png" class="img-fluid mr-2" alt="avatar"/>
											<div class="media-body">
												<h5>Nombre del dueno</h5>
												<p>Bubble Town</p>
											</div>
										</div>
									</div>
									<div class="dropdown-item">
										<a href="user_profile.html">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
											<span>Mi Perfil</span>
										</a>
									</div>
									<div class="dropdown-item">
										<a href="#" onClick={() => {
											localStorage.removeItem('PointOfSaleToken')
											setLogoutClicked(true)
										}}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
											<span>Cerrar Sesion</span>
										</a>
									</div>
								</div>
						</li>
					</ul>

				</header> {/* <!--  END NAVBAR  --> */}
			</div>
		)
	}


const SideBar = ({active_page}) => {

	return(
		<div class="sidebar-wrapper sidebar-theme">
			<nav id="sidebar">
				<div class="profile-info">
						<div className="user-cover-image" style={{backgroundColor:'black', width:'100%', height:'82px', marginBottom:'0px'}}>
						</div>
						<div class="user-info">
								<img src="/PS/logo3.png" alt="avatar"/>
								<h6 class="">Dueno del negocio</h6>
								<p class="">Bubble Town</p>
						</div>
				</div>
				<div class="shadow-bottom"></div>
				<ul class="list-unstyled menu-categories">

					<li class={active_page === "dashboard" ? "menu active" : "menu"}>
						<a href="/PS/dashboard" aria-expanded="false" class="dropdown-toggle">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
								<span>Dashboard</span>
							</div>
						</a>
					</li>

					<li class={active_page === "empleados" ? "menu active" : "menu"}>
						<a href="/PS/employees" aria-expanded="false" class="dropdown-toggle">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
								<span>Empleados</span>
							</div>
						</a>
					</li>

					<li class={active_page === "productos" ? "menu active" : "menu"}>
						<a href="/PS/ultimate" aria-expanded="false" class="dropdown-toggle">
							<div class="">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
								<span>Productos</span>
							</div>
						</a>
					</li>

					<li class={active_page === "flujos" ? "menu active" : "menu"}>
						<a href="apps_calendar.html" aria-expanded="false" class="dropdown-toggle">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trello"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect></svg>
								<span>Flujos de compra</span>
							</div>
						</a>
					</li>

					<li class={active_page === "promociones" ? "menu active" : "menu"}>
						<a href="/PS/promos" aria-expanded="false" class="dropdown-toggle">
							<div class="">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tag"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
								<span>Promociones</span>
							</div>
						</a>
					</li>

					<li class={active_page === "tickets" ? "menu active" : "menu"}>
						<a href="/PS/tickets" aria-expanded="false" class="dropdown-toggle">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
								<span>Ventas</span>
							</div>
						</a>
					</li>

					<li class={active_page === "caja" ? "menu active" : "menu"}>
						<a href="apps_calendar.html" aria-expanded="false" class="dropdown-toggle">
							<div class="">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
								<span>Caja</span>
							</div>
						</a>
					</li>

				</ul>
			</nav>
		</div>
	)}

const ContainerWrapper = (props) => {
	const [is_visible, toogleSideBar] = useState(false);

	return (
		<div>
			<Navbar toogleSideBar={toogleSideBar}/>
			{/* <!--  BEGIN MAIN CONTAINER  --> */}
			<div class={ is_visible ? "main-container sbar-open" : "main-container" } id="container">
				<div class={is_visible ? "overlay show" : "ovverlay"} onClick={() => {toogleSideBar(!is_visible)}}></div>
				<div class="search-overlay"></div>
				<SideBar active_page={props.active_page}/>

				{props.children}

			</div>
			{/* <!-- END MAIN CONTAINER --> */}

		</div>
	)}

export default ContainerWrapper