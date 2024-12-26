"use client";

import { imageUploadToDb } from "@/Modules/utils/imageUpload";
import useSendPost from "@/Modules/utils/useSendPost";
import useShowResponse from "@/Modules/utils/useShowResponse";
import {
  usePersonalInfoQuery,
  useUpdatePersonalInfoMutation,
} from "@/redux/api/api";
import { Tprofile } from "@/types/Tprofile";
import {
  Edit,
  Facebook,
  Github,
  GlobeIcon,
  LucideLinkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const { data } = usePersonalInfoQuery(null);

  const profile: Tprofile = data?.data;

  const [payload, setPayload] = useState<Record<string, string>>({});
  const update = (e: Record<string, string>) => {
    setPayload((p) => ({ ...p, ...e }));
  };

  // profile image upload to clowdinary.
  const profileImageUploadHandle = async (file: File) => {
    const url = await imageUploadToDb(file);
    update({ profilePic: url });
  };

 

  const [send, startLoading] = useSendPost(useUpdatePersonalInfoMutation); //initiate request

  const showResponse = useShowResponse();

  const profileInfoUpdateHandle = async () => {
    startLoading();
    const response = await send(payload);
    showResponse(response);
  };

  return (
    <div>
      <div className="justify-between sticky top-0 bg-white py-6 flex items-center">
        <h1 className="lg:text-3xl font-normal">Edit profile</h1>
        <div className="flex justify-end gap-5">
          {/* <button className="btn btn-outline btn-error rounded-3xl">
            Cancel
          </button> */}
          <button
            onClick={profileInfoUpdateHandle}
            disabled={Object.keys(payload).length > 0 ? false : true}
            className="btn btn-outline btn-ghost rounded-3xl"
          >
            Publish
          </button>
        </div>
      </div>

      {/* personal info's */}

      <div className="lg:mt-16 lg:ml-7 lg:w-[80%]">
        <div className="shadow-lg p-7 rounded-lg">
          <h1 className="text-xl font-semibold">Personal information</h1>

          <div className="mt-8 flex flex-col lg:flex-row lg:gap-32 lg:items-start">
            <div className="lg:w-[30%] relative  flex flex-col justify-center items-center gap-3">
              <label
                htmlFor="fileUpload"
                className="absolute cursor-pointer top-0 right-0"
              >
                <input
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0)
                      profileImageUploadHandle(e.target.files[0]);
                  }}
                  type="file"
                  id="fileUpload"
                  hidden
                />
                <Edit />
              </label>
              <div className=" w-[200px] h-[200px]  rounded-full border-2 border-gray-600 overflow-hidden">
                {profile?.profilePic && (
                  <Image
                    className=" object-cover"
                    width={500}
                    height={500}
                    src={payload?.profilePic || profile?.profilePic}
                    alt="profile image"
                  ></Image>
                )}
              </div>

              {/* contact informations. */}

              <div className="flex flex-col justify-center items-center w-full gap-2">
                <input
                  onChange={(e) => update({ name: e.target.value })}
                  defaultValue={profile?.name}
                  type="text"
                  placeholder="Name"
                  className="w-full border-2 px-1 border-gray-500 rounded-md text-center text-xl py-1 font-bold"
                />
                <input
                  onChange={(e) => update({ email: e.target.value })}
                  defaultValue={profile?.email}
                  type="email"
                  placeholder="Email"
                  className="w-full border-2 px-1 border-gray-500 rounded-md text-center text-lg"
                />
                <input
                  onChange={(e) => update({ phone: e.target.value })}
                  defaultValue={profile?.phone}
                  type="number"
                  placeholder="Phone"
                  className="w-full border-2 px-1 border-gray-500 rounded-md text-center text-lg"
                />
                <input
                  onChange={(e) => update({ address: e.target.value })}
                  defaultValue={profile?.address}
                  type="text"
                  placeholder="Address"
                  className="w-full border-2 px-1 border-gray-500 rounded-md text-center text-lg"
                />
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center gap-4">
              <input
                onChange={(e) => update({ title: e.target.value })}
                defaultValue={profile?.title}
                type="text"
                placeholder="Tittle"
                className="w-full border-2 px-1 border-gray-500 rounded-md  text-xl py-2 font-bold"
              />
              <textarea
                onChange={(e) => update({ bio: e.target.value })}
                defaultValue={profile?.bio}
                name=""
                placeholder="Bio"
                className="w-full resize-none p-2 h-[300px] border-2 border-gray-500 rounded-md  text-xl font-light"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="shadow-lg p-7 rounded-lg mt-10">
          <h1 className="text-xl font-semibold">Social links</h1>

          <div className="mt-8 flex flex-col lg:flex-row lg:gap-32 lg:items-start">
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="flex items-center w-full gap-4 lg:gap-24">
                <LucideLinkedin height={30} width={30} />
                <input
                onChange={(e) => update({ linkedIn: e.target.value })}
                  defaultValue={profile?.linkedIn}
                  type="text"
                  placeholder="Link"
                  className="w-full border-2 px-1 outline-red-500 border-gray-500 rounded-md  text-xl font-light py-1 "
                />
              </div>

              <div className="flex items-center w-full gap-4 lg:gap-24">
                <Github height={30} width={30} />
                <input
                onChange={(e) => update({ github: e.target.value })}
                  defaultValue={profile?.github}
                  type="text"
                  placeholder="Link"
                  className="w-full border-2 outline-red-500 px-1 border-gray-500 rounded-md  text-xl font-light py-1 "
                />
              </div>

              <div className="flex items-center w-full gap-4 lg:gap-24">
                <Twitter height={30} width={30} />
                <input
                onChange={(e) => update({ twitter: e.target.value })}
                  defaultValue={profile?.twitter}
                  type="text"
                  placeholder="Link"
                  className="w-full border-2 outline-red-500 px-1 border-gray-500 rounded-md  text-xl font-light py-1 "
                />
              </div>

              <div className="flex items-center w-full gap-4 lg:gap-24">
                <Facebook height={30} width={30} />
                <input
                onChange={(e) => update({ facebook: e.target.value })}
                  defaultValue={profile?.facebook}
                  type="text"
                  placeholder="Link"
                  className="w-full border-2 outline-red-500 px-1 border-gray-500 rounded-md  text-xl font-light py-1 "
                />
              </div>

              <div className="flex items-center w-full gap-4 lg:gap-24">
                <GlobeIcon height={30} width={30} />
                <input
                onChange={(e) => update({ website: e.target.value })}
                  defaultValue={profile?.website}
                  type="text"
                  placeholder="Link"
                  className="w-full border-2 outline-red-500 px-1 border-gray-500 rounded-md  text-xl font-light py-1 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
