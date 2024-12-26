import { CodeXmlIcon, Newspaper, Presentation, User2Icon } from "lucide-react";
import Link from "next/link";

const AsideNav = () => {
  const routes = (
    <>
      <Link
        href={"profile"}
        className="text-lg flex items-center gap-2 font-medium pl-2 py-2 rounded-lg"
      >
        <User2Icon /> Profile
      </Link>

      <Link
        href={"projects"}
        className="text-lg flex items-center gap-2 font-medium pl-2 py-2 rounded-lg"
      >
        <Presentation /> Projects
      </Link>

      <Link
        href={"experiences"}
        className="text-lg flex items-center gap-2 font-medium pl-2 py-2 rounded-lg"
      >
        <CodeXmlIcon /> Experiences
      </Link>

      <Link
        href={"blogs"}
        className="text-lg flex items-center gap-2 font-medium pl-2 py-2 rounded-lg"
      >
        <Newspaper /> Blogs
      </Link>
    </>
  );

  return (
    <div className=" min-h-screen lg:py-6">
      <h1 className="hidden lg:block text-center font-bold text-4xl">
        Dashboard
      </h1>

      <ul className=" mt-6">{routes}</ul>
    </div>
  );
};

export default AsideNav;
