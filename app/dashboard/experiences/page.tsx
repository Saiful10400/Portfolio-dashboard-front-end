"use client";

import AllProjectContainer from "@/Modules/components/AllProjectContainer";
import useSendPost from "@/Modules/utils/useSendPost";
import useShowResponse from "@/Modules/utils/useShowResponse";
import { useCreateProjectMutation } from "@/redux/api/api";
import React, { useState } from "react";

const Experience = () => {
  const [payload, setPayload] = useState<Record<string, string | string[]>>({});
  const update = (e: Record<string, string | string[]>) => {
    setPayload((p) => ({ ...p, ...e }));
  };

  // start date handle.
  const startDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const dateString = date.toISOString();
    update({ startDate: dateString });
  };

  // end date handle.
  const endDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const dateString = date.toISOString();
    update({ endDate: dateString });
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
        <h1 className="lg:text-3xl font-normal">Experience</h1>
      </div>

      {/* create blog section. */}

      <div className="shadow-lg p-7 rounded-lg mt-10 lg:w-[80%]">
        <div className="flex justify-between items-start">
          <h1 className="text-xl mb-8 font-semibold">
            Add a job/intern experience
          </h1>
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
              onChange={(e) => update({ companyName: e.target.value })}
              type="text"
              placeholder="Company name"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              onChange={(e) => update({ companyWebsiteUrl: e.target.value })}
              type="text"
              placeholder="Company website url"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <input
              onChange={(e) => update({ role: e.target.value })}
              type="text"
              placeholder="Role"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
            <input
              onChange={(e) => update({ certificate: e.target.value })}
              type="text"
              placeholder="Certificate link"
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>

          <div className="flex justify-between lg:gap-7 flex-col lg:flex-row">
            <label htmlFor="startDate" className="w-full">
              <span>Start date:</span>
              <input
                id="startDate"
                onChange={startDateHandler}
                type="date"
                className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
              />
            </label>
            <label htmlFor="startDate" className="w-full">
              <span>End date:</span>
              <input
                id="startDate"
                onChange={endDateHandler}
                type="date"
                className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
              />
            </label>
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

export default Experience;
