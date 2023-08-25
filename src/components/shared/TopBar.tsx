import {ModeToggle} from '@/components/ui/ModeToggle.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useNavigate} from 'react-router-dom';
import {links} from '@/router.tsx';
import {useDispatch, useSelector} from "react-redux";
import {SelectIsAuthorized} from "@/redux/store/user/selector.ts";
import {LogOutIcon} from "lucide-react";
import {setAuthorized} from "@/redux/store/user/slice.ts";
import Cookies from "js-cookie";

const TopBar = () => {
    const isAuthorized = useSelector(SelectIsAuthorized);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        Cookies.remove('access_token_tz_demo');
        dispatch(setAuthorized({isAuthorized:false}));
    }

    return (
        <header
            className={'dark:bg-dark-3 bg-light-2 w-screen flex items-center justify-center p-3 shadow-sm max-w-full'}>
            <nav className={'w-full flex items-center justify-between p-2'}>
                <div className={'text-[24px] cursor-pointer'} onClick={() => navigate(links.landing)}>
                    RSS-Test
                </div>
                <div className={'flex gap-4 items-center'}>
                    <Button className={'hidden md:flex'} onClick={() => navigate(links.dashboard)}>
                        Dashboard
                    </Button>
                    {isAuthorized &&
                        <Button className={'hidden md:flex'} onClick={logOut}>
                            <LogOutIcon/>
                        </Button>}
                    <ModeToggle/>
                </div>
            </nav>
        </header>
    );
};

export default TopBar;
