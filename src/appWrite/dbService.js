import conf from "../config/config";
import { Client,ID,Databases,Query,Storage } from "appwrite";

export class DbService{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
//passing slug as Document ID.
//Create POST
    async createPost({title,slug,description,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    description,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("App DBService ERROR",error);
        }
    }

    //Update Post
    async updatePost(slug,{title,description,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                description,
                featuredImage,
                status,
            }          
        ) 
        } catch (error) {
            console.log("UPDATE POST ERROR",error);
        }
    }

    //DeletePost
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            
            return true;
        } catch (error) {
            console.log("Error in DELETE POST",error);
            return false;
        }
    }

    //Get Post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error in Get POst",error)
        }
    }
    // Get All Posts (active and inactive)
    async getAllPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('userId', userId)] // Filter posts by userId
            );
        } catch (error) {
            console.log("ERROR IN LISTING ALL POSTS", error);
        }
    }

    async getAllActiveAndInactivePosts(userId) {
        try {
            const activePosts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "active"), Query.equal('userId', userId)]
            );
            const inactivePosts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", "inactive"), Query.equal('userId', userId)]
            );
    
            return [...activePosts.documents, ...inactivePosts.documents]; // Combine both sets of posts
        } catch (error) {
            console.log("ERROR IN GETTING ALL ACTIVE AND INACTIVE POSTS", error);
        }
    }
    //get AllActive  posts
    async getAllActivePosts(){
        try{
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status","active")]
            )
        }catch(error){
            console.log("ERROR IN LISTING ALL ACTIVE POSTS",error)
        }
    }

    //Up-load file.
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("ERROR IN UPLOAD FILE",error)
        }
    }

    //delete File
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log("ERROR IN FILE DELETE",error)
            return false
        }
    }

    //get Image preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
                fileId
        )
    }
}





    

const dbService = new DbService();

export default dbService;