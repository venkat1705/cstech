import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { BiBell } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { login } from "../recoil/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const navigation = [
  { name: "Home", to: "/" },
  { name: "Employee List", to: "/employeeList" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const authState = useRecoilValue(login);
  const setAuthState = useSetRecoilState(login);

  const handleLogout = () => {
    localStorage.clear();
    setAuthState(null);
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center xl:hidden md:hidden lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <RxCross2
                      className="block h-6 w-6"
                      aria-hidden="true"
                      size={25}
                    />
                  ) : (
                    <HiBars3BottomRight
                      className="block h-6 w-6"
                      aria-hidden="true"
                      size={25}
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch xl:justify-start md:justify-start lg:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
              </div>
              <>
                {authState ? (
                  <>
                    <div className="hidden xl:ml-6 md:ml-6 lg:ml-6 xl:block md:block lg:block">
                      <div className="flex space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            onClick={() => setActive(item)}
                            className={classNames(
                              active === item && "active"
                                ? "border-b border-white text-white transition-all duration-500"
                                : "text-gray-300   hover:text-white",
                              "px-3 py-[20px] text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 xl:static md:static lg:static xl:inset-auto md:inset-auto lg:inset-auto xl:ml-6 md:ml-6 lg:ml-6 xl:pr-0 md:pr-0 lg:pr-0">
                      <h1 className="text-white font-semibold font-md xs:font-sm">
                        welcome,{" "}
                        <strong className="text-gray-300">
                          {authState.name}
                        </strong>
                      </h1>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleLogout()}
                                  className={classNames(
                                    active ? "bg-gray-100 w-full" : "",
                                    "block px-4 py-2 text-sm text-gray-700 w-full text-start h-full"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="bg-blue-500 w-[120px] h-[45px] text-center hover:bg-indigo-400 text-white text-md font-semibold rounded-[10px] transition-all duration-500 ">
                      Login
                    </button>
                  </Link>
                )}
              </>
            </div>
          </div>

          <Disclosure.Panel className="xl:hidden md:hidden lg:hidden transition-all duration-500 ease-in-out">
            {authState ? (
              <div className="space-y-1 px-2 pt-2 pb-3 ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    as="a"
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
