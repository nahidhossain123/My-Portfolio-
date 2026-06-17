import LogoIcon from "../component/icon/svgs/LogoIcon";
import SiteLogo from "../component/SiteLogo";


export default function Loading() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-900 text-white">
            <SiteLogo />
        </div>
    );
}