import React from 'react';
import Link from 'next/link';

function Navbarpage() {
  const items = [
    {
      id: 1,
      name: 'Home',
    },
    {
      id: 2,
      name: 'About',
    },
    {
      id: 3,
      name: 'Contact',
    },
    {
      id: 4,
      name: 'Login',
      isLink: true,
      link: '/login',
    },
  ];

  return (
    <div className='min-h-screen'>
      <div className='flex justify-center items-center bg-white shadow'>
        <div>
          <h2 className='px-5 p-4 font-bold text-2xl'>Book</h2>
        </div>
        <div className='mr-8 ml-auto'>
          <div className='flex space-x-4'>
            {items.map((item) => (
              <div key={item.id} className='m-4 px-3 hover:font-bold cursor-pointer'>
                {item.isLink ? (
                  <Link href={item.link} className='font-semibold hover:font-bold text-green-900'>
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbarpage;
