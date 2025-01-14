import React, { useCallback, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RealTimeEditor from "../RealTimeEditor";
import dbService from "../../appWrite/dbService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            description: post?.description || "",
            status: post?.status || "active",
            image: post?.featuredImage || null,
        },
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        let updatedData = { ...data };

        if (post) {
            // Only upload image if a new image is selected
            const Imagefile = data.image?.[0] ? await dbService.uploadFile(data.image[0]) : null;

            if (Imagefile) {
                // Delete the old image if a new one is uploaded
                dbService.deleteFile(post.featuredImage);
                updatedData.featuredImage = Imagefile.$id;
            } else {
                // Keep the old image if no new image is selected
                updatedData.featuredImage = post.featuredImage || null; // Set to null if no old image
            }

            // Update the post with the new data (even if no field was changed)
            const dbPost = await dbService.updatePost(post.$id, updatedData);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const imageFile = data.image?.[0] ? await dbService.uploadFile(data.image[0]) : null;

            if (imageFile) {
                const fileId = imageFile.$id;
                data.featuredImage = fileId;
            } else {
                data.featuredImage = null; // If no image is selected, set it to null
            }

            const dbPost = await dbService.createPost({
                ...data,
                userId: userData.$id,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row text-white font-semibold bg--800 rounded-xl shadow-xl space-y-6 lg:space-y-0 lg:space-x-6 p-4">
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Enter Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Enter Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RealTimeEditor
                    label="Description :"
                    name="description"
                    control={control}
                    defaultValue={post?.description || getValues("description")}
                    className="h-48 max-h-72 overflow-y-hidden mb-4"
                />
            </div>

            <div className="w-full lg:w-1/3 px-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={dbService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600" : "bg-indigo-600"}
                    className="w-full py-3 text-lg font-semibold rounded-xl hover:shadow-lg transition duration-200 ease-in-out"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
