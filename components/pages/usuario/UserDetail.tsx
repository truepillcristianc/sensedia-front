import { Tab } from "@headlessui/react";
import clsx from "clsx";

export default function UserDetail({ user }: { user: User }) {
  return (
    <div className="bg-white text-sgray-100 flex flex-col gap-y-8 py-8 justify-start">
      <div className="max-w-[870px] flex flex-col gap-2">
        <p className="">id: {user.id}</p>
        <p className="">name: {user.name}</p>
        <p className="">email: {user.email}</p>
        <p className="">posts: {user.posts?.length || 0}</p>
        <p className="">albums: {user.albums?.length || 0}</p>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-spurple/20 p-1">
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-spurple focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-spurple shadow'
                  : 'text-spurple/50 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Posts
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-spurple focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white text-spurple shadow'
                  : 'text-spurple/50 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            Albums
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={clsx(
              'rounded-xl bg-white p-3 border-2 border-spurple',
              'ring-white/60 ring-offset-2 ring-offset-spurple focus:outline-none focus:ring-2'
            )}
          >
            <ul>
              {user.posts ? user.posts?.map((post) => (
                <li
                  key={post.id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                    {post.content}
                  </h3>
                </li>
              )) : <li className="relative rounded-md p-3 hover:bg-gray-100">No hay posts para mostrar</li>}
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={clsx(
              'rounded-xl bg-white p-3 border-2 border-spurple',
              'ring-white/60 ring-offset-2 ring-offset-spurple focus:outline-none focus:ring-2'
            )}
          >
            <ul>
              {user.albums ? user.albums?.map((alb) => (
                <li
                  key={alb.id}
                  className="relative rounded-md p-3 hover:bg-gray-100"
                >
                  <h3 className="text-sm font-medium leading-5">
                    {alb.title}
                  </h3>
                  <p className="text-sm font-medium leading-5">
                    {alb.description}
                  </p>
                </li>
              )) : <li className="relative rounded-md p-3 hover:bg-gray-100">No hay albums para mostrar</li>}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}