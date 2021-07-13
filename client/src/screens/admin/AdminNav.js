
import { Link, useLocation } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";

const sidebar = [
    {name: 'Product', link: '/product/create'},
    {name: 'Category', link: '/category/create'},
    {name: 'Subcategory', link: '/sub-category/create'},
    {name: 'further category', link: '/sub-category/sub-category/create'}
]
const AdminNav = () => {

    const { pathname } = useLocation();

    const checkIsActive = (link) => {
        return pathname === link
    }

    return (
        <div className="w-screen sm:w-1/5 text-xs sm:text-base bg-bluegray-800 flex justify-around sm:justify-start py-4 sm:py-0 sm:px-0 items-center sm:items-start sm:flex-col sm:space-y-6 text-gray-400">
            <div className="sm:mt-4 sm:w-full sm:pl-4 sm:text-4xl sm:py-1"><RiDashboardLine/></div>
            {sidebar.map((el) => (
                <Link key={el.name} className={`${checkIsActive(el.link) ? "bg-bluegray-900 text-gray-300" : "" } sm:block sm:w-full sm:pl-4 sm:py-1 sm:hover:bg-bluegray-900 hover:text-gray-300`} to={el.link} >
                <span>{el.name}</span>
                </Link>
            ))}
        </div>
    )
}
export default AdminNav;
