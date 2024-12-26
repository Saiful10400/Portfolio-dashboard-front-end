"use client";

import { useAllBlogsQuery } from "@/redux/api/api";
import Image from "next/image";

export interface Tblog {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content stored as a string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  tags: string[]; // Array of tags
  status: "draft" | "published"; // Blog status, can be "draft" or "published"
  featuredImage?: string; // Optional URL for the featured image
  isDeleted: boolean; // Soft deletion flag
}

const AllBlogContainer = () => {
  const { data } = useAllBlogsQuery(null);
  const blogs:Tblog[] = data?.data;
 
 

  return (
    <div className=" mt-4 lg:w-[80%] grid grid-cols-1 lg:grid-cols-4">
      {
        blogs?.map(item=><div className="shadow-xl text-start rounded-xl overflow-hidden" key={item.id}>
            <Image className="w-full" src={item.featuredImage as string} width={500} height={500} alt="blog cover image"/>
            <div className="p-3 pb-5"><h1 className="mb-2 mt-1 text-xl font-bold">{item.title}</h1>
            <div className="flex gap-3 flex-wrap">{item.tags?.map(item=><span key={item} className="bg-gray-100 text-xs font-semibold">{item}</span>)}</div>
            </div>
        </div>)
      }
    </div>
  );
};

export default AllBlogContainer;
