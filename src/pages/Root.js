import { NavLink, Outlet } from 'react-router-dom';
import classes from '../css/AppDesign.module.css';
import { useContext, useEffect } from 'react';
import { FaBell } from "react-icons/fa";
import { MasterDataContext } from '../context/master-context';
import { getToken } from '../apiBundle/api';


const RootLayout = () => {
    const ctx = useContext(MasterDataContext);
    const access_token = ctx.masterData.token;

    useEffect(()=>{
        const getFirstTokentoCtx = async()=>{
            const token_value = await getToken(process.env.REACT_APP_ACCESS_READ_SCOPE);
            ctx.setToken(token_value);
        }
        if(!access_token){
            getFirstTokentoCtx()
        }
    },[// eslint-disable-next-line
        access_token]);

    return (
        <>
            <header className={classes.header}>
                <div className={classes.card}>
                    <div className={classes.bar}>
                        <div style={{ padding: 10 }}>Contact Us</div>
                        <div style={{ padding: 10 }}>Customer portal</div>
                        <div style={{ padding: 10 }}>Global/EN</div>
                    </div>
                    <div className={classes.line} />
                    <div className={classes.block}>
                        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>Logo</div>
                        <nav>
                            <div style={{ padding: 25 }}>
                                <NavLink
                                    end
                                    style={{ paddingBottom: 23, textDecoration: 'none', color: '#007E4B', fontWeight: "bolder" }}
                                    to="home"
                                    className={({ isActive }) => (
                                        isActive ? classes.active : undefined
                                    )}
                                >
                                    Home
                                </NavLink>
                            </div>
                            <div style={{ padding: 25 }}>
                                <NavLink
                                    style={{ paddingBottom: 23, textDecoration: 'none', color: '#007E4B', fontWeight: "bolder" }}
                                    to="feed"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    My Feeds
                                </NavLink>
                            </div>
                            <div style={{ padding: 25 }}>
                                <NavLink
                                    style={{ paddingBottom: 23, textDecoration: 'none', color: '#007E4B', fontWeight: "bolder" }}
                                    to="farms"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    My Farms
                                </NavLink>
                            </div>
                            <div style={{ padding: 25 }}>
                                <NavLink
                                    style={{ paddingBottom: 23, textDecoration: 'none', color: '#007E4B', fontWeight: "bolder" }}
                                    end
                                    to="help"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                >
                                    Help Center
                                </NavLink>
                            </div>
                            <h1 style={{ paddingLeft: 10, paddingRight: 10, cursor:"pointer" }}><FaBell size={20} color='#007E4B' /></h1>
                            <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <img style={{ width: 26, height: 26, borderRadius: 13, objectFit: "cover" }}
                                    src={'https://reactjs.org/logo-og.png'} alt='profile' />
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <main>
                {/* This will be rendered if url changes as a child block */}
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;