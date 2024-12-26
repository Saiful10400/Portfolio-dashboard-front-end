"use client";
import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  Italic as ItalicIcon,
  List,
  UnderlineIcon,
} from "lucide-react";
import { Bold as BoldicIcon } from "lucide-react";
import { Heading1 as Headingxl } from "lucide-react";
import { Heading2 as Headingl } from "lucide-react";
import { Heading3 as Headings } from "lucide-react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import { EditorContent, useEditor } from "@tiptap/react";
import "./style.css";
import { imageUploadToDb } from "@/Modules/utils/imageUpload";
import AllBlogContainer from "@/Modules/components/AllBlogContainer";
import useSendPost from "@/Modules/utils/useSendPost";
import { useCreateBlogMutation } from "@/redux/api/api";
import useShowResponse from "@/Modules/utils/useShowResponse";
const Blog = () => {
  // rich text editor.

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({ placeholder: "Write something …" }),
    ],
    // content:"<p>dsfsd</p>"
  });

  const [payload, setPayload] = useState<Record<string, string | string[]>>({});
  const update = (e: Record<string, string | string[]>) => {
    setPayload((p) => ({ ...p, ...e }));
  };

  useEffect(() => {
    if (editor) {
      update({ content: editor.getHTML() });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor?.getHTML(), editor]);

  // cover image handler.
  const coverImageHandler = async (file: File) => {
    const url = await imageUploadToDb(file);
    update({ featuredImage: url });
  };

  // tag handle.
  const tagHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const array = text.split(",");
    update({ tags: array });
  };

  // blog create handle.
  const [send, startLoading] = useSendPost(useCreateBlogMutation);
  const showResponse = useShowResponse();
  const blogCreateHandle = async () => {
    startLoading();
    const response = await send(payload);
    showResponse(response);
    if (response.statusCode === 200) setPayload({});
  };
 

  return (
    <div>
      <div className="justify-between sticky top-0 bg-white py-6 flex items-center">
        <h1 className="lg:text-3xl font-normal">Blogs</h1>
      </div>

      {/* create blog section. */}

      <div className="shadow-lg p-7 rounded-lg mt-10 lg:w-[80%]">
        <div className="flex justify-between items-start">
          <h1 className="text-xl mb-8 font-semibold">Create a blog</h1>
          <button
            onClick={blogCreateHandle}
            disabled={Object.keys(payload).length === 5 ? false : true}
            className="btn btn-outline btn-ghost rounded-3xl px-10"
          >
            Post
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <input
            onChange={(e) => update({ title: e.target.value })}
            type="text"
            placeholder="Tittle"
            className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
          />

          <input
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0)
                coverImageHandler(e.target.files[0]);
            }}
            type="file"
            placeholder="tags exp:tag1,tag2,.."
            className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
          />
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
              onChange={tagHandle}
              type="text"
              placeholder="tags exp:tag1,tag2,.."
              className="w-full border px-1 outline-none border-gray-500 rounded-md  text-xl py-1"
            />
          </div>
        </div>

        {editor && (
          <section className="mt-5">
            <div>
              {/* buttons. */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  className={`${
                    editor?.isActive("italic")
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon />
                </button>

                <button
                  className={`${
                    editor?.isActive("bold")
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <BoldicIcon />
                </button>

                <button
                  className={`${
                    editor?.isActive("underline")
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon />
                </button>

                <button
                  className={`${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Headingxl />
                </button>
                <button
                  className={`${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Headingl />
                </button>

                <button
                  className={`${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <Headings />
                </button>

                <button
                  className={`${
                    editor.isActive({ textAlign: "left" })
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                >
                  <AlignLeft />
                </button>

                <button
                  className={`${
                    editor.isActive({ textAlign: "center" })
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                >
                  <AlignCenter />
                </button>

                <button
                  className={`${
                    editor.isActive("bulletList")
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200"
                  } p-1 rounded-md`}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                >
                  <List />
                </button>

                {/* <button
                    className={`${
                     "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                     editor.chain().focus().undo().run()} disabled={!editor.can().undo()
                    }
                  >
                    <Undo />
                  </button>

                  <button
                    className={`${
                       "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().redo().run()} disabled={!editor.can().redo()
                    }
                  >
                    <Redo />
                  </button> */}
              </div>

              <div>
                <EditorContent editor={editor} />
              </div>
            </div>
          </section>
        )}

        {/* end */}
      </div>

      <AllBlogContainer />
    </div>
  );
};

export default Blog;
