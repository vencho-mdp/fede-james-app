import Link from "next/link";

export default function NavbarItem({ text, route, isActive = false }) {
  return (
    <div className="flex flex-col p-2">
      <Link href={route}>
        <a className="flex text-base text-gray-200 link items-center ">
          {text}
        </a>
      </Link>
      {isActive && (
        <div className="mr-auto border-gray-200 border-b-2 mt-1 w-3/4" />
      )}
    </div>
  );
}
