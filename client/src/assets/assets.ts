import { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { MdInsights, MdMoney, MdSubscriptions } from "react-icons/md";

type linksType = {
    to: string;
    label: string;
    icon: any;
};
type IconsType = {
    [key: string]: IconType;
};

export const icons: IconsType = {
    home: FaHome,
    helpCircle: FiHelpCircle,
    settings: FiSettings,
    logout: FiLogOut,
    expense: MdMoney,
    subscription: MdSubscriptions,
    report: MdInsights,
    profile: CgProfile,
};

export const Links: linksType[] = [
    { to: "/dashboard", label: "DASHBOARD", icon: icons.home },
    { to: "/expenses", label: "EXPENSES", icon: icons.expense },
    { to: "/subscriptions", label: "SUBSCRIPTIONS", icon: icons.subscription },
    { to: "/reports", label: "REPORTS/INSIGHTS", icon: icons.report },
    { to: "/profile", label: "PROFILE", icon: icons.profile },
];
