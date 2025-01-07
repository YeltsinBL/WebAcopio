import { Logout } from "../Logout/Logout";

export const Header = ({title}) => {
    return (
		<header className='grid grid-cols-1 md:flex justify-between py-4 px-4 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className=' sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
			</div>			
			<Logout />
		</header>
	);
}
