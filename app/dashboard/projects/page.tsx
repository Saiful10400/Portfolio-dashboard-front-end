"use client";

import AllProjectContainer from "@/Modules/components/AllProjectContainer";
import imageUpload, { imageUploadToDb } from "@/Modules/utils/imageUpload";
import useSendPost from "@/Modules/utils/useSendPost";
import useShowResponse from "@/Modules/utils/useShowResponse";
import { useCreateProjectMutation } from "@/redux/api/api";
import React, { useState } from "react";

const Project = () => {
  const [payload, setPayload] = useState<Record<string, string | string[]>>({});
  const update = (e: Record<string, string | string[]>) => {
    setPayload((p) => ({ ...p, ...e }));
  };

  // cover image handler.
  const coverImageHandler = async (file: File) => {
    const url = await imageUploadToDb(file);
    update({ coverImage: url });
  };

  const projectImageHandle = async (file: FileList) => {
    const urls = await imageUpload(file);
    update({ images: urls });
  };

  // creation date handle.
  const dateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const dateString = date.toISOString();
    update({ projectCreationDate: dateString });
  };

  // tag handle.
  const technologyHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const array = text.split(",");
    update({ technologies: array });
  };

  // blog create handle.
  const [send, startLoading] = useSendPost(useCreateProjectMutation);
  const showResponse = useShowResponse();
  const projectCreationHandle = async () => {
    startLoading();
    const response = await send(payload);
    showResponse(response);
  };

  return (
    <div>
      <div className="justify-between sticky top-0 bg-white py-6 flex items-center">
        <h1 className="lg:text-3xl font-normal">Projects</h1>
      </div>

      {/* create blog section. */}

      <div className="shadow-lg p-7 rounded-lg mt-10 lg:w-[80%]">
        <div className="flex justify-between items-start">
          <h1 className="text-xl mb-8 font-semibold">Create a poject</h1>
          <button
            onClick={projectCreationHandle}
            disabled={Object.keys(payload).length === 11 ? false : true}
            className="btn btn-outline btn-ghost rounded-3xl px-10"
          >
            Create
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <input
              onChange={(e) => update({ projectName: e.target.value })}
              type="text"
              placeholder="Project name"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              onChange={(e) => update({ projectSummary: e.target.value })}
              type="text"
              placeholder="Project summary"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <input
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0)
                  coverImageHandler(e.target.files[0]);
              }}
              type="file"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              multiple
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0)
                  projectImageHandle(e.target.files);
              }}
              type="file"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <input
              onChange={(e) => update({ projectLink: e.target.value })}
              type="text"
              placeholder="Project link"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              onChange={(e) => update({ repoLink: e.target.value })}
              type="text"
              placeholder="Repo link"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <input
              onChange={(e) =>
                update({ slug: e.target.value.split(" ").join("-") })
              }
              type="text"
              placeholder="Slug"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              onChange={technologyHandle}
              type="text"
              placeholder="Technology exp:js,redux,.."
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between items-end lg:gap-7 flex-col lg:flex-row">
            <label htmlFor="projectDate" className="w-full h-full">
              <span>Project date:</span>
              <input
                id="projectDate"
                onChange={dateHandle}
                type="date"
                className="w-full border   px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
              />
            </label>
            <input
              onChange={(e) =>
                update({ projectCreationDuration: e.target.value })
              }
              type="text"
              placeholder="Project duration (string)"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <textarea
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Description"
            className="w-full resize-none p-2 h-[300px] border border-black rounded-md  text-xl font-light"
          ></textarea>
        </div>

        {/* end */}
      </div>

      <AllProjectContainer />
    </div>
  );
};

export default Project;
