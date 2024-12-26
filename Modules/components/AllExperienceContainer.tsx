"use client";

import { useAllProjectsQuery } from "@/redux/api/api";
import Image from "next/image";

export interface Tproject {
  
        id: string;
        projectName: string;
        description: string;
        projectSummary: string;
        technologies: string[];
        slug: string;
        projectLink: string;
        repoLink: string;
        projectCreationDate: string; // ISO 8601 date format
        updatedAt: string; // ISO 8601 date format
        coverImage: string;
        isDeleted: boolean;
        images: string[];
        projectCreationDuration: string; // Example: "5 day"
 
}

const AllExperienceContainer = () => {
  const { data } = useAllProjectsQuery(null);
  const blogs:Tproject[] = data?.data;
 
 
console.log(blogs)
  return (
    <div className=" mt-4 lg:w-[80%] grid grid-cols-1 gap-5 lg:grid-cols-3">
      {
        blogs?.map(item=><div className="shadow-xl text-start rounded-xl overflow-hidden" key={item.id}>
            <Image className="w-full h-[200px] object-cover" src={item.coverImage as string} width={500} height={500} alt="blog cover image"/>
            <div className="p-3 pb-5"><h1 className="mb-2 mt-1 text-xl font-bold">{item.projectName}</h1>
            <div className="flex gap-3 flex-wrap">{item.technologies?.map(item=><span key={item} className="bg-gray-100 text-xs font-semibold">{item}</span>)}</div>
            </div>
        </div>)
      }
    </div>
  );
};

export default AllExperienceContainer;
